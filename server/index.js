const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { initSchemas, connect, initAdmin } = require('./database/init')
const router = require('./routes')

;(async () => {
	await connect()

	initSchemas()

	await initAdmin()

	// require('./tasks/movie')
	// require('./tasks/api')
	// require('./tasks/trailer')
	// require('./tasks/qiniu')
})()

const app = new Koa()

app
	.use(router.routes())
	.use(router.allowedMethods())

app.use(views(resolve(__dirname, 'views'), {
	extension: 'pug'
}))

app.use(async (ctx, next) => {
	await ctx.render('index', {
		name: 'Simba'
	})
})

app.listen(4455)