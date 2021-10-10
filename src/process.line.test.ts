import assert from 'assert';
import processLine from './process.line';

describe('processLine(...)', () => {
  const testCases = [
    {
      rawLine: '81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)',
      expectedResult: '4'
    },
    {
      rawLine: '8 : (1,15.3,€34)',
      expectedResult: '-'
    },
    {
      rawLine: '75 : (1,85.31,€29) (2,14.55,€74) (3,3.98,€16) (4,26.24,€55) (5,63.69,€52) (6,76.25,€75) (7,60.02,€74) (8,93.18,€35) (9,89.95,€78)',
      expectedResult: '2,7'
    },
    {
      rawLine: '56 : (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64)',
      expectedResult: '8,9'
    }
  ];

  for (const testCase of testCases) {
    xit(testCase.rawLine, () => {
      // Arrange
      const { rawLine } = testCase;

      // Act
      const result = processLine(rawLine);

      // Assert
      assert.deepStrictEqual(result, testCase.expectedResult);
    });
  }

  it('returns `-` when an error is thrown', () => {
    // Arrange
    const rawLine = 'I am an invalid line';

    // Act
    const receivedResponse = processLine(rawLine);

    // Assert
    assert.deepStrictEqual(receivedResponse, '-');
  });

  it('returns `-` when a constraint is being violated', () => {
    // Arrange
    const rawLine = '8 : (1,1000,€34)';

    // Act
    const receivedResponse = processLine(rawLine);

    // Assert
    assert.deepStrictEqual(receivedResponse, '-');
  });
});