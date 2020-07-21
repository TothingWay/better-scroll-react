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