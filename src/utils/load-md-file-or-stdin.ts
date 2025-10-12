import { grabStdin, readMdFileIfExists } from '.';

export const loadMdFileOrStdin = async (mdFile?: string) =>
  mdFile === '-' || !mdFile?.length
    ? await grabStdin
    : await readMdFileIfExists(mdFile);
