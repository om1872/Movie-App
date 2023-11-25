const dropdown=document.querySelector('.navbar-item .dropdown-genre');
const genre=document.querySelector('.navbar-item .genre-link');
const ham=document.querySelector('.hamburger');
const div=document.querySelector('#ham');
const mobSearchIcon=document.querySelector('#mobile-search-icon');
const search=document.querySelector('#mobile-search');
const mobgenre=document.querySelector('#ham .genre-link');
const mobdropdown=document.querySelector('#ham .dropdown-genre');

function show(){
    console.log('in show')
    genre.classList.add('trigger-enter');
    dropdown.classList.add('open');
    
}

let genClick=false;

function showmob(){
    if(!genClick){
    mobgenre.classList.add('trigger-enter');
    mobdropdown.classList.add('open');
    document.querySelector('#gen-mobile').classList.add('fa-rotate-270');
    }
    else{
    mobgenre.classList.remove('trigger-enter');
    mobdropdown.classList.remove('open');
    document.querySelector('#gen-mobile').classList.remove('fa-rotate-270');
    }
    
    genClick=!genClick;
}

function hide(){
    genre.classList.remove('trigger-enter');
    dropdown.classList.remove('open');
}



let isClick=false;
function navbar(){
    if(!isClick)
    div.style.display='flex';
    else{
        div.style.display='none';
    }
    isClick=!isClick;
}

let searchClick=false;
function showSearch(){
    if(!searchClick){
        search.style.display='flex'; 
    }
    else{
        search.style.display='none';
    }
    searchClick=!searchClick;
}

genre.addEventListener('mouseenter',show);
genre.addEventListener('mouseleave',hide);
mobgenre.addEventListener('click',showmob);
ham.addEventListener('click',navbar);
if(mobSearchIcon!=null)
mobSearchIcon.addEventListener('click',showSearch);