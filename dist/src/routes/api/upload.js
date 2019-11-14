"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const conn = mongoose_1.default.createConnection('mongodb://localhost:27017/music-player', { useNewUrlParser: true });
const fs = require('fs');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose_1.default.mongo;
const route = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
route.post('/', (req, res, next) => {
    const gfs = Grid(conn.db);
    const writeStream = gfs.createWriteStream({
        filename: 'ss'
    });
    req.pipe(writeStream);
});
route.get('/', (req, res, next) => {
    const gfs = Grid(conn.db);
    console.info('9779 req', req);
    gfs.files.findOne({ filename: 'ss' }, (err, file) => {
        if (file) {
            const range = req.header("Range").split('=')[1];
            let [start, end] = range.split('-');
            const offset = 1310720;
            start = start > file.length - 1 ? 0 : start;
            end = !end ? Number(start) + offset : end;
            end = end > file.length - 1 ? file.length - 1 : end;
            end = end === '1' ? file.length - 1 : end;
            console.info('9779 ', start, end);
            const readStream = gfs.createReadStream({
                filename: 'ss',
                range: {
                    startPos: start,
                    endPos: end
                }
            });
            console.info('9779 play');
            res.set({
                'Content-Type': "audio/mpeg",
                'Accept-Ranges': "bytes",
                "Transfer-Encoding": 'chunked',
                "Content-Length": `${end - start + 1}`,
                "Content-Range": `bytes ${start}-${end}/${file.length}`,
            });
            res.statusCode = 206;
            readStream.pipe(res);
            readStream.on('close', () => {
                console.info('9779 end');
            });
        }
        else {
            res.end('');
        }
    });
});
module.exports = route;
//# sourceMappingURL=upload.js.map