const req = require.context('../../icons/svg', false, /\.svg$/)

const re = /\.\/(.*)\.svg/

const svgIcons = req.keys().map(i => {
  return i.match(re)![1]!
})

export default svgIcons
