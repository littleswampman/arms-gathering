module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        project: "./tsconfig.eslint.json",
        sourceType: "module",
        tsconfigRootDir: __dirname,
    },
    plugins: [
        "import",
        "jsx-a11y",
        "prefer-arrow",
        "react",
        "react-hooks",
        "@typescript-eslint",
    ],
    root: true,
    rules: {
        // "no-use-before-define": "off",
        // "@typescript-eslint/no-use-before-define": ["error"],
        "import/prefer-default-export": "off",
        "import/no-default-export": "error",
        "@typescript-eslint/no-unused-expressions": [
            "error",
            { allowTernary: true },
        ],
        "lines-between-class-members": [
            "error",
            "always",
            {
                exceptAfterSingleLine: true,
            },
        ],
        "no-void": [
            "error",
            {
                allowAsStatement: true,
            },
        ],
        "padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "*",
                next: "return",
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            // NOTE
            {
                vars: "all",
                args: "after-used",
                argsIgnorePattern: "_",
                ignoreRestSiblings: false,
                varsIgnorePattern: "_",
            },
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "react/jsx-filename-extension": [
            "error",
            {
                extensions: [".jsx", ".tsx"],
            },
        ],
        "react/jsx-props-no-spreading": [
            "error",
            {
                html: "enforce",
                custom: "enforce",
                explicitSpread: "ignore",
            },
        ],
        "react/react-in-jsx-scope": "off",
        "prefer-arrow/prefer-arrow-functions": [
            "error",
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false,
            },
        ],
        "react/function-component-definition": [
            "error",
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function",
            },
        ],
    },
    overrides: [
        {
            files: ["*.tsx"],
            rules: {
                "react/prop-types": "off",
            },
        },
    ],
    settings: {
        "import/resolver": {
            node: {
                paths: ["src"],
            },
        },
    },
};
