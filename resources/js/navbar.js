const dropdown = document.querySelector('.navbar-item .dropdown-genre');
const genre = document.querySelector('.navbar-item .genre-link');
const ham = document.querySelector('.hamburger');
const div = document.querySelector('#ham');
const mobSearchIcon = document.querySelector('#mobile-search-icon');
const search = document.querySelector('#mobile-search');
const mobgenre = document.querySelector('#ham .genre-link');

const mobdropdown = document.querySelector('#ham .dropdown-genre');
const navDropdown = document.querySelector('.dropdown');
const navDropdownBtn = document.querySelector('.dropdown .btn');
const navDropContent = document.querySelector('.dropdown-content');

const login = document.querySelector('#login');
const close = document.querySelector('#close');
const signup = document.querySelector('#signup');
const closeSignup = document.querySelector('#close-signup');

const navMob = document.querySelector('.login-btn-mob');
const closeNavMob = document.querySelector('#close-navbar-mob');
const mobLogin = document.querySelector('#mob-login');
const mobSignup = document.querySelector('#mob-signup');


function show() {
    console.log('in show')
    genre.classList.add('trigger-enter');
    dropdown.classList.add('open');

}

let genClick = false;

function showmob() {
    if (!genClick) {
        mobgenre.classList.add('trigger-enter');
        mobdropdown.classList.add('open');
        document.querySelector('#gen-mobile').classList.add('fa-rotate-270');
    }
    else {
        mobgenre.classList.remove('trigger-enter');
        mobdropdown.classList.remove('open');
        document.querySelector('#gen-mobile').classList.remove('fa-rotate-270');
    }

    genClick = !genClick;
}

function hide() {
    genre.classList.remove('trigger-enter');
    dropdown.classList.remove('open');
}



let isClick = false;
function navbar() {
    if (!isClick)
        div.style.display = 'flex';
    else {
        div.style.display = 'none';
    }
    isClick = !isClick;
}

let searchClick = false;
function showSearch() {
    if (!searchClick) {
        search.style.display = 'flex';
    }
    else {
        search.style.display = 'none';
    }
    searchClick = !searchClick;
}


function dropdownOn() {
    navDropContent.classList.add('active');
}
function dropdownOf() {
    navDropContent.classList.remove('active');
}

function showLogin() {
    // if (document.querySelector('.shadow').classList.contains('show'))
    //     document.querySelector('.shadow').classList.remove('show');
    document.querySelector('.login-form').classList.add('show');
    document.querySelector('.shadow').classList.add('show');
}
function offLogin() {
    document.querySelector('.login-form').classList.remove('show');
    document.querySelector('.shadow').classList.remove('show');
}

function showSignup() {
    // if (document.querySelector('.shadow').classList.contains('show'))
    //     document.querySelector('.shadow').classList.remove('show');
    document.querySelector('.signup-form').classList.add('show');
    document.querySelector('.shadow').classList.add('show');
}
function offSignup() {
    document.querySelector('.signup-form').classList.remove('show');
    document.querySelector('.shadow').classList.remove('show');
}
function openMobileNavbarOptions() {
    document.querySelector('.navbar-mob-options').classList.add('show');
    document.querySelector('.shadow').classList.add('show');
}
function closeMobileNavbarOptions() {
    document.querySelector('.navbar-mob-options').classList.remove('show');
    document.querySelector('.shadow').classList.remove('show');
}

genre.addEventListener('mouseenter', show);
genre.addEventListener('mouseleave', hide);
mobgenre.addEventListener('click', showmob);
ham.addEventListener('click', navbar);

if (mobSearchIcon != null)
    mobSearchIcon.addEventListener('click', showSearch);
if (login != null || login != undefined)
    login.addEventListener('click', showLogin);
if (close != null || close != undefined)
    close.addEventListener('click', offLogin);
if (navDropdown != null || navDropdown != undefined) {
    navDropdown.addEventListener('mouseenter', dropdownOn);
    navDropdown.addEventListener('mouseleave', dropdownOf);
}
if (signup != null || signup != undefined) {
    signup.addEventListener('click', showSignup);
}
if (closeSignup != null || closeSignup != undefined)
    closeSignup.addEventListener('click', offSignup);

if (navMob != null || navMob != undefined)
    navMob.addEventListener('click', openMobileNavbarOptions);

if (closeNavMob != null || closeNavMob != undefined)
    closeNavMob.addEventListener('click', closeMobileNavbarOptions);

if (mobLogin != null || mobLogin != undefined)
    mobLogin.addEventListener('click', showLogin);

if (mobSignup != null || mobSignup != undefined)
    mobSignup.addEventListener('click', showSignup);

