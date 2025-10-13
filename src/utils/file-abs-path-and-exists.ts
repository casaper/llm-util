import { existsSync } from 'fs';
import { resolve } from 'path/posix';

import { FileNotFoundError } from './file-not-found-error';

export const fileAbsPathAndExists = (filePath: string) => {
  const absPath = resolve(process.cwd(), filePath);
  if (!existsSync(absPath)) {
    throw new FileNotFoundError(filePath);
  }
  return absPath;
};
