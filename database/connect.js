const mongoose=require('mongoose');
const mongodb=require('mongodb');
const genre=require('../utils/genre');
const addAdmin=require('../controller/loginController').addAdmin;
console.log(addAdmin)

// const dbName='movieDatabase';
// const password='Win8prof%40';  // @ --> %40
// const mongoURI=`mongodb://0.0.0.0:27017/movieDB`;
const mongoURI= process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/movieDB';

const conn=mongoose.connect(mongoURI).then(()=>{
    console.log('Connected to DB');
    genre.load();
    addAdmin();
}).catch((e)=>{
    console.log(e);
});

const bucket = new mongodb.GridFSBucket(mongoose.connection, { bucketName: 'videos' });

module.exports={conn,bucket};