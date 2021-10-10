import assert from 'assert';
import { pack } from './pack';

xdescribe('Integration: pack', () => {
  const testCases = [
    {
      options: '81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)',
      expectedResult: '4'
    },
    {
      options: '8 : (1,15.3,€34)',
      expectedResult: '-'
    },
    {
      options: '75 : (1,85.31,€29) (2,14.55,€74) (3,3.98,€16) (4,26.24,€55) (5,63.69,€52) (6,76.25,€75) (7,60.02,€74) (8,93.18,€35) (9,89.95,€78)',
      expectedResult: '2,7'
    },
    {
      options: '56 : (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64)',
      expectedResult: '8,9'
    }
  ];

  for (const testCase of testCases) {
    it(testCase.options, () => {
      // Arrange
      const { options } = testCase;

      // Act
      const result = pack(options);

      // Assert
      assert.deepStrictEqual(result, testCase.expectedResult);
    });
  }

  it('package weight has to be less <= 100');
  it('items to choose from have to be maximum 15');
  it('throws an error if an item\'s weight is higher than 100');
  it('throws an error if the cost of an item is higher than 100');
});