import fs from 'fs-extra';

export async function pack(fileName: string) {
  return await fs.readFile(fileName, { encoding: 'utf8' });
}