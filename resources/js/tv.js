const seasonSelect=document.querySelector('#season-select');
const videoList=document.querySelector('.video-list');
const tvId=JSON.parse(document.querySelector('#tv-id').textContent);
const season=JSON.parse(document.querySelector('#all-seasons').textContent)

function list(){
    let html="";
    season.forEach(season => {
        if(season.season_number===parseInt(seasonSelect.value)){
            for(let i=0;i<season.episode_count;i++){
                html+=`<div class="youtube-li" data-site="vidsrc" onclick="loadvideoP(this)" data-url="https://vidsrc.to/embed/tv/${tvId}/${season.season_number}/${i+1}">Episode ${i+1}</div>`;
            }
            return false;
        }
    });
    videoList.innerHTML=html;
}

seasonSelect.addEventListener('change',list);