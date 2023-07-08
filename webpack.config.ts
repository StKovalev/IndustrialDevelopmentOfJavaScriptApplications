import { devPlugins, prodPlugins } from './webpack/plugins'

import type { Configuration } from 'webpack'
import { optimization } from './webpack/optimization'
import path from 'path'
import { rules } from './webpack/rules'

const { NODE_ENV = 'development' } = process.env as {
    NODE_ENV: Configuration['mode']
}

const cwd = process.cwd()

export const config: Configuration = {
    mode: NODE_ENV,
    entry: 'src/index.tsx',

    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
        modules: [cwd, 'node_modules'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },

    module: { rules },

    // comment: Need turn off optimization for development
    // eslint-disable-next-line no-undefined
    // optimization: NODE_ENV === 'production' ? optimization : undefined,

    // devtool: NODE_ENV !== 'production' && 'eval-source-map',
    devtool: 'source-map',
    plugins: NODE_ENV === 'production' ? prodPlugins : devPlugins,

    context: cwd,

    cache: {
        type: 'filesystem',
    },

    output: {
        path: path.resolve(cwd, 'dist'),
        filename: 'main.js',
        // assetModuleFilename: path.join('assets', '[name].[contenthash][ext]')
    }
}