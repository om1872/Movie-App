const { Router } = require('express');

//gridfs bucket
const {bucket} =require('../database/connect');

//Schema
const Bucket = require('../database/Bucket');
const BucketItem = require('../database/BucketItem');

//utils
const genre=require('../utils/genre').gen;
const { fetchData } = require('../utils/helper');

const route = Router();

// const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";
const API_KEY=process.env.API_KEY;
const discoverMovie=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const poster=`http://image.tmdb.org/t/p/w500`;



route.get('/dashboard',async (req,res)=>{
    let popular=[];
    let topRated=[];
    let tv=[];
    let url=`${discoverMovie}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    await fetch(url).then(res=> res.json())
    .then(json => {
        json.results.forEach(result=>{
            popular.push({
                id:`${result.id}`,
                title:`${result.original_title}`,
                src:`${poster}${result.poster_path}`
            });
        })
    }).catch(err => {
        console.error('Error:'+err);
    });

    url=`${discoverMovie}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
    await fetch(url).then(res=> res.json())
    .then(json => {
        json.results.forEach(result=>{
            topRated.push({
                id:`${result.id}`,
                title:`${result.original_title}`,
                src:`${poster}${result.poster_path}`
            });
        })
    }).catch(err => {
        console.error('Error: '+err);
    });

    url=`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en`;
    await fetch(url).then(res=> res.json())
    .then(json => {
        json.results.forEach(result=>{
            tv.push({
                id:`${result.id}`,
                title:`${result.name}`,
                src:`${poster}${result.poster_path}`
            });
        })
    }).catch(err => {
        console.error('Error: '+err);
    });
    const {tvGenre,movieGenre}=await genre();
    res.render('dashboard',{
        popular:popular,
        topRated:topRated,
        tvShows:tv,
        tvGenre, movieGenre
    });
});

route.get('/movie/:id',async (req,res)=>{
    const {id}= req.params;
    let url=`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${API_KEY}&append_to_response=videos`;
    const movie=await fetchData(url);

    const cursor=await bucket.find({"_id":id}).toArray();
    let localURL="";
    if(cursor.length===1){
        localURL=`/api/render/video/${id}`;
    }
    

    const {tvGenre,movieGenre}=await genre();
    const videos=movie.videos;
    res.render('movie',{
        movie, tvGenre, movieGenre,videos,localURL
    });
});

route.get('/tv/:id',async (req,res)=>{
    const {id}= req.params;
    let url=`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${API_KEY}&append_to_response=videos`;
    const tv=await fetchData(url);
    const {tvGenre,movieGenre}=await genre();
    const videos=tv.videos;
    const seasons=tv.seasons;
    res.render('tv',{
        tv, tvGenre, movieGenre,videos,seasons
    });
});


module.exports = route;


