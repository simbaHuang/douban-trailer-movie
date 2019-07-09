const rp = require('request-promise-native')

async function fetchMovie (item) {
    const url = `https://douban.uieee.com/v2/movie/subject/${item.doubanId}`
    // const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    return res
}

;(async () => {
    let movies = [
        {
            doubanId: 30468860,
            title: '张国荣跨越97演唱会',
            rate: 9.8,
            poster:'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2549159520.jpg'
        },
        {
            doubanId: 4933235,
            title: '是，大臣  第三季',
            rate: 9.8,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2187837418.jpg'
        }        
    ]

    movies.map(async movie => {
        let movieData = await fetchMovie(movie)

        try {
            movieData = JSON.parse(movieData)
            console.log(movieData.tags)
            console.log(movieData.summary)
        } catch (err) {
            console.log(err)
        }
    })
})()