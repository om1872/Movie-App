const { Router } = require('express');
const genre = require('../utils/genre');
const { fetchData } = require('../utils/helper');

const route = Router();

const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";
let multiSearch = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`;
let movieSearch = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
let tvSearch = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}`;

//base search route
route.get('/', async (req, res) => {
    const { query } = req.query;

    const url = `${multiSearch}&query=${query}&include_adult=false&include_video=false&include_media_type=true`;

    //fetching query results
    const result = await fetchData(url);
    const {tvGenre,movieGenre}=await genre();

    //seding response as a view
    res.render('search', {
        results: result,
        query: query,
        movieGenre,
        tvGenre,
        search_type: 'multi',
        filter: { 
            sort: 'popularity.desc',
            language:'xx',
            adult:'false'
        }
    })
})

route.post('/page', async (req, res) => {
    let { page, search_type, filter ,query} = req.body;
    let url;
    if (search_type === 'multi') {
        url = `${multiSearch}&query=${query}&page=${page}&sort_by=${filter.sort}`;
    } else if (search_type === 'movie') {
        url = `${movieSearch}&query=${query}&page=${page}&sort_by=${filter.sort}`;
    } else if (search_type === 'tv') {
        url = `${tvSearch}&query=${query}&page=${page}&sort_by=${filter.sort}`;
    }

    if (filter.adult === 'true') {
        url += '&include_adult=true';
    } else {
        url += '&include_adult=false';
    }

    //Language filter xx--no language
    if (filter.language != 'xx') {
        url += `&language=${filter.language}`;
    }

    //fetching next/prev page
    const result = await fetchData(url);

    res.send(result);
})

route.get('/filter', async (req, res) => {
    let filterBy = req.query;
    let results, url;
    if (filterBy.type === '') {
        url = `${multiSearch}&query=${filterBy.query}&sort_by=${filterBy.sort}`;
        //Adult filter
        if (filterBy.adult === 'true') {
            url += '&include_adult=true';
        } else {
            url += '&include_adult=false';
        }

        //Language filter xx--no language
        if (filterBy.language != 'xx') {
            url += `&language=${filterBy.language}`;
        }
        //fetching filtered results
        results = await fetchData(url);
    } else if (filterBy.type === 'movie') {
        url = `${movieSearch}&query=${filterBy.query}&sort_by=${filterBy.sort}`;

        //Adult filter
        if (filterBy.adult === 'true') {
            url += '&include_adult=true';
        } else {
            url += '&include_adult=false';
        }

        //Language filter xx--no language
        if (filterBy.language != 'xx') {
            url += `&language=${filterBy.language}`;
        }
        //fetching filtered results
        results = await fetchData(url);

        results.results.forEach(result => {
            result.media_type = 'movie';
        });
    } else if (filterBy.type === 'tv') {
        url = `${tvSearch}&query=${filterBy.query}&sort_by=${filterBy.sort}`;

        //Adult filter
        if (filterBy.adult === 'true') {
            url += '&include_adult=true';
        } else {
            url += '&include_adult=false';
        }

        //Language filter xx--no language
        if (filterBy.language != 'xx') {
            url += `&language=${filterBy.language}`;
        }

        //fetching filtered results
        results = await fetchData(url);

        results.results.forEach(result => {
            result.media_type = 'tv';
        });
    }

    const {tvGenre,movieGenre}=await genre();

    res.render('search', {
        results: results,
        filter: filterBy,
        query: filterBy.query,
        movieGenre, tvGenre,
        search_type: filterBy.type === '' ? 'multi' : filterBy.type
    });
})


module.exports = route;