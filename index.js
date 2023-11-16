const express = require('express');
const fetch = require('node-fetch');
var path = require('path');
const homeRoute=require('./controller/homeRoute');
const dashboardRoutes=require('./controller/dashboardRoutes');
const searchController=require('./controller/searchController');

const app = express();

const PORT = 3000;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.static(__dirname + '/resources'));


app.use((req,res,next)=>{
    console.clear();
    console.log(`${req.method}: ${req.url}`);
    next();
})


app.use('/',homeRoute);
app.use('/api',dashboardRoutes);
app.use('/api/get',searchController);

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});