const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
	ctx.body = 'hi simba'
})

app.listen(4455)