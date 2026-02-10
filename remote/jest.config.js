module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^shared/DataTable$': '<rootDir>/../shared/src/components/DataTable.tsx',
    '^shared/Button$': '<rootDir>/../shared/src/components/Button.tsx',
    '^shared/MainContent$': '<rootDir>/../shared/src/components/MainContent.tsx',
    '^shared/DateSelector$': '<rootDir>/../shared/src/components/DateSelector.tsx',
    '^shared/theme$': '<rootDir>/../shared/src/theme/index.ts',
    '^shared/api$': '<rootDir>/../shared/src/services/api.ts',
    '^shared/(.*)$': '<rootDir>/../shared/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.tsx', '**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/bootstrap.tsx',
  ],
};
