const mongoose=require('mongoose');


const BucketItemSchema=new mongoose.Schema({
    bucketId:{
        type:mongoose.SchemaTypes.String,
        required:[true,'Bucket Id is required']
    },userId:{
        type:mongoose.SchemaTypes.String,
        required:[true,'User is required']
    },tmdbId:{
        type:mongoose.SchemaTypes.String,
        required:[true,'tmdbId is required']
    },unique:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique:[true,'File Already Exist in Bucket']
    },addedAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
});

module.exports=mongoose.model('bucketItems',BucketItemSchema);