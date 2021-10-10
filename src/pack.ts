import fs from 'fs-extra';
import processLine from './process.line';

export async function pack(fileName: string) {
  const packagesLinesSingleChunk = await fs.readFile(fileName, { encoding: 'utf8' });

  const packagesLines = packagesLinesSingleChunk.split('\n');

  const results = packagesLines.map(processLine);

  return results.join('\n');
}