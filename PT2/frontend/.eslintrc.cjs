module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react-refresh'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single']
    }
};
