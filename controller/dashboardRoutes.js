const { Router } = require('express');

const route = Router();

const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";


route.get('/dashboard',async (req,res)=>{
    let popular=[];
    let topRated=[];
    let tv=[];
    let url=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    await fetch(url).then(res=> res.json())
    .then(json => {
        json.results.forEach(result=>{
            popular.push({
                id:`${result.id}`,
                title:`${result.original_title}`,
                src:`http://image.tmdb.org/t/p/w500${result.poster_path}`
            });
        })
    }).catch(err => {
        console.log('Error:'+err);
    });

    url=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
    await fetch(url).then(res=> res.json())
    .then(json => {
        json.results.forEach(result=>{
            topRated.push({
                id:`${result.id}`,
                title:`${result.original_title}`,
                src:`http://image.tmdb.org/t/p/w500${result.poster_path}`
            });
        })
    }).catch(err => {
        console.log('Error: '+err);
    });

    url=`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en`;
    await fetch(url).then(res=> res.json())
    .then(json => {
        json.results.forEach(result=>{
            tv.push({
                id:`${result.id}`,
                title:`${result.name}`,
                src:`http://image.tmdb.org/t/p/w500${result.poster_path}`
            });
        })
    }).catch(err => {
        console.log('Error: '+err);
    });

    res.render('dashboard',{
        popular:popular,
        topRated:topRated,
        tvShows:tv
    });
});

route.get('/movie/:id',async (req,res)=>{
    const {id}= req.params;
    let url=`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${API_KEY}&append_to_response=videos`;
    const movie=await fetch(url).then(res=>res.json())
    .then(json=>{
        return json;
    }).catch(err=>{
        console.log('Error: '+err);
    });
    console.log(movie);
    res.render('movie',{
        movie:movie
    });
});

route.get('/tv/:id',async (req,res)=>{
    const {id}= req.params;
    let url=`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${API_KEY}`;
    const tv=await fetch(url).then(res=>res.json())
    .then(json=>{
        return json;
    }).catch(err=>{
        console.log('Error: '+err);
    });
    console.log(tv);
    res.render('tv',{
        tv:tv
    });
});


module.exports = route;


