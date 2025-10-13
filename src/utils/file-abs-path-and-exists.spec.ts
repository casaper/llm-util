import { existsSync } from 'fs';
import { resolve } from 'path/posix';
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { fileAbsPathAndExists } from './file-abs-path-and-exists';
import { FileNotFoundError } from './file-not-found-error';

vi.mock('fs');
vi.mock('path/posix', () => ({
  resolve: vi.fn(),
}));

describe('fileAbsPathAndExists', () => {
  const mockCwd = '/mock/cwd';
  const mockFilePath = 'test/file.txt';
  const mockAbsPath = '/mock/cwd/test/file.txt';

  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
    (resolve as Mock).mockReturnValue(mockAbsPath);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the absolute path if the file exists', () => {
    (existsSync as Mock).mockReturnValue(true);

    const result = fileAbsPathAndExists(mockFilePath);

    expect(resolve).toHaveBeenCalledWith(mockCwd, mockFilePath);
    expect(existsSync).toHaveBeenCalledWith(mockAbsPath);
    expect(result).toBe(mockAbsPath);
  });

  it('should throw FileNotFoundError if the file does not exist', () => {
    (existsSync as Mock).mockReturnValue(false);

    expect(() => fileAbsPathAndExists(mockFilePath)).toThrow(FileNotFoundError);
    expect(() => fileAbsPathAndExists(mockFilePath)).toThrowError(
      new FileNotFoundError(mockFilePath)
    );
    expect(resolve).toHaveBeenCalledWith(mockCwd, mockFilePath);
    expect(existsSync).toHaveBeenCalledWith(mockAbsPath);
  });
});
