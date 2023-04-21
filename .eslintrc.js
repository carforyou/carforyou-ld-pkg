module.exports = {
  extends: ["@carforyou/eslint-config/react", "plugin:react-hooks/recommended"],
  overrides: [
    {
      files: ["*"],
      rules: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "no-restricted-imports": "off",
        // eslint-disable-next-line @typescript-eslint/naming-convention
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
