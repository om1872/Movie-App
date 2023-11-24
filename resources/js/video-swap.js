const movie=document.querySelector('.object');
var selected=document.querySelector('.selected');

const videos=document.querySelectorAll('.youtube-li');


function loadvideo(){
    selected.classList.remove('selected');
    this.classList.add('selected');
    selected=this;
    const url=this.dataset.url;

    const html=`<iframe src="${url}" style="width:100%; height:100%;" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>`;
    movie.innerHTML=html;
}

videos.forEach(video=>video.addEventListener('click',loadvideo));