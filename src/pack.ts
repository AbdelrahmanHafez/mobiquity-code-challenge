import fs from 'fs-extra';
import processLine from './process.line';

export async function pack(fileName: string) {
  const packagesLinesSingleChunk = await fs.readFile(`./text-files/${fileName}`, { encoding: 'utf-8' });

  const packagesLines = packagesLinesSingleChunk.replace(/\r/g, '').split('\n');
  const results = packagesLines.map(processLine);

  return results.join('\n');
}