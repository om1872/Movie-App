const { Router } = require('express');
const { bucket } = require('../database/connect');

const route = Router();


route.get('/video/:id', async (req, res) => {
    const { id } = req.params;
    const range = req.headers.range;
    try {
        const cursor = await bucket.find({ "_id": id }).toArray();
        const document = cursor[0];
        const size = document.length;
        const type = document.metadata.mimeType;
        if (range) {
            let CHUNK_SIZE = 1024 * 1024; // 1MB
            var parts = range.replace(/bytes=/, "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];
            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : Math.min(start + CHUNK_SIZE, size -1);
            if (start >= size) {
                res.writeHead(416, {
                    "Content-Range": `bytes */${size}`
                })
                return res.end();
            }
            try {
                
                const downloadStream = await bucket.openDownloadStream(id, {
                    start: start,
                    end: end==size-1?size:end
                });
                const contentLength = end - start +1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${size}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": `${contentLength}`,
                    "Content-Type": type,
                };
                res.writeHead(206, headers);
                console.info('Satisfied Range: '+`${start}-${end}/${size}`);

                downloadStream.pipe(res);
            } catch (err) {
                console.log('Error: ' + err);
                res.status(416).send();
            }
        }else{
            const downloadStream = await bucket.openDownloadStream(id);
            res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate');
            res.setHeader('Content-Length', size.toString());
            res.setHeader('Content-Type', type);
            res.writeHead(200);
            res.end(downloadStream);
        }
    } catch (err) {
        console.log('Error: ' + err);
        res.status(416).send();
    }
});

module.exports = route;