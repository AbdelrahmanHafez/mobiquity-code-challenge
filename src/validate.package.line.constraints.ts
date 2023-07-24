import CONSTANTS from './helpers/constants';
import { IParsedPackageLine } from './types';

export default function validatePackageLineConstraints(parsedPackageLine: IParsedPackageLine) {

  const maxCostIsValid = parsedPackageLine.items.every(item => {
    return item.cost <= CONSTANTS.MAX_COST;
  });
  const maxWeightPerItemIsValid = parsedPackageLine.items.every(item => {
    return item.weight <= CONSTANTS.MAX_WEIGHT_PER_ITEM;
  });
  const maxWeightPerPackageIsValid = parsedPackageLine.maximumWeight <= CONSTANTS.MAX_WEIGHT_PER_PACKAGE;
  const itemsCountIsValid = parsedPackageLine.items.length <= CONSTANTS.MAX_ITEMS_COUNT_TO_CHOOSE_FROM;

  const isValid = itemsCountIsValid && maxCostIsValid && maxWeightPerItemIsValid && maxWeightPerPackageIsValid;

  return {
    isValid,
    maxCostIsValid,
    maxWeightPerItemIsValid,
    maxWeightPerPackageIsValid,
    itemsCountIsValid
  };
}