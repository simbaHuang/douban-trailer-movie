const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const doubanId = '26739551'
const videoBase = `https://movie.douban.com/trailer/219491`

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;(async () => {
    console.log('Start visit the target page')

    const brower = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })

    const page = await brower.newPage()
    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2'
    })

    await sleep(1000)

    const result = await page.evaluate(() => {
        let $ = window.$
        let it = $('.related-pic-video')

        if (it && it.length) {
            let link = it.attr('href')
            let cover = it.attr('style').replace('background-image:url(', '').replace(')', '')

            return {
                link,
                cover
            }
        }

        return {}
    })

    let video
    if (result.link) {
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        })
        await sleep(2000)

        video = await page.evaluate(() => {
            let $ = window.$
            let it = $('source')

            if ( it && it.length) {
                return it.attr('src')
            }

            return ''
        })
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }

    brower.close()

    process.send({data})
    process.exit(0)
    // console.log(result)
})()