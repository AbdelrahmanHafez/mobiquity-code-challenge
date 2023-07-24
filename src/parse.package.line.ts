import { IItem, IParsedPackageLine, IRawItem, IRawLine } from './types';

export default function parsePackageLine(rawLine: IRawLine): IParsedPackageLine {
  try {
    if (validateRawPackageLine(rawLine) === false) {
      throw new Error(`Invalid package line \`${rawLine}\``);
    }

    const [maximumWeightStringifed, rawItems] = rawLine.split(' : ');

    const maximumWeight = Number(maximumWeightStringifed);

    const items = extractItems(rawItems);

    return {
      maximumWeight,
      items
    };
  } catch (err) {
    throw new Error(`Invalid package line \`${rawLine}\``);
  }
}

function extractItems(rawlItems: string): IItem[] {
  return rawlItems.split(' ').map((rawItem) => {
    const [stringifiedIndex, stringifedWeight, stringifiedCost] = sanitizeRawItem(rawItem).split(',');
    return {
      index: Number(stringifiedIndex),
      weight: Number(stringifedWeight),
      cost: Number(stringifiedCost)
    };
  });
}

function sanitizeRawItem(rawItem: IRawItem) {
  return rawItem.replace(/[()€]/g, '');
}

export function validateRawPackageLine(string: string) {
  const numberWithPossibleDecimalsRegEx = '\\d+(\\.\\d+)?';
  const num = numberWithPossibleDecimalsRegEx;
  const pacakgeRegex = `\\(${num},${num},€${num}\\)`;
  const packageLineRegex = new RegExp(`^${num} : (${pacakgeRegex})( (${pacakgeRegex})){0,}$`);
  return packageLineRegex.test(string);
}