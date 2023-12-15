const { Router } = require('express');
const genre = require('../utils/genre');
const { fetchData } = require('../utils/helper');

const route = Router();

const API_KEY = process.env.API_KEY;
const discoverTv = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;
const discoverMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const poster = `http://image.tmdb.org/t/p/w500`;

route.get('/movie/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.query;
    const url = `${discoverMovie}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`;
    const data = await fetchData(url);
    const { tvGenre, movieGenre } = await genre();
    res.render('movie-main', { results: data, tvGenre, movieGenre, genre: { id, name } });
});

route.get('/tv/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.query;
    const url = `${discoverTv}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`;
    const data = await fetchData(url);
    const { tvGenre, movieGenre } = await genre();
    res.render('tv-main', { results: data, tvGenre, movieGenre, genre: { id, name } });
});


route.get('/tv/:id/:page', async (req, res) => {
    const { id, page } = req.params;
    const { name } = req.query;
    const url = `${discoverTv}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id}`;
    const data = await fetchData(url);
    const { tvGenre, movieGenre } = await genre();
    res.render('tv-main', { results: data, tvGenre, movieGenre, genre: { id, name } });
});

route.get('/movie/:id/:page', async (req, res) => {
    const { id, page } = req.params;
    const { name } = req.query;
   
    const url = `${discoverMovie}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id}`;
    const data = await fetchData(url);
    const { tvGenre, movieGenre } = await genre();
    res.render('movie-main', { results: data, tvGenre, movieGenre, genre: { id, name } });
});

module.exports = route;