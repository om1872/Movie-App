const mongoose=require('mongoose');
const mongoURI='mongodb://0.0.0.0:27017/movieApp';

module.exports=mongoose.connect(mongoURI).then(()=>{
    console.log('Connected to DB');
}).catch((e)=>{
    console.log(e);
});

// let gfs;
// conn.once("open",()=>{
//     //init stream
//     gfs = new mongoose.mongo.GridFSBucket(conn.db,{
//         bucketName: "videos"
//     })
// });

// const storage = new GridFsStorage({
//     url:mongoURI
// });
