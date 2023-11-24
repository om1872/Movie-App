const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
let page = JSON.parse(document.querySelector('#page-num').textContent);
const lastpage = JSON.parse(document.querySelector('#lastpage').textContent);
const query = JSON.parse(document.querySelector('#query').textContent);
const row = document.querySelector('.search-row');
const pageInfo=document.querySelector('.page-info');
const search_type=JSON.parse(document.querySelector('#search-type').textContent);
const filter=JSON.parse(document.querySelector('#filter').textContent);

function genHTML(result) {
    result = result.results.map(res => {
        if (res.media_type != 'person' && res.poster_path != null) {
            return res;
        }
    });
    return result.map(res => {
        if (res === undefined)
            return;
        return `<div class="movie">
        <a href="/api/${search_type==='multi'?res.media_type:search_type}/${res.id}" id="${res.id}"><img src="http://image.tmdb.org/t/p/w300${res.poster_path}" alt="<%= movie.title %>"/></a>
        <a href="/api/${search_type==='multi'?res.media_type:search_type}/${res.id}" id="${res.id}" class="movie-title">${res.search_type==='multi'?res.media_type==='tv' ? res.name : res.title:search_type==='tv' ? res.name : res.title}</a>
        </div>`;
    }).join('');
}

async function getNext() {
    if (page === lastpage) {
        return;
    }
    this.disabled=true;
    this.classList.add('disabled');

    const url = '/api/search/page';
    const data = {
        query: query,
        page: page + 1,
        filter:filter,
        search_type:search_type
    }
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => console.log('Error: ' + err));

    document.querySelector('#page-num').textContent = parseInt(page) + 1;
    page = parseInt(page) + 1;
    
    row.innerHTML = genHTML(result);
    this.disabled=false;
    this.classList.remove('disabled');
    pageInfo.innerHTML = `${page} / ${lastpage}`;
    if(page===parseInt(lastpage)){
        next.classList.add('disabled');
        next.disabled=true;
    }
    if(page>1){
        if(prev.disabled===true){
            prev.disabled=false;
            prev.classList.remove('disabled');
        }
    }
}

async function getPrev() {
    if (page === 1) {
        return;
    }
    this.disabled=true;
    this.classList.add('disabled');
    const url = '/api/search/page';
    const data = {
        query: query,
        page: page - 1,
        filter:filter,
        search_type:search_type
    }
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => console.log('Error: ' + err));
    document.querySelector('#page-num').textContent = parseInt(page) - 1;
    page = parseInt(page) - 1;
    row.innerHTML = genHTML(result);
    this.disabled=false;
    this.classList.remove('disabled');
    pageInfo.innerHTML = `${page} / ${lastpage}`;
    if(page===1){
        prev.classList.add('disabled');
        prev.disabled=true;
    }
    if(page<parseInt(lastpage)){
        if(next.disabled===true){
            next.disabled=false;
            next.classList.remove('disabled');
        }
    }
}

if (next != undefined)
    next.addEventListener('click', getNext);
if (prev != undefined)
    prev.addEventListener('click', getPrev);