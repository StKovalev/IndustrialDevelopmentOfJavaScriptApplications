import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const cwd = process.cwd()
const { NODE_ENV } = process.env

export const devPlugins = [
  new webpack.DefinePlugin({
    DEBUG: NODE_ENV === 'development',
    'process.env.BROWSER': JSON.stringify(true),
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../stub/index.html'),
    filename: 'index.html'
  }),
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      /* Контекст того, что требуется проверить */
      context: cwd,
      /* Путь до конфигурационного файла */
      configFile: path.resolve(__dirname, '../tsconfig.json'),
      diagnosticOptions: {
        /* Проверка семантических, синтаксических и dts ошибок */
        semantic: true,
        syntactic: true,
        declaration: true
      },
      /* https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#readme */
      /* С бабелем рекомендуется использовать этот режим для ускорения сборки */
      mode: 'write-references'
    }
  }),
  new BundleAnalyzerPlugin({
    openAnalyzer: false
  })
]

export const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env.BROWSER': JSON.stringify(true),
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../stub/index.html'),
    filename: 'index.html'
  }),
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      /* Контекст того, что требуется проверить */
      context: cwd,
      /* Путь до конфигурационного файла */
      configFile: path.resolve(__dirname, '../tsconfig.json'),
      diagnosticOptions: {
        /* Проверка семантических, синтаксических и dts ошибок */
        semantic: true,
        syntactic: true,
        declaration: true
      },
      /* https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#readme */
      /* С бабелем рекомендуется использовать этот режим для ускорения сборки */
      mode: 'write-references'
    }
  })
]