import assert from 'assert';
import { pack } from './pack';

describe('pack(...)', () => {
  it('is a function', () => {
    assert.equal(typeof pack, 'function');
  });
  it('returns the optimal items', async() => {
    // Arrange
    // Act
    const receivedResponse = await pack('stub1.txt');

    // Assert
    assert.deepStrictEqual(
      receivedResponse,
      '4\n-\n2,7\n8,9'
    );
  });
});