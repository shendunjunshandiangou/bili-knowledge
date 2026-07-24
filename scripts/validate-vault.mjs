import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const vaultRoot = path.join(repoRoot, '知识库');

const CONTENT_DIRS = new Set(['00_raw', '01_articles', '02_atoms', '04_knowledge']);

function isContentPipelineFile(filePath) {
  const parts = filePath.replace(/\\/g, '/').split('/');
  const idx = parts.indexOf('知识库');
  if (idx === -1 || idx + 2 >= parts.length) return false;
  return CONTENT_DIRS.has(parts[idx + 2]);
}

function listMarkdownFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listMarkdownFiles(full, out);
    else if (entry.name.endsWith('.md') && isContentPipelineFile(full)) out.push(full);
  }
  return out;
}

function hasBom(filePath) {
  const buf = fs.readFileSync(filePath);
  return buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
}

function stripBomText(content) {
  return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}

function inspectFrontmatter(filePath) {
  const content = stripBomText(fs.readFileSync(filePath, 'utf8')).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (!content.startsWith('---\n')) return null;
  const end = content.indexOf('\n---', 4);
  if (end === -1) return { unclosedFence: true };
  return null;
}

export function validateVaultSources({ fixBom = false } = {}) {
  const bomFiles = [];
  const fenceIssues = [];

  for (const filePath of listMarkdownFiles(vaultRoot)) {
    if (hasBom(filePath)) {
      bomFiles.push(filePath);
      if (fixBom) {
        const text = stripBomText(fs.readFileSync(filePath, 'utf8'));
        fs.writeFileSync(filePath, text, 'utf8');
      }
      continue;
    }

    const fm = inspectFrontmatter(filePath);
    if (fm) {
      fenceIssues.push({ rel: path.relative(repoRoot, filePath).replace(/\\/g, '/'), ...fm });
    }
  }

  return { bomFiles, fenceIssues, fixedBomCount: fixBom ? bomFiles.length : 0 };
}

function formatRel(filePath) {
  return path.relative(repoRoot, filePath).replace(/\\/g, '/');
}

function main() {
  const fixBom = process.argv.includes('--fix-bom');
  const { bomFiles, fenceIssues, fixedBomCount } = validateVaultSources({ fixBom });

  if (fixBom && fixedBomCount) {
    console.log(`已移除 ${fixedBomCount} 个文件的 UTF-8 BOM`);
  }

  if (bomFiles.length) {
    console.error('\n[validate-vault] 检测到 UTF-8 BOM（会导致网站 frontmatter 无法识别）：');
    for (const filePath of bomFiles) console.error(`  - ${formatRel(filePath)}`);
    console.error('  修复：npm run validate -- --fix-bom');
    process.exitCode = 1;
  }

  if (fenceIssues.length) {
    console.error('\n[validate-vault] frontmatter 围栏异常（缺少或未闭合 ---）：');
    for (const issue of fenceIssues) console.error(`  - ${issue.rel}`);
    process.exitCode = 1;
  }

  if (!process.exitCode) {
    console.log('[validate-vault] 知识库 Markdown 校验通过');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
