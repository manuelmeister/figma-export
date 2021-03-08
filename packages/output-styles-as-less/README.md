# @figma-export/output-styles-as-less

> Styles Outputter for [@figma-export](https://github.com/marcomontalbano/figma-export) that exports styles to LESS.

With this outputter you can export all the styles as variables inside a `.less` file.

This is a sample of the output:

```sh
$ tree output/
# output/
# └── _variables.less
```


## .figmaexportrc.js

You can easily add this outputter to your `.figmaexportrc.js`:

```js
module.exports = {
    commands: [
        ['styles', {
            fileId: 'fzYhvQpqwhZDUImRz431Qo',
            outputters: [
                require('@proxy-figma-export/output-styles-as-less')({
                    output: './output'
                })
            ]
        }],
    ]
}
```

`output` is **mandatory**.

`getFilename` are **optional**.

```js
require('@proxy-figma-export/output-styles-as-less')({
    output: './output',
    getFilename: () => '_variables',
})
```

> *defaults may change, please refer to `./src/index.ts`*

## Install

Using npm:

```sh
npm install --save-dev @figma-export/output-styles-as-less
```

or using yarn:

```sh
yarn add @figma-export/output-styles-as-less --dev
```
