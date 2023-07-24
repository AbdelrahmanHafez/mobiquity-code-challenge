import fs from 'fs-extra';
import processLine from './process.line';

export async function pack(filePath: string) {
  const packagesLinesSingleChunk = await fs.readFile(filePath, { encoding: 'utf-8' });

  const packagesLines = packagesLinesSingleChunk.replace(/\r/g, '').split('\n');
  const results = packagesLines.map(processLine);
  const stringifiedResult = results.join('\n');

  return stringifiedResult;
}