const express = require('express');
const cookieParser=require('cookie-parser');
var path = require('path');
//db
const database = require('./database/connect');


//middlewares
const {requiredAuth,checkUser}=require('./middleware/authMiddleware');

//controllers
const loginRoute=require('./controller/loginController')
const homeRoute=require('./controller/homeRoute'); 
const dashboardRoutes=require('./controller/dashboardRoutes');
const searchController=require('./controller/searchController');
const uploadController=require('./controller/uploadController');
const trendingController=require('./controller/trendingController');
const tvshowsController=require('./controller/tvshowsController');
const genreController=require('./controller/genreController');
const videoRenderController=require('./controller/videorenderController');
const bucketController=require('./controller/bucketController');


const app = express();

const PORT =process.env.PORT || 3000;


//ejs , view and static files like external javascript files, css files and images configuration
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.static(__dirname + '/resources'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use((req,res,next)=>{
    // console.clear();
    console.log(`${req.method}: ${req.url}`);
    next();
})

//current user
app.get('*',checkUser);

//all routes
app.use('/',homeRoute);
app.use('/api',dashboardRoutes);
app.use('/api/auth',loginRoute);
app.use('/api/search',searchController);
app.use('/api/upload',requiredAuth,uploadController);
app.use('/api/bucket',requiredAuth,bucketController);
app.use('/api/tvshows',tvshowsController);
app.use('/api/genre',genreController);
app.use('/api/trending',trendingController);
app.use('/api/render',videoRenderController);


app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});