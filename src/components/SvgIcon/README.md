## Intro

将.svg文件放入/src/icons/svg目录下，即可通过 `<SvgIcon iconClass={//svg文件名} />`使用svg图标，svg的大小和颜色可通过css配置


## Dependencies

```
npm install svg-sprite-loader --save

// or

yarn add svg-sprite-loader
```

## Config

```javascript
// webpack.config.js
{
  // ...
  module: {
    // ...
    rules: [
      // ...
      {
        oneOf: [
          // ...
          {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: path.resolve(__dirname, '../src/icons/svg'),
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ]
      }
    ]
  }
}

// src/icons
```


## Example

Detail see `/src/demo/SvgIcon`


## Svgo

Tool for optimizing SVG files

```
npm install svgo -D

// or

yarn add svgo -D
```

#### Usage

```
npm run svgo
```