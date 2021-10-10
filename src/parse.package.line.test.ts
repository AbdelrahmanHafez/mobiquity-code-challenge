import parsePackageLine, { validateRawPackageLine } from './parse.package.line';
import assert from 'assert';

describe('parsePackageLine(...)', () => {
  it('returns maximumWeight, items', () => {
    // Arrange
    // Act
    const parsedPackageLine = parsePackageLine('81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)');

    // Assert
    assert.deepStrictEqual(
      parsedPackageLine,
      {
        maximumWeight: 81,
        items: [
          { index: 1, weight: 53.38, cost: 45 },
          { index: 2, weight: 88.62, cost: 98 },
          { index: 3, weight: 78.48, cost: 3 },
          { index: 4, weight: 72.30, cost: 76 },
          { index: 5, weight: 30.18, cost: 9 },
          { index: 6, weight: 46.34, cost: 48 }
        ]
      }
    );
  });
  it('throws an error when package is invalid', () => {
    // Arrange
    const invalidPackageLine = '8 : (1.15  3,€34)';

    // Act
    // Assert
    assert.throws(
      () => {
        parsePackageLine(invalidPackageLine);
      },
      { message: `Invalid package line \`${invalidPackageLine}\`` }
    );
  });
});

describe('validateRawPackageLine(...)', () => {
  describe('valid', () => {
    it('works with 1 item', () => {
      assert.equal(
        validateRawPackageLine('8 : (1.15,3,€34)'),
        true
      );
    });
    it('works with 2 items', () => {
      assert.equal(
        validateRawPackageLine('8 : (1.15,3,€34) (9.15,3.1,€181.13)'),
        true
      );
    });
    it('works with 5 items', () => {
      assert.equal(
        validateRawPackageLine('2 : (1,85.31,€29) (2,14.55,€74) (3,3.98,€16) (4,26.24,€55) (5,63.69,€52)'),
        true
      );
    });
  });
  describe('invalid', () => {
    it('fails if incorrect spacing', () => {
      assert.equal(
        validateRawPackageLine('2 : (1,85.31,€29)      (2,14.55,€74)'),
        false
      );
    });
    it('fails if no euro sign', () => {
      assert.equal(
        validateRawPackageLine('8 : (1.15,3,€34) (9.15,3.1,181.13)'),
        false
      );
    });
    it('fails if no max weight', () => {
      assert.equal(
        validateRawPackageLine('A : (1.15,3,€34) (9.15,3.1,181.13)'),
        false
      );
    });
  });
});