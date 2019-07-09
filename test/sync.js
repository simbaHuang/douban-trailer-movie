const doSync = (sth, time) => new Promise(resolve => {
    setTimeout(() => {
        console.log(sth + '用了 ' + time + ' 毫秒')
        resolve()
    }, time)
})

const doAsync = (sth, time, cb) => {
    setTimeout(() => {
        console.log(sth + '用了 ' + time + ' 毫秒')
        cb && cb()
    }, time)
}

const doElse = (sth) => {
    console.log(sth)
}

const Simba = { doSync, doAsync }
const Lan = { doSync, doAsync, doElse }

;(async () => {
    console.log('case1 1: Lan 来到门口')
    await Simba.doSync('Simba 刷牙', 1000)
    console.log('啥也没干，一直等')
    await Lan.doSync('Lan 洗澡', 2000)
    console.log('Lan 去忙别的')

    console.log('case 3: Lan 来到门口按下通知开关')
    Simba.doAsync('Simba 刷牙', 1000, () => {
        console.log('卫生间通知Lan 洗澡')
        Lan.doAsync('Lan 洗澡', 2000)
    })

    Lan.doElse('Lan 去忙别的了')
})()