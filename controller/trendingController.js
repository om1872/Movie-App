const { Router } = require('express');
const genre = require('../utils/genre');
const { fetchData } = require('../utils/helper');

const route = Router();

// const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";
const API_KEY = process.env.API_KEY;
const movieURL=`https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${API_KEY}`;
const tvURL=`https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${API_KEY}`;


route.get('/', async (req, res) => {
    const movie=await fetchData(movieURL);
    const tv=await fetchData(tvURL);
    const {tvGenre,movieGenre} = await genre();
    
    res.render('trending',{
        movie,tv,tvGenre,movieGenre
    });
});

module.exports = route;