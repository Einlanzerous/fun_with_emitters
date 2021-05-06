const { isRealString } = require('../utils/validation');

describe('Validation Tests', () => {
  test('Verify that isRealString fails white space', () => {
    expect(isRealString('        ')).toBe(false);
    expect(isRealString('')).toBe(false);
  });

  test("Verify isRealString doesn't allow non-strings through", () => {
    expect(isRealString(555)).toBe(false);
  });

  test('Verify that isRealString allows actual strings through', () => {
    expect(isRealString('James')).toBe(true);
    expect(isRealString('  I am a real string')).toBe(true);
  });
});
