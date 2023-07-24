// This is a knapsack sort of problem, using dynamic programming can give us a deterministic solution
// This topic is explained in Grokking Algorithms Chapter 9, you can check it from the link below:
// https://livebook.manning.com/book/grokking-algorithms/chapter-9/1

import { IGrid, IGridCell, IItem, IParsedPackageLine } from './types';
import _ from 'lodash';

export default function getOptimalItems(parsedPackageLine: IParsedPackageLine) {
  parsedPackageLine = _.cloneDeep(parsedPackageLine);

  const weightMultiplier = getWeightMultiplierToConvertToIntegers(parsedPackageLine);
  convertAllWeightsToIntegers(parsedPackageLine, weightMultiplier);

  const grid = buildGrid(parsedPackageLine);
  const bestItems = getBestItems(grid);

  return bestItems.map(item => item.index).join(',') || '-';
}

function getBestItems(grid: IGrid) {
  const lastRow = grid[grid.length - 1];
  const lastCell = lastRow[lastRow.length - 1];
  const pickedItems: IItem[] = lastCell.items;
  return pickedItems;
}

function buildGrid(parsedPackageLine: IParsedPackageLine) {
  const { items, maximumWeight } = parsedPackageLine;
  const grid: IGrid = [];

  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
    const row = [];

    for (let maxWeightForCell = 1; maxWeightForCell < maximumWeight; maxWeightForCell++) {
      const cell = getCell(grid, items, itemIndex, maxWeightForCell);
      row.push(cell);
    }

    grid.push(row);
  }

  return grid;
}

function getCell(grid: IGrid, items: IItem[], itemIndex: number, maxWeightForCell: number) {
  const DEFAULT_CELL: IGridCell = { maxValue: 0, items: [] };

  const columnIndex = maxWeightForCell - 1;
  const rowIndex = itemIndex - 1;

  const currentItem = items[itemIndex];
  const remainingWeight = maxWeightForCell - currentItem.weight;

  const lastBestCellForThisWeight = grid[rowIndex]?.[columnIndex] || DEFAULT_CELL;
  const bestCellForRemainingWeight = grid[rowIndex]?.[remainingWeight - 1] || DEFAULT_CELL;
  if (remainingWeight < 0) {
    return lastBestCellForThisWeight;
  }

  const lastValue = lastBestCellForThisWeight.maxValue;
  const bestValueForRemainingWeight = bestCellForRemainingWeight.maxValue;

  const newValue = bestValueForRemainingWeight + currentItem.cost;
  const newItems = [...bestCellForRemainingWeight.items, currentItem];

  if (newValue > lastValue) {
    return { maxValue: newValue, items: newItems };
  } else if (newValue === lastValue) {
    const newItemsWeight = newItems.reduce((sum, item) => sum + item.weight, 0);
    const lastSolutionItemsWeight = lastBestCellForThisWeight.items.reduce((sum, item) => sum + item.weight, 0);
    const lastSolutionIsBetter = newItemsWeight > lastSolutionItemsWeight;

    return lastSolutionIsBetter ? lastBestCellForThisWeight : { maxValue: newValue, items: newItems };
  } else {
    return lastBestCellForThisWeight;
  }
}

function getWeightMultiplierToConvertToIntegers(parsedPackageLine: IParsedPackageLine) {
  let highestDecimalsCount: number = 0;
  const itemsWeights = parsedPackageLine.items.map(item => item.weight);

  [parsedPackageLine.maximumWeight, ...itemsWeights].forEach((weight) => {
    const decimalsCount = countDecimals(weight);
    if (decimalsCount > highestDecimalsCount) {
      highestDecimalsCount = decimalsCount;
    }
  });

  return 10 ** highestDecimalsCount;
}

function countDecimals(number: number) {
  if (Math.floor(number) === number) {
    return 0;
  }
  return number.toString().split('.')[1].length || 0;
}

function convertAllWeightsToIntegers(parsedPackageLine: IParsedPackageLine, multiplier: number) {
  parsedPackageLine.maximumWeight *= multiplier;
  parsedPackageLine.items.forEach(item => item.weight *= multiplier);
}