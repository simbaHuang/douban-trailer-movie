const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path')
const { initSchemas, connect } = require('./database/init')

;(async () => {
	await connect()

	initSchemas()

	const Movie = mongoose.model('Movie')

	const movies = await Movie.find({})

	console.log(movies)
})()

const app = new Koa()

app.use(views(resolve(__dirname, 'views'), {
	extension: 'pug'
}))

app.use(async (ctx, next) => {
	await ctx.render('index', {
		name: 'Simba'
	})
})

app.listen(4455)