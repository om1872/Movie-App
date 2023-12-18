const cancelPrompt=document.querySelector('#close-prompt');
const deletePrompt=document.querySelector('.delete-prompt');

function genHTML(data) {
    if (data.error === 0) {
        return data.obj.data.map(result => {
            return `<div class="movie"><a href="/api/${result.type === 'movie' ? 'movie' : 'tv'}/${result.tmdbId}">${result.moviePoster ? `<img src="${result.moviePoster}" alt="" />` : `<img src="/img/pos_thumbnail.png" alt="${result.movieName}" />`}</a>
        <a href="/api/${result.type === 'movie' ? 'movie' : 'tv'}/${result.tmdbId}" class="movie-title">${result.movieName}</a><a class="bucket-add bucket-delete-prompt" data-itemId="${result._id}" data-bucketId="${result.bucketId}" onclick="openDeletePrompt(this);"> <i class="fa-solid fa-circle-minus" style="color: #ea462a;"></i></a>
        </div>`;
        }).join('');
    }
}

function openDeletePrompt(ele){
    const bucketId = ele.dataset.bucketid;
    const itemId = ele.dataset.itemid;
    deletePrompt.classList.add('show');
    const deleteButton=deletePrompt.querySelector('#delete-item-btn');
    deleteButton.dataset.bucketId=bucketId;
    deleteButton.dataset.itemId=itemId;
    shadow.classList.add('show');
}

function closeDeletePrompt(){
    deletePrompt.classList.remove('show');
    shadow.classList.remove('show');
}

async function removeItemFromBucket(ele) {
    const {bucketId,itemId}=ele.dataset;
    const URL = `/api/bucket/removeItem`;
    const data = { bucketId, itemId };
    try {
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if (res.error === 0) {
            console.log(res.msg);
            location.reload();
        } else {
            console.log(res['error-obj']);
        }
    } catch (err) {
        console.log(err.message);
    }
}

window.onload = function loadBucket() {
    const buckets = document.querySelectorAll('.bucket');
    buckets.forEach(async (bucket) => {
        const bucketId = bucket.id;
        const URL = `/api/bucket/getBucketById?bucketId=${bucketId}`;
        const res = await fetch(URL);
        const data = await res.json();
        const bucketBody = bucket.querySelector('.bucket-body');
        bucketBody.innerHTML = genHTML(data);
    });
}

cancelPrompt.addEventListener('click',closeDeletePrompt);
