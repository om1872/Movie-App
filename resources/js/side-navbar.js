var selected = document.querySelector('.option.selected');
const options = document.querySelectorAll('.option');
const movie=document.querySelector('#trending-movie');
const tv=document.querySelector('#trending-tv');
const right=document.querySelector('.side-item .right');
const left=document.querySelector('.side-item .left');
const sideNav=document.querySelector('.side-nav');
const sideFull=document.querySelectorAll('.side-full');

var curr = 'movie';
var last=movie;

function changeTrending() {
    if (this.dataset.key === curr)
        return;

    selected.classList.remove('selected');
    this.classList.add('selected');
    selected = this;
    curr=this.dataset.key;

    if(this.dataset.key==='movie'){
        last.classList.add('hidden');
        movie.classList.remove('hidden');
        last=movie;
    }else if(this.dataset.key==='tv'){
        // console.log(last,tv);
        last.classList.add('hidden');
        tv.classList.remove('hidden');
        last=tv;
    }
}

function openSide(){
    right.style.display='none';
    left.style.display='block';
    sideFull.forEach(side=> side.style.display='flex');
    movie.style.marginLeft='10vw';
    tv.style.marginLeft='10vw';
}

function closeSide(){
    left.style.display='none';
    right.style.display='block';
    sideFull.forEach(side=> side.style.display='none');
    movie.style.marginLeft='7vw';
    tv.style.marginLeft='7vw';
}

options.forEach(option => option.addEventListener('click', changeTrending));
left.addEventListener('click',closeSide);
right.addEventListener('click',openSide);