import { ILineResult, IRawLine } from './types';
import validatePackageLineConstraints from './validate.package.line.constraints';
import parsePackageLine from './parse.package.line';
import getOptimalItems from './get.optimal.items';

export default function processLine(rawLine: IRawLine): ILineResult {
  try {
    const parsedPackageLine = parsePackageLine(rawLine);
    const validationResult = validatePackageLineConstraints(parsedPackageLine);
    if (validationResult.isValid === false) {
      return '-';
    }
    return getOptimalItems(parsedPackageLine);
  } catch (err) {
    return '-';
  }
}