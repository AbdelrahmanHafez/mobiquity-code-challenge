import { ILineResult, IRawLine } from 'types';
import validatePackageLineConstraints from './validate.package.line.constraints';
import parsePackageLine from './parse.package.line';

export default function processLine(rawLine: IRawLine): ILineResult {
  try {
    const parsedPackageLine = parsePackageLine(rawLine);
    const { isValid } = validatePackageLineConstraints(parsedPackageLine);
    if (isValid === false) {
      return '-';
    }
  } catch (err) {
    return '-';
  }
}