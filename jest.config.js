module.exports = {
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
