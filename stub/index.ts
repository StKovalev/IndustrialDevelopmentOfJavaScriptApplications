import { config } from '../webpack.config'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

const DEFAULT_PORT = 4444
const PORT = Number(process.env.PORT) || DEFAULT_PORT
const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler))

app.listen(PORT, () => {
    /* comment: url to output */
    /* eslint-disable-next-line no-console */
    console.log(`🚀 Dev server started at http://localhost:${PORT}/ 🚀`)
})