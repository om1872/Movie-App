const dropdown=document.querySelector('.dropdown');
const genre=document.querySelector('.genre-link');

function show(){
    console.log('in show')
    genre.classList.add('trigger-enter');
    dropdown.classList.add('open');
}

function hide(){
    genre.classList.remove('trigger-enter');
}

genre.addEventListener('mouseenter',show);
genre.addEventListener('mouseleave',hide);