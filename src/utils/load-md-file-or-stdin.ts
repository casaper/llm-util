import { readMdFileIfExists } from './read-md-file-if-exists';

export const grabStdin = new Promise<string>((resolve, reject) => {
  let data = '';
  process.stdin.on('data', chunk => (data += chunk));
  process.stdin.on('end', () => resolve(data));
  process.stdin.on('error', reject);
});

export const loadMdFileOrStdin = async (mdFile?: string) =>
  mdFile === '-' || !mdFile?.length
    ? await grabStdin
    : await readMdFileIfExists(mdFile);
