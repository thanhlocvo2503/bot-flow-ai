module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    settings: {
        react: { version: 'detect' },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'react-refresh', 'unused-imports'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'import/no-unresolved': [2, { caseSensitive: false }],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'import/named': 0,
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'no-useless-catch': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
