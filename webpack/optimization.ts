import TerserPlugin from 'terser-webpack-plugin'

export const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        parse: {},
        compress: true,
        mangle: true,
        module: false,
        format: {
          comments: false
        }
      },
      extractComments: false,
      parallel: true,
    }),
  ],
  usedExports: true
}