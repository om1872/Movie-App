const mongoose = require('mongoose');


const BucketSchema = new mongoose.Schema({
    bucketName: {
        type: mongoose.SchemaTypes.String,
        required: [true, 'Bucket Name is required']
    }, userId: {
        type: mongoose.SchemaTypes.String,
        required: [true, 'User is required']
    }, unique: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: [true, 'Same Bucket Already Exist']
    }, itemCount: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    }
    , createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model('buckets', BucketSchema);