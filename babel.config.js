const browserslist = require('./.browserslist')

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: { 
          browsers: browserslist
        }
      }
    ],
    [
      '@babel/preset-react', { 
        throwIfNamespace: false
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@emotion', { 
        sourceMap: false 
      }
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties'
  ]
}