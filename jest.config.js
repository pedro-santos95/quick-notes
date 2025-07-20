module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // ajuste se não estiver usando src/
  },
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"],
};