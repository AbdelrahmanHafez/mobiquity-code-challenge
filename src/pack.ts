import fs from 'fs-extra';

export async function pack(fileName: string): string {
  await fs.readFile(fileName, { encoding: 'utf8' });
  return fileName;
}