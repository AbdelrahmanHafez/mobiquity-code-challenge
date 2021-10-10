import assert from 'assert';
import validateConstaints from './validate.package.line.constraints';
import CONSTANTS from './helpers/constants';
import { IParsedPackageLine } from 'types';


describe('validateConstaints(...)', () => {
  it('is a function', () => {
    assert.equal(
      typeof validateConstaints,
      'function'
    );
  });
  it('is valid when all constraints are met', () => {
    // Arrange
    const parsedPackageLine: IParsedPackageLine = {
      maximumWeight: 10,
      items: [
        { index: 1, cost: 80, weight: 4 },
        { index: 2, cost: 60, weight: 3 },
        { index: 3, cost: 5, weight: 8 }
      ]
    };

    // Act
    const result = validateConstaints(parsedPackageLine);

    // Assert
    assert.deepStrictEqual(result.isValid, true);
    assert.deepStrictEqual(result.maxCostIsValid, true);
    assert.deepStrictEqual(result.maxWeightPerItemIsValid, true);
    assert.deepStrictEqual(result.maxWeightPerPackageIsValid, true);
  });
  it('is invalid when one item surpasses max cost', () => {
    // Arrange
    const parsedPackageLine: IParsedPackageLine = {
      maximumWeight: 10,
      items: [
        { index: 1, cost: 80, weight: 8 },
        { index: 2, cost: CONSTANTS.MAX_COST + 0.5, weight: 3 },
        { index: 3, cost: 5, weight: 8 }
      ]
    };

    // Act
    const result = validateConstaints(parsedPackageLine);

    // Assert
    assert.deepStrictEqual(result.isValid, false);
    assert.deepStrictEqual(result.maxCostIsValid, false);
    assert.deepStrictEqual(result.maxWeightPerItemIsValid, true);
    assert.deepStrictEqual(result.maxWeightPerPackageIsValid, true);
  });
  it('is invalid when one item surpasses max weight', () => {
    // Arrange
    const parsedPackageLine: IParsedPackageLine = {
      maximumWeight: 10,
      items: [
        { index: 1, cost: 80, weight: 8 },
        { index: 2, cost: 60, weight: CONSTANTS.MAX_WEIGHT_PER_ITEM + 0.1 },
        { index: 3, cost: 5, weight: 8 }
      ]
    };

    // Act
    const result = validateConstaints(parsedPackageLine);

    // Assert
    assert.deepStrictEqual(result.isValid, false);
    assert.deepStrictEqual(result.maxCostIsValid, true);
    assert.deepStrictEqual(result.maxWeightPerItemIsValid, false);
    assert.deepStrictEqual(result.maxWeightPerPackageIsValid, true);
  });
  it('is invalid when the package can take more than max weight', () => {
    // Arrange
    const parsedPackageLine: IParsedPackageLine = {
      maximumWeight: CONSTANTS.MAX_WEIGHT_PER_PACKAGE + 0.1,
      items: [
        { index: 1, cost: 80, weight: 8 },
        { index: 2, cost: 60, weight: 30 },
        { index: 3, cost: 5, weight: 8 }
      ]
    };

    // Act
    const result = validateConstaints(parsedPackageLine);

    // Assert
    assert.deepStrictEqual(result.isValid, false);
    assert.deepStrictEqual(result.maxCostIsValid, true);
    assert.deepStrictEqual(result.maxWeightPerItemIsValid, true);
    assert.deepStrictEqual(result.maxWeightPerPackageIsValid, false);
  });
  xit('is invalid when the items are more than 15', () => {

  });
});