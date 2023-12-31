const movie=document.querySelector('.object');
var selected=document.querySelector('.selected');

const videos=document.querySelectorAll('.youtube-li');


function loadvideo(){
    selected.classList.remove('selected');
    this.classList.add('selected');
    selected=this;
    const url=this.dataset.url;
    const site=this.dataset.site;
    let html;
    if(site==='local'){
        html=`<video src="${url}" data-setup='{}' style="width:100% !important; height:inherit; background:black;" id="my-video"
        class="video-js"
        controls
        preload="auto" muted></video>`
    }else
        html=`<iframe src="${url}" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>`;
    movie.innerHTML=html;
    videojs(document.querySelector('.video-js'));
}

function loadvideoP(param){
    selected.classList.remove('selected');
    param.classList.add('selected');
    selected=param;
    const url=param.dataset.url;
    const html=`<iframe src="${url}" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>`;
    movie.innerHTML=html;
}

videos.forEach(video=>video.addEventListener('click',loadvideo));