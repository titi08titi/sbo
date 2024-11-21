module.exports = {
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)spec.ts?(x)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '/__snapshots__/'],
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: ['<rootDir>/src/components/**/*.ts?(x)'],
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 0,
      functions: 1,
      lines: 1,
    },
  },
  verbose: false,
  moduleNameMapper: {
    '#(.*)$': '<rootDir>/src/$1',
    '@/(.*)$': '<rootDir>/public/$1',
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['next'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js',
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        diagnostics: {
          // note: don't fail at compilation except on ci
          // https://huafu.github.io/ts-jest/user/config/diagnostics
          warnOnly: process.env.CUSTOM_ENV !== 'test',
        },
      },
    ],
  },
}
