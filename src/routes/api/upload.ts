import mongoose from 'mongoose'
import {Readable} from 'stream'
const conn = mongoose.createConnection('mongodb://localhost:27017/music-player', {useNewUrlParser: true, useUnifiedTopology: true})
const Grid = require('gridfs-stream')
Grid.mongo = mongoose.mongo
const route = require('express').Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage})

route.post('/test', async (req, res) => {
    const bucket = new mongoose.mongo.GridFSBucket(conn.db)
    req.pause()
    const {"content-md5": md5} = req.headers
    console.info('9779 ', md5)
    // console.info('9779 upload', req.body, req.headers)
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.info('9779 md5', md5)
            resolve(true)
        }, 5000)
    })
    req.resume()
    const name = 'test.mp3'
    const writeStream = bucket.openUploadStream(name)
    // req.pipe(writeStream)
    req.pipe(writeStream, () => {
        console.info('9779 end')
        res.end('end')
    })
    let data = ''
    req.on('data', val => {
        data += val
    })
    req.on('end', () => {
        // console.info('9779 end', data)
        res.end('hi')
    })
})
route.get('/', (req, res) => {
    res.end('ok')
})
route.post('/',upload.single('hung'), (req, res, next) => {
    const bucket = new mongoose.mongo.GridFSBucket(conn.db)
    const {buffer} = req.file
    // const name = req.body && `${req.body.name}.mp3` || 'music.mp3'
    const name = 'test.mp3'
    const gfs = Grid(conn.db)
    // const writeStream = gfs.createWriteStream({
    //     filename: name
    // })
    // req.write(writeStream)
    console.info('9779 buffer', buffer)
    const writeStream = bucket.openUploadStream(name)
    // req.pipe(writeStream)
    writeStream.write(buffer, () => {
        console.info('9779 end')
        res.end('end')
    })
})

route.get('/file.mp3', (req, res, next) => {
    // console.info('9779 req', req.headers)
    const gfsBucket = new mongoose.mongo.GridFSBucket(conn.db)
    const _id = new mongoose.mongo.ObjectID("5dd15c65b3e53fc4e80aaecb")
    const readStream = gfsBucket.openDownloadStream(_id)
    readStream.pipe(res)
    // const gfs = Grid(conn.db)
    // gfs.files.findOne({filename: 'nhac.mp3'}, (err, file) => {
    //     if (file) {
    //         let start, end
    //         const range = req.header("Range").split('=')[1];
    //         if (range) {
    //             [start, end] = range.split('-')
    //             const offset = 131072
    //             start = start > file.length -1 ? 0 : Number(start)
    //             end = !end ? Number(start) + offset : Number(end)
    //             end = end > file.length - 1 ? file.length - 1 : Number(end)
    //         } else {
    //             start = 0
    //             end = file.length -1
    //         }
    //         // const readStream2 = gfsBucket.openDownloadStream(_id, {
    //         //     start, end
    //         // })
    //         const readStream = gfs.createReadStream({
    //             filename: 'nhac.mp3',
    //             range: {
    //                 startPos: start,
    //                 endPos: end
    //             }
    //         })
    //         res.set({
    //             'Content-Type': "audio/mpeg",
    //             'Accept-Ranges': "bytes",
    //             "Transfer-Encoding": 'chunked',
    //             "Connection": "close",
    //             "Content-Length": `${end-start+1}`,
    //             "Content-Range": `bytes ${start}-${end}/${file.length}`,
    //         })
    //         res.statusCode = 206
    //         readStream.pipe(res)
    //     } else {
    //         res.end('')
    //     }
    // })
    
})

module.exports = route