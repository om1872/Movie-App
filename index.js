const express = require('express');
const fetch = require('node-fetch');
var path = require('path');
const bodyParser=require('body-parser');
const database = require('./database/connect');

const homeRoute=require('./controller/homeRoute'); 
const dashboardRoutes=require('./controller/dashboardRoutes');
const searchController=require('./controller/searchController');
const movieUploadController=require('./controller/movieUploadController');


const app = express();

const PORT =process.env.PORT || 3000;


//ejs , view and static files like external javascript files, css files and images configuration
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.static(__dirname + '/resources'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.clear();
    console.log(`${req.method}: ${req.url}`);
    next();
})


app.use('/',homeRoute);
app.use('/api',dashboardRoutes);
app.use('/api/search',searchController);
app.use('/api/movie',movieUploadController);

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});