const API_KEY = "2c295a3ddb6df8ba0220d8ff90ea21ab";
const movieGenreUrl = `https://api.themoviedb.org/3/genre/movie/list?&api_key=${API_KEY}`;
const tvGenreUrl = `https://api.themoviedb.org/3/genre/tv/list?&api_key=${API_KEY}`;
const TvGenreDB = require('../database/TvGenre');
const MovieGenreDB = require('../database/MovieGenre');


let movieGenre = {}, tvGenre = {};
async function load() {
    try {
        const movie = await fetch(movieGenreUrl)
            .then(res => { return res.json() });
        movie.genres.forEach(async (genre) => {
            try {
                await MovieGenreDB.create({ id: genre.id, name: genre.name });
            } catch (err) {
                return;
            }
        });
        const tv = await fetch(tvGenreUrl).then(res => { return res.json() });
        tv.genres.forEach(async (genre) => {
            try {
                await TvGenreDB.create({ id: genre.id, name: genre.name });
            } catch (err) {
                return;
            }
        })
    } catch (err) {
        console.log('Error: ' + err);
        return;
    }
}

//fetching movie genres
async function gen() {
    tvGenre.genres = await TvGenreDB.find();
    movieGenre.genres = await MovieGenreDB.find();
    return { tvGenre, movieGenre };
}
load();
module.exports = gen;