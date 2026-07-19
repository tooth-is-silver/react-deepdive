import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, '..');

// 원본 노트는 레포 안 content/에 있다. 파서가 이걸 읽어 cards.json을 만든다.
const contentRoot = join(projectRoot, 'content');
const outputPath = join(projectRoot, 'src', 'data', 'cards.json');

// 더보기(상세)에 원문 그대로 담을 섹션과 표시 라벨. 순서대로 조립한다.
const detailSections = [
  ['질문', '질문'],
  ['최적 답변', '최적 답변'],
  ['개선 코드', '개선 코드'],
  ['자주 틀리는 표현', '자주 틀리는 표현'],
];

const PLACEHOLDER_TEXT = '추후 정리 예정';

async function collectMarkdownPaths(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      paths.push(...(await collectMarkdownPaths(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      paths.push(fullPath);
    }
  }

  return paths;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, body: raw };
  }

  const frontmatter = {};

  for (const line of match[1].split('\n')) {
    const scalar = line.match(/^([A-Za-z_]+):\s*(.*)$/);

    if (scalar && scalar[2] !== '') {
      frontmatter[scalar[1]] = scalar[2].trim();
    }
  }

  return { frontmatter, body: match[2] };
}

function parseSections(body) {
  const lines = body.split('\n');
  const sections = {};
  let title = '';
  let currentName = null;
  let buffer = [];

  const flush = () => {
    if (currentName !== null) {
      sections[currentName] = buffer.join('\n').trim();
    }
    buffer = [];
  };

  for (const line of lines) {
    const heading1 = line.match(/^#\s+(.*)$/);
    const heading2 = line.match(/^##\s+(.*)$/);

    if (heading2) {
      flush();
      currentName = heading2[1].trim();
      continue;
    }

    if (heading1) {
      title = heading1[1].trim();
      continue;
    }

    buffer.push(line);
  }

  flush();

  return { title, sections };
}

function extractKeyword(title) {
  const separatorIndex = title.indexOf(' - ');
  return separatorIndex === -1
    ? title
    : title.slice(separatorIndex + 3).trim();
}

function parseListItems(text) {
  if (!text) {
    return [];
  }

  return text
    .split('\n')
    .map((line) => line.match(/^-\s+(.*)$/))
    .filter(Boolean)
    .map((match) => match[1].trim());
}

function buildDetail(sections) {
  const parts = [];

  for (const [sectionName, label] of detailSections) {
    const content = sections[sectionName];

    if (content && !content.includes(PLACEHOLDER_TEXT)) {
      parts.push(`### ${label}\n\n${content}`);
    }
  }

  return parts.join('\n\n');
}

function toCards(path, raw) {
  const { frontmatter, body } = parseFrontmatter(raw);
  const { title, sections } = parseSections(body);

  const summary = sections['한 줄 요약'];
  const category = frontmatter.category;

  const isPlaceholder =
    !category ||
    category === 'placeholder' ||
    frontmatter.status === 'todo' ||
    !summary ||
    summary.includes(PLACEHOLDER_TEXT);

  if (isPlaceholder) {
    return [];
  }

  const noteId = relative(contentRoot, path)
    .replace(/\.md$/, '')
    .replace(/[\\/]/g, '__');

  // 노트 제목 키워드 + '반드시 포함할 키워드'를 앞면으로 펼치고, 뒷면(요약·상세)은 공유한다.
  const keywords = [
    extractKeyword(title),
    ...parseListItems(sections['반드시 포함할 키워드']),
  ];
  const uniqueKeywords = [...new Set(keywords)];

  const core = summary;
  const detail = buildDetail(sections);

  return uniqueKeywords.map((keyword, index) => ({
    id: `${noteId}#${index}`,
    category,
    front: keyword,
    core,
    detail,
  }));
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // content/가 없어도 커밋된 cards.json이 있으면 그 데이터로 빌드한다.
  if (!(await exists(contentRoot))) {
    if (await exists(outputPath)) {
      console.log(`content/ 없음 → 커밋된 ${relative(projectRoot, outputPath)} 사용`);
      return;
    }
    throw new Error(`content/도 ${relative(projectRoot, outputPath)}도 없어 카드를 만들 수 없습니다.`);
  }

  const paths = (await collectMarkdownPaths(contentRoot)).sort();
  const cards = [];

  let noteCount = 0;

  for (const path of paths) {
    const raw = await readFile(path, 'utf8');
    const noteCards = toCards(path, raw);

    if (noteCards.length > 0) {
      noteCount += 1;
      cards.push(...noteCards);
    }
  }

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(cards, null, 2)}\n`, 'utf8');

  console.log(
    `카드 ${cards.length}장 생성 (완성 노트 ${noteCount}개 · 검사 ${paths.length}개) → ${relative(projectRoot, outputPath)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
