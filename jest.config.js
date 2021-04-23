module.exports = {
  testPathIgnorePatterns: ["<rootDir>/pkg/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.(t|j)s?(x)"],
  transform: {
    "\\.tsx?$": "ts-jest",
  },
}
