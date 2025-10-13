import { readFile } from 'fs/promises';
import { describe, expect, it, vi } from 'vitest';

import { fileAbsPathAndExists } from './file-abs-path-and-exists';
import { FileNotFoundError } from './file-not-found-error';
import { readMdFileIfExists } from './read-md-file-if-exists';

vi.mock('./file-abs-path-and-exists');
vi.mock('fs/promises');

describe('#readMdFileIfExists', () => {
  it('should read the file content if the file exists', async () => {
    const mockFilePath = 'test.md';
    const mockAbsPath = '/absolute/path/to/test.md';
    const mockFileContent = 'Mock file content';

    vi.mocked(fileAbsPathAndExists).mockReturnValue(mockAbsPath);
    vi.mocked(readFile).mockResolvedValue(mockFileContent);

    const result = await readMdFileIfExists(mockFilePath);

    expect(fileAbsPathAndExists).toHaveBeenCalledWith(mockFilePath);
    expect(readFile).toHaveBeenCalledWith(mockAbsPath, 'utf-8');
    expect(result).toBe(mockFileContent);
  });

  it('should throw FileNotFoundError if the file does not exist', async () => {
    const mockFilePath = 'nonexistent.md';

    vi.mocked(fileAbsPathAndExists).mockImplementation(() => {
      throw new FileNotFoundError('File not found');
    });

    await expect(readMdFileIfExists(mockFilePath)).rejects.toThrow(
      FileNotFoundError
    );
    expect(fileAbsPathAndExists).toHaveBeenCalledWith(mockFilePath);
  });
});
