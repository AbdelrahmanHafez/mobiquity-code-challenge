import assert from 'assert';
import getOptimalItems from './get.optimal.items';
import { IParsedPackageLine } from 'types';

describe('getOptimalItems(...)', () => {
  it('is a function', () => {
    assert.equal(typeof getOptimalItems, 'function');
  });

  it('getOptimalItems test case index: 0 for maximumWeight 81', () => {
    // Arrange
    const parsedPackageLine: IParsedPackageLine = {
      maximumWeight: 81,
      items: [
        { index: 1, weight: 53.38, cost: 45 },
        { index: 2, weight: 88.62, cost: 98 },
        { index: 3, weight: 78.48, cost: 3 },
        { index: 4, weight: 72.3, cost: 76 },
        { index: 5, weight: 30.18, cost: 9 },
        { index: 6, weight: 46.34, cost: 48 }
      ]
    };
    // Act
    const receivedResponse = getOptimalItems(parsedPackageLine);

    // Assert
    assert.deepStrictEqual(receivedResponse, '4');
  });
  it('getOptimalItems test case index: 1 for maximumWeight 75', () => {
    // Arrange
    const parsedPackageLine: IParsedPackageLine = {
      maximumWeight: 75,
      items: [
        { index: 1, weight: 85.31, cost: 29 },
        { index: 2, weight: 14.55, cost: 74 },
        { index: 3, weight: 3.98, cost: 16 },
        { index: 4, weight: 26.24, cost: 55 },
        { index: 5, weight: 63.69, cost: 52 },
        { index: 6, weight: 76.25, cost: 75 },
        { index: 7, weight: 60.02, cost: 74 },
        { index: 8, weight: 93.18, cost: 35 },
        { index: 9, weight: 89.95, cost: 78 }
      ]
    };
    // Act
    const receivedResponse = getOptimalItems(parsedPackageLine);

    // Assert
    assert.deepStrictEqual(receivedResponse, '2,7');
  });
  it('getOptimalItems test case index: 2 for maximumWeight 56', () => {
    // Arrange
    // Act
    const receivedResponse = getOptimalItems({
      maximumWeight: 56,
      items: [
        { index: 1, weight: 90.72, cost: 13 },
        { index: 2, weight: 33.8, cost: 40 },
        { index: 3, weight: 43.15, cost: 10 },
        { index: 4, weight: 37.97, cost: 16 },
        { index: 5, weight: 46.81, cost: 36 },
        { index: 6, weight: 48.77, cost: 79 },
        { index: 7, weight: 81.8, cost: 45 },
        { index: 8, weight: 19.36, cost: 79 },
        { index: 9, weight: 6.76, cost: 64 }
      ]
    });

    // Assert
    assert.deepStrictEqual(receivedResponse, '8,9');
  });
  it('picks the items with the lowest weights if both have the same value', () => {
    // Arrange
    const parsedPackageLine: IParsedPackageLine = {
      maximumWeight: 10,
      items: [
        { index: 1, weight: 8, cost: 13 },
        { index: 2, weight: 7, cost: 13 }
      ]
    };

    // Act
    const receivedResponse = getOptimalItems(parsedPackageLine);

    // Assert
    assert.deepStrictEqual(receivedResponse, '2');
  });
  xit('picks the items with the lowest weights if both have the same value, order does not matter', () => {
    // Arrange
    const parsedPackageLine: IParsedPackageLine = {
      maximumWeight: 10,
      items: [
        { index: 1, weight: 7, cost: 13 },
        { index: 2, weight: 8, cost: 13 }
      ]
    };

    // Act
    const receivedResponse = getOptimalItems(parsedPackageLine);

    // Assert
    assert.deepStrictEqual(receivedResponse, '1');
  });
});