const mongoose=require('mongoose');
const mongodb=require('mongodb');

// const dbName='movieDatabase';
// const password='Win8prof%40';  // @ --> %40
const mongoURI=`mongodb://0.0.0.0:27017/movieDB`;

const conn=mongoose.connect(mongoURI).then(()=>{
    console.log('Connected to DB');
}).catch((e)=>{
    console.log(e);
});

const bucket = new mongodb.GridFSBucket(mongoose.connection, { bucketName: 'videos' });

module.exports={conn,bucket};