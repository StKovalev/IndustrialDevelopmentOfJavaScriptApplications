import autoprefixer from 'autoprefixer'
import babelOptions from '../babel.config'
import browserslist from '../.browserslist'
import cssnano from 'cssnano'
import path from 'path'
import postcssCalc from 'postcss-calc'
import postcssColorFunction from 'postcss-color-function'
import postcssCustomMedia from 'postcss-custom-media'
import postcssCustomProperties from 'postcss-custom-properties'
import postcssDiscardComments from 'postcss-discard-comments'
import postcssFor from 'postcss-for'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'

const assetsResource = 'asset/resource'

export const rules = [
    {
        test: /\.(js|ts)x?$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    ...babelOptions
                }
            }
        ],
        exclude: [
            /* Чтобы не парсить тесты в node_modules/@sbol */
            /\.spec\.(ts|js)x?$/,
            /* Чтобы не парсить 3rd-party библиотеки, но под прямыми импортами парсить @sbol, и чтобы парсить strip-ansi и ее зависимость ansi-regex, из-за них не работало локально в IE11 */
            /node_modules[\\/](?!((@sbol|strip-ansi|ansi-regex)[\\/])|(.*[\\/](strip-ansi|ansi-regex))[\\/]).*/
        ]
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              postcssImport,
              postcssFor,
              postcssCustomProperties({ 
                preserve: false 
              }),
              postcssCustomMedia({ 
                preserve: false 
              }),
              postcssNested,
              postcssColorFunction,
              autoprefixer({
                  overrideBrowserslist: browserslist,
                  grid: true
              }),
              postcssCalc,
              postcssDiscardComments,
              cssnano({ 
                preset: 'default' 
              })
            ]
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: assetsResource
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
      options: {
        removeTags: true,
        removingTags: ['title', 'desc'],
        removeSVGTagAttrs: false
      }
    },
    {
      test: /\.(woff|woff2)$/,
      type: assetsResource,
      generator: {
        filename: path.join('fonts', '[name].[contenthash][ext]')
      }
    }
]
