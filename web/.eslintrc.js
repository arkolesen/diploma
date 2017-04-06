module.exports = {
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'script', // modules are not yet supported by Node.js
    },
    env: {
        node: true,
    },
    settings: {
        'import/resolver': {
            node: {
                // add repository's root directory to the app module search path
                moduleDirectory: ['node_modules', './'],
            },
        },
    },
    rules: {
        // alphabetically sorted list of base rules' overrides
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'max-len': ['error', 120],
        'no-restricted-syntax': ['error', 'TryStatement', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        'no-underscore-dangle': ['error', { allow: ['_id'] }], // unable to avoid usage of MongoDB hardcoded ID field name
        'no-use-before-define': ['error', { 'functions': false }],
        'prefer-const': 'off',
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'ignore',
            exports: 'ignore',
            functions: 'ignore',
        }],
        'no-plusplus': 'off',
        'import/no-dynamic-require': 'off',
        'no-multiple-empty-lines': ['error', {'max': 1}],
        'newline-before-return': 'warn',
        'newline-after-var': ["error", "always"],
        'curly': ['warn', 'all'],
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    },
};
