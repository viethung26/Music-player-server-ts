const route = require('express').Router()
import mongoose from 'mongoose'
const Grid = require('gridfs-stream')
Grid.mongo = mongoose.mongo
const conn = mongoose.createConnection('mongodb://localhost:27017/music-player', {useNewUrlParser: true, useUnifiedTopology: true})
route.get('/', (req, res) => {
    const gfsBucket = new mongoose.mongo.GridFSBucket(conn.db)
    gfsBucket.find({}).toArray((err, files) => {
        if (err) res.sendStatus(404)
        res.json(files)
    })
})

route.post('/test',(req, res, next) => {
    console.info('9779 upload')
    const bucket = new mongoose.mongo.GridFSBucket(conn.db)
    // const name = req.body && `${req.body.name}.mp3` || 'music.mp3'
    const name = 'bac phan 2.mp3'
    const gfs = Grid(conn.db)
    // const writeStream = gfs.createWriteStream({
    //     filename: name
    // })
    // req.write(writeStream)
    const writeStream = bucket.openUploadStream(name)
    req.pipe(writeStream)
    res.end('end')
})


// route.post('/test', (req, res) => {
//     console.info('9779 test', "oke")
//     res.json(true)
// })

route.get('/:id', (req, res) => {
    const _id = new mongoose.mongo.ObjectID(req.params.id)
    const gfs = Grid(conn.db)
    const gfsBucket = new mongoose.mongo.GridFSBucket(conn.db)
    gfsBucket.find({_id}).toArray((err, files)=> {
        if (err) res.json(err)
        else {
            const file = files[0]
            if (file) {
                let start, end
                const range = req.header("Range")
                if (range) {
                    [start, end] = range.split('=')[1].split('-')
                    const offset = 131072
                    start = start > file.length -1 ? 0 : Number(start)
                    end = !end ? Number(start) + offset : Number(end)
                    end = end > file.length - 1 ? file.length - 1 : Number(end)
                } else {
                    start = 0
                    end = file.length -1
                }
                // const readStream = gfsBucket.openDownloadStream(_id, {
                //     start, end
                // })
                const readStream = gfs.createReadStream({
                    _id,
                    range: {
                        startPos: start,
                        endPos: end
                    }
                })
                res.set({
                    'Content-Type': "audio/mpeg",
                    'Accept-Ranges': "bytes",
                    "Transfer-Encoding": 'chunked',
                    "Content-Length": `${end-start+1}`,
                    "Content-Range": `bytes ${start}-${end}/${file.length}`,
                })
                console.info('9779 play', file.filename)
                res.statusCode = 206
                readStream.pipe(res)
            } else {
                res.sendStatus(404)
            }
        }
    })
})

module.exports = route