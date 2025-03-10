import fs from 'fs';

/**
 * Check if a file exists.
 */
export const fsExistsSync = (file: string): boolean => {
  try {
    fs.accessSync(file);
    return true;
  } catch (ignore) {
    return false;
  }
};
