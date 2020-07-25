module.exports = {
    // root config
    root: true,

    // use vue parser to parse SFC: https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
    parser: 'vue-eslint-parser',

    parserOptions: {
        // typescript parser
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module', // or script
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: false, // enable global strict mode (if ecmaVersion is 5 or greater)
            jsx: true,
        },
    },

    // set eslint env
    env: {
        browser: true,
        amd: true,
        node: true
    },

    // load plugin to load some ruleset
    plugins: [
        '@typescript-eslint',
        'vue',
    ],

    // specify which ruleset in plugin to use, only specify here the ruleset
    // in plugin can work
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
    ],
    // overrides some rule for specified files
    overrides: [
        {
            files: [ 'build/*.js' ],
            rules: {
                '@typescript-eslint/no-var-requires': 0
            },
        }
    ],

    rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'indent': [ 2, 4, { 'SwitchCase': 1 } ],
        'no-multi-spaces': 2,
        'no-trailing-spaces': 2,
        'no-extra-semi': 2,
        quotes: [ 2, 'single' ],
        semi: [ 2, 'never'],
    }
}
