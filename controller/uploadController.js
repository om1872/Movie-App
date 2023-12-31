const { Router } = require('express');
const genre = require('../utils/genre').gen;
const { fetchData } = require('../utils/helper');
const { bucket } = require('../database/connect');
const busboy = require('busboy');

// const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";
const API_KEY = process.env.API_KEY;

const route = Router();

function checkForId(id) {
    for (let i = 0; i < id.length; i++) {
        if ((id[i] >= 'a' && id[i] <= 'z') || (id[i] >= 'A' && id[i] <= 'Z'))
            return false;
    }
    return true;
}

route.get('/movieUpload', async (req, res) => {
    const { tvGenre, movieGenre } = await genre();
    let tmdbId=null;
    res.render("movieupload.ejs", {
        tvGenre, movieGenre, tmdbId
    });
});

route.get('/movieUpload/:id', async (req,res) => {
    const tmdbId = req.params.id;
    const { tvGenre, movieGenre } = await genre();
    res.render("movieupload.ejs", {
        tvGenre, movieGenre, tmdbId
    });
});

route.get('/checkMovieAvailability/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cursor = await bucket.find({ "_id": id }).toArray();
        if (cursor.length === 0) {
            res.status(201).send({ 'status': 0 });
        } else {
            res.status(201).send({ 'status': 1, 'fileInfo': cursor[0] });
        }
    } catch (err) {
        console.log('Error: ' + err);
        res.status(401).send({ 'status': 2 });
    }
})

route.post('/movie/:tmdbId', async (req, res) => {
    const { tmdbId } = req.params;
    try {
        const bb = busboy({ headers: req.headers });
        // bb.on('field',(name, val, info) => {
        //     if (name === 'tmdbId') {
        //         tmdbId = val;
        //     }
        // });
        bb.on('file', async (name, file, info) => {
            const { filename, encoding, mimeType } = info;

            console.log(
                `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
                filename,
                encoding,
                mimeType
            );
            try {
                const metadata = {
                    "encoding": encoding,
                    "mimeType": mimeType
                }
                const cursor = await bucket.find({ "_id": tmdbId }).toArray();
                if (cursor.length) {
                    console.log('Id already present');
                    res.status(401).send({ err: 1, msg: "Id already present" });
                    return;
                }
                file.pipe(bucket.openUploadStreamWithId(tmdbId, filename, {
                    chunkSizeBytes: 1048576,
                    metadata: metadata
                }).on('finish', () => {
                    console.log('File Uploaded Succesfully !!!');
                    res.status(201).send({ err: 0, msg: "File Uploaded Succesfully !!!" });
                    return;
                }).on('error', (err) => {
                    console.log('File Failed to Upload -->' + err);
                    res.status(501).send({ err: 1, msg: "File Failed to Upload" });
                    return;
                })
                );
            } catch (err) {
                console.log('Error: ' + err);
                res.status(404).send({ err: 1, msg: "Error occured server side" });
                return;
            }
        });

        // bb.on('close',async () => {
        //     console.log('S')
        // });
        req.pipe(bb);
    } catch (err) {
        console.log('Error: ' + err);
        res.status(404).send(err);
        return;
    }
});

route.post('/getSearchResult/:query', async (req, res) => {
    const { query } = req.params;
    let check = checkForId(query);
    if (check) {
        const url = `https://api.themoviedb.org/3/movie/${query}?&api_key=${API_KEY}`;
        const data = await fetchData(url);
        res.status(201).send(data);
    } else {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
        const data = await fetchData(url);
        res.status(201).send(data);
    }
});

route.delete('/delFile', async (req, res) => {
    const { tmdbId }  = req.body;
    console.log(req.body);
    try {
        const cursor=await bucket.find({"_id":tmdbId}).toArray();
        if(cursor.length==0){
        res.status(404).send({ error: 1, msg: 'File Not Found' });
        }else{
        await bucket.delete(tmdbId);
        res.status(200).send({ error: 0, msg: 'File Deleted Successfully' });
        }
    } catch (err) {
        console.log('Error: ' + err.message);
        res.status(401).send({error:1, msg:'File Failed to delte'});
    }
});

module.exports = route;