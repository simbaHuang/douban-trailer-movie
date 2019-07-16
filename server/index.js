const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const { initSchemas, connect, initAdmin } = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = (app) => {
	R.map(
		R.compose(
			R.forEachObjIndexed(
				initWith => initWith(app)
			),
			require,
			name => resolve(__dirname, `./middlewares/${name}`)
		)
	)(MIDDLEWARES)
}

;(async () => {
	await connect()

	initSchemas()

	await initAdmin()

	// require('./tasks/movie')
	// require('./tasks/api')
	// require('./tasks/trailer')
	// require('./tasks/qiniu')
	
	const app = new Koa()
	await useMiddlewares(app)

	app.listen(4455)
})()