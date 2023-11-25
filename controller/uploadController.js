const { Router } = require('express');
const multer= require('multer');
const storage=require('../database/gridFS');
const genre=require('../utils/genre');
const { fetchData } = require('../utils/helper');

const route = Router();
// const upload=multer({storage});

// route.get('/movieUpload', upload.single("file"),(req,res)=>{
//     res.send(201);
// });

module.exports=route;