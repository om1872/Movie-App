const { Router } = require('express');

const route = Router();

const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";

route.get('/', async (req, res) => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    let data = [];
    await fetch(url)
        .then(res => res.json())
        .then(json => {
            json.results.forEach((result) => {
                data.push({ title: `${result.original_title}`, src: `http://image.tmdb.org/t/p/w500${result.poster_path}` });
            });
        })
        .catch(err => console.error('error:' + err));
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc`;

    await fetch(url)
        .then(res => res.json())
        .then(json => {
            json.results.forEach((result) => {
                data.push({ title: `${result.original_title}`, src: `http://image.tmdb.org/t/p/w500${result.poster_path}` });
            });
        })
        .catch(err => console.error('error:' + err));
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=3&sort_by=popularity.desc`;

    await fetch(url)
        .then(res => res.json())
        .then(json => {
            json.results.forEach((result) => {
                data.push({ title: `${result.original_title}`, src: `http://image.tmdb.org/t/p/w500${result.poster_path}` });
            });
        })
        .catch(err => console.error('error:' + err));
    res.render('index', {
        images: data,
    });
});




module.exports = route;