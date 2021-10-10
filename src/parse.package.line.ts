import { IItem, IParsedPackageLine } from 'types';

export default function parsePackageLine(rawText: string): IParsedPackageLine {
  try {
    if (validateRawPackageLine(rawText) === false) {
      throw new Error(`Invalid package line \`${rawText}\``);
    }

    const [maximumWeightStringifed, rawItems] = rawText.split(' : ');

    const maximumWeight = Number(maximumWeightStringifed);

    const items = extractItems(rawItems);

    return {
      maximumWeight,
      items
    };
  } catch (err) {
    throw new Error(`Invalid package line \`${rawText}\``);
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

function sanitizeRawItem(rawItem: string) {
  return rawItem.replace(/[()€]/g, '');
}

export function validateRawPackageLine(string) {

  const numberWithPossibleDecimalsRegEx = '\\d+(\\.\\d+)?';
  const num = numberWithPossibleDecimalsRegEx;
  const packageLineRegex = new RegExp(`^${num} : (\\(${num},${num},€${num}\\))( (\\(${num},${num},€${num}\\))){0,}$`);
  return packageLineRegex.test(string);
}