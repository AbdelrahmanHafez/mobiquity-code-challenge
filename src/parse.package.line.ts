import { IOptionalItem, IParsedPackageLine } from 'types';

export default function parsePackageLine(rawText: string): IParsedPackageLine {
  try {
    if (isValidPackageLine(rawText) === false) {
      throw new Error(`Invalid package line \`${rawText}\``);
    }

    const [maximumWeightStringifed, rawOptionalItems] = rawText.split(' : ');

    const maximumWeight = Number(maximumWeightStringifed);

    const optionalItems = extractOptionalItems(rawOptionalItems);

    return {
      maximumWeight,
      optionalItems
    };
  } catch (err) {
    throw new Error(`Invalid package line \`${rawText}\``);
  }
}

function extractOptionalItems(rawOptionalItems: string): IOptionalItem[] {
  return rawOptionalItems.split(' ').map((rawOptionalItem) => {
    const [stringifiedIndex, stringifedWeight, stringifiedCost] = sanitizeRawOptionalItem(rawOptionalItem).split(',');
    return {
      index: Number(stringifiedIndex),
      weight: Number(stringifedWeight),
      cost: Number(stringifiedCost)
    };
  });
}

function sanitizeRawOptionalItem(rawOptionalItem: string) {
  return rawOptionalItem.replace(/[()€]/g, '');
}

export function isValidPackageLine(string) {
  const packageLineRegex = /^\d+(\.\d+)? : (\(\d+(\.\d+)?,\d+(\.\d+)?,€\d+(\.\d+)?\))( (\(\d+(\.\d+)?,\d+(\.\d+)?,€\d+(\.\d+)?\))){0,}$/;
  return packageLineRegex.test(string);
}