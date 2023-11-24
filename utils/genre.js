const API_KEY = "REDACTED_TMDB_KEY";
const movieGenreUrl= `https://api.themoviedb.org/3/genre/movie/list?&api_key=${API_KEY}`;
const tvGenreUrl=`https://api.themoviedb.org/3/genre/tv/list?&api_key=${API_KEY}`;


let movieGenre,tvGenre;

//fetching movie genres
async function gen(){
movieGenre = await fetch(movieGenreUrl).then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => console.log('Error' + err));
    //fetching tv genres
tvGenre= await fetch(tvGenreUrl).then(res=>res.json())
    .then(json =>{
        return json;
    }).catch(err => console.log('Error' + err));
    return {movieGenre,tvGenre};
}

module.exports=gen;