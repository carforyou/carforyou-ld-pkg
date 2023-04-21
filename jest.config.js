module.exports = {
  testPathIgnorePatterns: ["<rootDir>/pkg/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.(t|j)s?(x)"],
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "\\.tsx?$": "ts-jest",
  },
  testEnvironment: "jsdom",
}
