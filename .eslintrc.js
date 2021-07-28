module.exports = {
  extends: ["@carforyou/eslint-config/react", "plugin:react-hooks/recommended"],
  overrides: [
    {
      files: ["*"],
      rules: {
        "no-restricted-imports": "off",
        "react-hooks/exhaustive-deps": [
          "error",
          {
            additionalHooks: "useDeepCompareEffect",
          },
        ],
      },
    },
  ],
}
