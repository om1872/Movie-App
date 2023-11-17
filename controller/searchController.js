const { Router } = require('express');

const route = Router();

const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";

route.get('/', async (req, res) => {
    const { query } = req.query;

    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&include_video=false&include_media_type=true&page=1&api_key=${API_KEY}`;
    const movieGenreUrl= `https://api.themoviedb.org/3/genre/movie/list?&api_key=${API_KEY}`;
    const tvGenreUrl=`https://api.themoviedb.org/3/genre/tv/list?&api_key=${API_KEY}`;

    //fetching query results
    const result = await fetch(url).then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => console.log('Error' + err));
    
    //fetching movie genres
    const movieGenre = await fetch(movieGenreUrl).then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => console.log('Error' + err));
    //fetching tv genres
    const tvGenre= await fetch(tvGenreUrl).then(res=>res.json())
    .then(json =>{
        return json;
    }).catch(err => console.log('Error' + err));

    //seding response as a view
    res.render('search', {
        results: result,
        query: query,
        movieGenre:movieGenre,
        tvGenre:tvGenre,
    })
})

route.post('/page',async(req,res)=>{
    const {query,page}=req.body;
    console.log(query,page);
    const url= `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&include_video=false&include_media_type=true&page=${page}&api_key=${API_KEY}`;
    const result=await fetch(url).then(res=>res.json())
    .then(json => {
        return json;
    }).catch(err => console.log('Error: '+console.error(err)));
    console.log(result);
    res.send(result);
})

route.get('/filter', (req, res) => {

})

module.exports = route;