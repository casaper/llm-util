import { readFile } from 'fs/promises';

import { fileAbsPathAndExists } from './file-abs-path-and-exists';
import { FileNotFoundError } from './file-not-found-error';

export const readMdFileIfExists = async (filePath: string) => {
  try {
    const absPath = fileAbsPathAndExists(filePath);
    return readFile(absPath, 'utf-8');
  } catch (error) {
    if (error instanceof FileNotFoundError) throw error;
    console.error(`Reading file failed: ${filePath}\n${error}`);
    throw error;
  }
};
