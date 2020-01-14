/* tslint:disable:object-literal-sort-keys */
module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false
    }
  },
  testPathIgnorePatterns: [
    "<rootDir>/pkg/"
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.(t|j)s"],
  preset: "ts-jest"
}
