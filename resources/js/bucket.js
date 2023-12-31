const addToBucket = document.querySelectorAll('.bucket-add');
const shadow = document.querySelector('.shadow');
const user = JSON.parse(document.querySelector('#userId').textContent);
const bucket = document.querySelector('.bucket-list');
const bucketBody = document.querySelector('.bucket-list .list-body');
const closeBucket = document.querySelector('#close-list');
const createBucket = document.forms['createBucket'];
const deletePrompt= document.querySelector('.delete-prompt');

let selectedId = "",movieName="",moviePoster="",type="";

function genHTML(data) {
    return data.map(bucket => {
        return `<div class="list-body-item" data-id='${bucket._id}'><div>${bucket.bucketName}</div><div>Items: ${bucket.itemCount}</div>
        <input type="checkbox" name="bucket" value="${bucket._id}"></div><div class="error" id="${bucket._id}"></div>`
    }).join('');
}

async function loadBukcets() {
    if (user) {
        try {
            const URL = `/api/bucket/getBucketByUser`
            const data = await fetch(URL).then(res => { return res.json() });
            if (data.error === 0) {
                const bodyList = genHTML(data.data);
                let html = `<div class="bucket-head">Select Bucket's</div>`
                html += bodyList;
                html += `<div class="error"></div><p style="text-align:center;"><button type="submit" class="btn-rev">Add</button></p>`;
                bucketBody.innerHTML = `<form onsubmit="event.preventDefault();addInBuckets(this)" action="#" name="bucketList">${html}</form>`;
            } else {
                bucketBody.innerHTML = `${data["error_obj"]}`;
            }
        } catch (err) {
            console.log('Error: ' + error);
        }
    }
}

function checkAdd() {
    shadow.classList.add('show');
    bucket.classList.add('show');
    if (user != "" && user != null && user != undefined) {
        selectedId = this.id;
        movieName=this.dataset.name;
        moviePoster=this.dataset.poster;
        type=this.dataset.type;
    } else {
        bucketBody.innerHTML = `<p style="margin:auto 10%;">Please Login or Sign Up to use this feature</p>`
    }
}

function addInBuckets(form) {
    // console.log(form);
    if (selectedId === "") {
        //error
        return;
    } else {
        const URL = `/api/bucket/addItem`;
        const formData = new FormData(form);
        formData.getAll('bucket').forEach(async (bucketId) => {
            document.getElementById(`${bucketId}`).innerHTML = '';
            try {
                const response = await fetch(URL, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'bucketId': bucketId, 'tmdbId': selectedId  , 'movieName': movieName,'moviePoster':moviePoster, 'type':type})
                });
                const data = await response.json();
                if (data.error == 0) {
                    document.getElementById(`${bucketId}`).innerHTML = `Item added`;
                } else {
                    document.getElementById(`${bucketId}`).innerHTML = data['error_obj'].bucketName;
                }
            } catch (err) {
                console.log('Error: ' + err);
                document.getElementById(`${bucketId}`).innerHTML = `err`;
            }
        });
        setTimeout(() => { loadBukcets() }, 1000);
    }
}

function closeList() {
    shadow.classList.remove('show');
    bucket.classList.remove('show');
}

async function createBucketFn(e) {
    e.preventDefault();
    const URL = '/api/bucket/createBucket';

    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'bucketName': this.bucketName.value })
    });
    const data = await response.json();
    console.log(data);
    if (data.error == 0) {
        loadBukcets();
    }else{
        document.querySelector('.err.createBucket').innerHTML=JSON.stringify(data['error_obj'].bucketName);
    }
}


loadBukcets();
addToBucket.forEach(add => add.addEventListener('click', checkAdd));
closeBucket.addEventListener('click', closeList);
createBucket.addEventListener('submit', createBucketFn);