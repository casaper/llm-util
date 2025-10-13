export class FileNotFoundError extends Error {
  name = 'FileNotFoundError';
  constructor(filePath: string) {
    super(`File not found: ${filePath}`);
  }
}
