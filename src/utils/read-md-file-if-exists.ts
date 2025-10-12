import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { resolve } from 'path/posix';

class FileNotFoundError extends Error {
  name = 'FileNotFoundError';
  constructor(filePath: string) {
    super(`File not found: ${filePath}`);
  }
}

const fileAbsPathAndExists = (filePath: string) => {
  const absPath = resolve(process.cwd(), filePath);
  if (!existsSync(absPath)) {
    throw new FileNotFoundError(filePath);
  }
  return absPath;
};

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
