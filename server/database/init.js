const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = 'mongodb://localhost/douban-test'

mongoose.Promise = global.Promise

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
    const User = mongoose.model('User')
    let user = await User.findOne({
        username: 'Simba'
    })

    if (!user) {
        const user = new User({
            username: 'Simba',
            email: 'hx@imooc.com',
            password: 'simba'
        })

        await user.save()
    }
}

exports.connect = () => {
    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
    
        mongoose.connect(db, {
            useNewUrlParser: true
        })
        
        mongoose.connection.on('disconnected', () => {
            maxConnectTimes ++
            if (maxConnectTimes < 5) {
                mongoose.connect(db, {
                    useNewUrlParser: true
                })
            } else {
                throw new Error('服务器挂了~~~')
            }
        })
        mongoose.connection.on('error', err => {
            maxConnectTimes ++

            if (maxConnectTimes < 5) {
                mongoose.connect(db, {
                    useNewUrlParser: true
                })
            } else {
                throw new Error('服务器挂了~~~')
            }
        })
        mongoose.connection.once('open', () => {
            // const Dog = mongoose.model('Dog', { name: String})
            // const doga = new Dog({ name: '阿尔法'})

            // doga.save().then(() => {
            //     console.log('wangwangwang...')
            // })

            resolve()
            console.log('MongoDB Connected successfully!')
        })
    })
}