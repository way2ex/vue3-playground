# My vue3 playground project

## Use vue3

### Add vue@3.0.0
I was usign the latest version of vue and now can use vue3 normally. 

> I was using yarn to manage dependencies.

- First, install the dependencies
```bash
yarn add vue@next
yarn add -D @vue/compiler-sfc vue-style-loader vue-loader@next css-loader
```
  - [`@vue/compiler-sfc`](https://github.com/vuejs/vue-next/tree/master/packages/compiler-sfc#readme) is used to compile SFC into javascript.
  - [`vue-loader@next`](https://github.com/vuejs/vue-loader/tree/next) is loader for vue3.x

- Then update our `webpack config` as normal vue2.x project .
> We can add vue alias to avoid some question according to [Evan's project](https://github.com/vuejs/vue-next-webpack-preview/blob/master/webpack.config.js#L14) :
```js
module.exports = {
    resolve: {
        alias: {
            'vue': '@vue/runtime-dom',
        },
    },
};
```

### Config ESLint
- First, install dependencies: [eslint-plugin-vue@next](https://eslint.vuejs.org/)
```bash
yarn add -D eslint eslint-plugin-vue@next
```
- Then, add config in `.eslintrc.js`
```js
module.exports = {
    parser: 'vue-eslint-parser',
    plugins: [
        '@typescript-eslint',
        'vue',
    ],
    extends: [
        // other rules: 'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
};
```

In order to parse SFC, we must specify `parser: 'vue-eslint-parser'` in top level.

If you want to use custom parser, you must add it in `parserOptions` :
```js
module.exports = {
    parserOptions: {
        // typescript parser
        parser: '@typescript-eslint/parser',
    }
}
```

#### Questions
- **multiple root element in `template`**
    Currently if we use `multiple root element` in `template`, `Vetur` will report error. We can config `vetur` setting:
    ```js
        "vetur.validation.template": false
    ```

    More information, see:
    - [valid-template-root root requires exactly one element](https://github.com/vuejs/vetur/issues/1976)
    - [Vue 2/3 Eslint rules](https://github.com/vuejs/vetur/issues/2015).


## Use ESLint with TypeScript
TypeScript has decided to use ESLint to check code.

[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)

- First install the required packages:
```bash
yarn add -D typescript @typescript-eslint/parser  @typescript-eslint/eslint-plugin
```
- Then create a config file in root `.eslintrc.js`, and use `@typescript-eslint/parser` as the parser:
```js
module.exports = {
    parser: '@typescript-eslint/parser',
};
```

-  Use `env: { node: true }` to enable the use of  `module.exports`.

-  Using `require` in `webpack.config.js` will report error，we can use `overrides` to override the rules in `build` directory：
```js
module.exports = {
    overrides: [
        { 
          files: [ 'build/*.js' ],
          rules: {
            "@typescript-eslint/no-var-requires": "off"
          }
        }
    ]
}
```
