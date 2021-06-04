import mongoose from 'mongoose'
const conn = mongoose.createConnection('mongodb://localhost:27017/music-player', {useNewUrlParser: true, useUnifiedTopology: true})

exports.getAll = (cb) => {
    const gfsBucket = new mongoose.mongo.GridFSBucket(conn.db)
    gfsBucket.find({}).toArray((err, files) => {
        if (err) cb(null)
        else cb(files)
    })
}