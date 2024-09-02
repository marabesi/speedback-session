module.exports = {
   'roots': [
    '<rootDir>/'
  ],
  'testMatch': [
    '**/?(*.)+(spec|test).+(ts)'
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  "setupFilesAfterEnv": ["./testSetup.ts"]
};