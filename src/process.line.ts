import { ILineResult, IRawLine } from './types';
import validatePackageLineConstraints from './validate.package.line.constraints';
import parsePackageLine from './parse.package.line';
import getOptimalItems from './get.optimal.items';
import { PackingError } from './packing.error';

export default function processLine(rawLine: IRawLine): ILineResult {
  const parsedPackageLine = parsePackageLine(rawLine);
  const validationResult = validatePackageLineConstraints(parsedPackageLine);
  if (validationResult.isValid === false) {
    throw new PackingError(`Invalid package line: ${rawLine}`);
  }
  return getOptimalItems(parsedPackageLine);
}