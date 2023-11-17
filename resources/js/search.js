const category=document.querySelector('#category');
const genre=document.querySelector('#genre');
const tv=JSON.parse(document.querySelector('#tv-genre').textContent);
const movie=JSON.parse(document.querySelector('#movie-genre').textContent);



function movieGenre(){
    console.log(movie)
    return movie.genres.map(genre => {
        return `<option value="${genre.name}" id="${genre.id}">${genre.name}</option>`
    }).join('');
}
function tvGenre(){
    console.log(tv);
    return tv.genres.map(genre => {
        return `<option value="${genre.name}" id="${genre.id}">${genre.name}</option>`
    }).join('');
}

function generate(){
    if(this.value==='movie'){
        var html=movieGenre();
        genre.innerHTML='<option value="">Select</option>'+html;
    }else if(this.value === 'tv'){
        var html=tvGenre();
        genre.innerHTML=`<option value="">Select</option>`+html;
    }else{
        genre.innerHTML=`<option value="">Select</option>`
    }
}

category.addEventListener('change',generate);