//node modules
const { Router } = require('express');
const { decode } = require('jsonwebtoken');

//Schema
const Bucket = require('../database/Bucket');
const BucketItem = require('../database/BucketItem');

//utils
const genre = require('../utils/genre').gen;
const { fetchData } = require('../utils/helper');
const { addItemErrors, createBucketErrors, deleteItemErrors } = require('../utils/Errors/BucketError');

const route = Router();

route.get('/myBucket', async (req, res) => {
    // const { bucketId } = req.query;
    const token = req.cookies.jwt;
    if (token) {
        try {
            const payload = decode(token);
            const userId = payload.id;
            const bucket = await Bucket.find({ "userId": userId });
            const { tvGenre, movieGenre } = await genre();

            res.render('myBucket', {
                tvGenre, movieGenre, bucket
            })
        } catch (err) {
            console.log('Error: ' + err);
            // const errors = createBucketErrors(err);
            res.status(401).send({ 'errror_obj': errors, error: 1 });
        }
    } else {
        res.status(302).send({ msg: "Require Login", error: 1 });
    }
})

route.get('/getBucketByUser', async (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const payload = decode(token);
            const userId = payload.id;
            const bucket = await Bucket.find({ "userId": userId }).sort({ '_id': -1 });
            res.status(200).send({ data: bucket, error: 0 });
        } catch (err) {
            console.log('Error: ' + err);
            res.status(401).send({ 'error_obj': "No Buckets", error: 1 });
        }
    } else {
        res.status(302).send({ msg: "Require Login", error: 1 });
    }
});

route.get('/getBucketById', async (req, res) => {
    const { bucketId } = req.query;
    const token = req.cookies.jwt;
    if (!bucketId.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(404).send({ "error_obj": { "bucketId": "BucketId Not Valid" }, error: 1 });
    } else {
        if (token) {
            try {
                const payload = decode(token);
                const userId = payload.id;
                const data = await BucketItem.find({ "bucketId": bucketId, "userId": userId });
                const bucket = await Bucket.findById(bucketId);
                // const {tvGenre,movieGenre}=await genre();

                res.status(200).send({ obj: { data, bucket }, error: 0 });
            } catch (err) {
                console.log('Error: ' + err);
                // const errors = createBucketErrors(err);
                res.status(401).send({ 'errror_obj': errors, error: 1 });
            }
        } else {
            res.status(302).send({ msg: "Require Login", error: 1 });
        }
    }
})

//add movies/tv in bucket
route.post('/addItem', async (req, res) => {
    const { tmdbId, bucketId, movieName, moviePoster, type } = req.body;
    const token = req.cookies.jwt;
    if (!bucketId.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(404).send({ "error_obj": { "bucketId": "BucketId Not Valid" }, error: 1 });
    } else {
        if (token) {
            try {
                const payload = decode(token);
                const userId = payload.id;
                const bucket = await Bucket.findOne({ "_id": bucketId, "userId": userId });
                if (bucket) {
                    const item = await BucketItem.create({ bucketId, userId, tmdbId, movieName, moviePoster, type, unique: tmdbId + bucketId });
                    bucket.itemCount++;
                    await bucket.save();
                    res.status(200).send({ itemId: item._id, msg: "Added", error: 0 });
                } else {
                    res.status(404).send({ 'error_obj': { "bucketId": 'No Bucket exist' }, error: 1 });
                }
            } catch (err) {
                console.log('Error: ' + err);
                const errors = addItemErrors(err);
                res.status(401).send({ 'error_obj': errors, error: 1 });
            }
        } else {
            res.status(302).send({ msg: "Require Login", error: 1 });
        }
    }
})

//remove item from bucket
route.delete('/removeItem', async (req, res) => {
    const { itemId, bucketId } = req.body;
    const token = req.cookies.jwt;
    if (!bucketId.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(404).send({ "error_obj": { "bucketId": "BucketId Not Valid" }, error: 1 });
    } else {
        if (token) {
            try {
                const payload = decode(token);
                const userId = payload.id;
                const bucket = await Bucket.findOne({ "_id": bucketId, "userId": userId });
                if (bucket) {
                    const del = await BucketItem.deleteOne({ "_id": itemId });
                    bucket.itemCount--;
                    await bucket.save();
                    res.status(200).send({ msg: "Removed", error: 0 });
                } else {
                    res.status(404).send({ 'error_obj': { "bucketId": 'No Bucket exist' }, error: 1 });
                }
            } catch (err) {
                console.log('Error: ' + err);
                const errors = deleteItemErrors(err);
                res.status(401).send({ 'errror_obj': errors, error: 1 });
            }
        } else {
            res.status(302).send({ msg: "Require Login", error: 1 });
        }
    }
})

//create bucket
route.post('/createBucket', async (req, res) => {
    const token = req.cookies.jwt;
    const { bucketName } = req.body;
    if (token) {
        try {
            const payload = decode(token);
            const userId = payload.id;
            const bucket = new Bucket({
                bucketName, userId, unique: `${bucketName}+${userId}`
            });
            await bucket.save();
            res.status(200).send({ msg: "Bucket Created Successfully", error: 0 });
        } catch (err) {
            console.log('Error: ' + err);
            const errors = createBucketErrors(err);
            res.status(401).send({ 'error_obj': errors, error: 1 });
        }
    } else {
        res.status(302).send({ 'error_obj': "Require Login", error: 1 });
    }
})

//delete bucket
route.delete('/deleteBucket', async (req, res) => {
    const token = req.cookies.jwt;
    const { bucketId } = req.query;
    if (!bucketId.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(404).send({ "error_obj": { "bucketId": "BucketId Not Valid" }, error: 1 });
    } else {
        if (token) {
            try {
                const payload = decode(token);
                const userId = payload.id;
                await Bucket.deleteById(bucketId);
                await BucketItem.deleteMany({ "bucketId": bucketId, "userId": userId });
                res.status(200).send({ msg: "Bucket Deleted Successfully", error: 0 });
            } catch (err) {
                console.log('Error: ' + err);
                res.status(401).send({ 'errror_obj': { "bucketId": "Bucket Not Found" }, error: 1 });
            }
        } else {
            res.status(302).send({ msg: "Require Login", error: 1 });
        }
    }
})

module.exports = route;