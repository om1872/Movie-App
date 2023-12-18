const searchM = document.querySelector('.search-upload');
const searchResult = document.querySelector('.search-row');

function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function validateForm(fileName) {
    const last = fileName.lastIndexOf('.');
    if (fileName.slice(last) === '.mp4' || fileName.slice(last) === '.mkv')
        return true;
    else
        return false;
}

async function uploadVid(ele, tmdbId) {
    const form = document.forms['movie-upload'];
    const statusDiv = document.querySelector('.status');

    statusDiv.style.display = 'flex';
    const url = `/api/upload/movie/${tmdbId}`;
    const data = new FormData(form);
    data.set('size', data.get('video').size);
    const fileName = data.get('video').name;
    if (validateForm(fileName)) {
        ele.disabled = true;
        form['reset'].disabled = true;
        ele.classList.add('disabled');
        form['reset'].classList.add('disabled');
        statusDiv.textContent = `Uploading`;
        const response = await fetch(url, {
            method: "POST",
            credentials: 'same-origin',
            body: data,
        }).then(async (res) => { return await res.json(); })
            .then(data => {
                ele.disabled = false;
                form['reset'].disabled = false;
                ele.classList.remove('disabled');
                form['reset'].classList.remove('disabled');
                form.innerHTML = `File Uploaded Succesfully`;
                return data;
            }).catch(err => {
                console.log('Error: ' + err);
                ele.disabled = false;
                form['reset'].disabled = false;
                ele.classList.remove('disabled');
                form['reset'].classList.remove('disabled');
                statusDiv.innerHTML = `Error in uploading, plz check id once!`;
            });
        if(response.err===0){
            const data={
                dataset:{
                    id:cid,
                    name:cname,
                    poster:cposter,
                    release:crelease
                }
            }
            displayManageSection(data);
        }
    } else {
        statusDiv.innerHTML = `File is not of type mp4 or mkv...`;
        return;
    }
}

function removeStatus() {
    const statusDiv = document.querySelector('.status');
    statusDiv.innerHTML = ``;
}

function genHTML(data) {
    let row = '';
    if (data.success === false) {
        return '<span>Requested Movie Not Found</span>';
    }
    if (data.results) {
        row = data.results.map((movie, index) => {
            return `<tr data-id='${movie.id}'>
        <td>${index + 1}</td>
        <td><a class='link' data-id='${movie.id}' data-name='${movie.title}' data-poster='${movie.poster_path}' data-release='${movie.release_date}' onclick='displayManageSection(this)'>${movie.id}</a></td>
        <td><a class='link' data-id='${movie.id}' data-name='${movie.title}' data-poster='${movie.poster_path}' data-release='${movie.release_date}' onclick='displayManageSection(this)'>${movie.title}</a></td>
        <td>${movie.release_date}</td>
        <td><button class='btn-rev' data-id='${movie.id}' data-name='${movie.title}' data-poster='${movie.poster_path}' data-release='${movie.release_date}' onclick='displayManageSection(this)'>Manage</button></td>
      </tr>`
        }).join('');
    } else {
        row = `<tr data-id='${data.id}'>
        <td>${1}</td>
        <td><a class='link' data-id='${data.id}' data-name='${data.title}' data-poster='${data.poster_path}' data-release='${data.release_date}' onclick='displayManageSection(this)'>${data.id}</a></td>
        <td><a class='link' data-id='${data.id}' data-name='${data.title}'  data-poster='${data.poster_path}' data-release='${data.release_date}' onclick='displayManageSection(this)'>${data.title}</a></td>
        <td>${data.release_date}</td>
        <td><button class='btn-rev' data-id='${data.id} data-name='${data.title}'  data-poster='${data.poster_path}' data-release='${data.release_date}' onclick='displayManageSection(this)'>Manage</button></td>
      </tr>`
    }
    return `<table class='display' style="flex:1;min-width:100%;" id='myTable'>
    <thead>
      <tr>
        <th>S.no</th>
        <th>ID</th>
        <th>Title</th>
        <th>Release Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>${row}</tbody>
  </table>`

}

async function getSearchResult(e) {
    e.preventDefault();
    const query = document.forms['search-form']['query'].value;
    const URL = `/api/upload/getSearchResult/${query}`;
    const response = await fetch(URL, {
        method: 'POST',
        credentials: "same-origin"
    }).then(res => { return res.json() })
        .then(data => {
            const html = genHTML(data);
            searchResult.innerHTML = html;
            let table = new DataTable('#myTable');
        }).catch(err => {
            console.log('Error: ' + err);
            searchResult.innerHTML = `Error occured :(`;
        });

}
let cid,cname,cposter,crelease;
async function displayManageSection(data) {
    const { id, name, poster, release } = data.dataset;
    cid=id;
    cname=name;
    cposter=poster;
    crelease=release;
    const url = `/api/upload/checkMovieAvailability/${id}`;
    const fileInfo = await fetch(url)
        .then(res => { return res.json() })
        .catch(err => { console.log('Error: ' + err) });
    let info = '';
    if (fileInfo.status === 0) {
        info = fileStatusZero(id);
    } else if (fileInfo.status === 1) {
        info = fileStatusOne(fileInfo, id);
    } else {
        info = `<span><strong> Failed to fetch file details, Plz Contact :( </strong></span>`;
    }
    searchResult.innerHTML = `<div class="movie">
             <div class="poster-div">
                <img src="http://image.tmdb.org/t/p/w300${poster}" alt="${name}" class="poster" />
            </div>
            <div class="col">
                <span><small>ID: <i>${id}</i></small></span>
                <h2 class="movie-title">
                    ${name}
                </h2>
                <span><strong>Released On: </strong>${release}</span>${info}
            </div>
</div>`;
}


/* */
searchM.addEventListener('submit', getSearchResult);



function fileStatusOne(fileInfo, id) {
    return `<div class='file-status'>
        <h3>Database Status</h3>
        <table style="width:100%; table-layout:fixed">
        <tr>
          <th style="width:25%;">Status:</th>
          <td class='text-overflow-hidden'> Available</td>
        </tr>
        <tr>
          <th style="width:25%;">Name:</th>
          <td class='text-overflow-hidden'>${fileInfo.fileInfo.filename}</td>
        </tr>
        <tr>
          <th style="width:25%;">Size:</th>
          <td class='text-overflow-hidden'> ${formatBytes(fileInfo.fileInfo.length)}</td>
        </tr>
        <tr>
          <th style="width:25%;">Uploaded On:</th>
          <td class='text-overflow-hidden'> ${new Date(fileInfo.fileInfo.uploadDate).toISOString().split('T')[0]}</td>
        </tr>
        <tr>
          <th style="width:25%;">Type:</th>
          <td class='text-overflow-hidden'> ${fileInfo.fileInfo.metadata.mimeType}</td>
        </tr>
        <tr>
          <th style="width:25%;">Encoding:</th>
          <td class='text-overflow-hidden'> ${fileInfo.fileInfo.metadata.encoding}</td>
        </tr>
        <tr>
          <td style="text-align:center;"><br><a class='btn-rev' href='/api/movie/${id}'>Visit Movie</a></td>
          <td><br><a class='btn-rev' onclick="openDeletePrompt(this);">Delete Movie</a></td>
        </tr>
      </table>
      </div>`;
}

function fileStatusZero(id) {
    return `<div class='file-status'>
        <span><strong>File Status: </strong>No File Present at moment on server :(</span> 
        <form class="upload-form" enctype="multipart/form-data" name="movie-upload" id="movie-upload" onsubmit="event.preventDefault()">
        <h5>Upload Here <i class="fa-solid fa-arrow-right"></i></h5>
        <div style='margin:0 0 0 3%; flex:1;'>
        <div class=form-item>
            <input type="file" name="video" accept=".mp4,.mkv" required />
            <input type="text" name="size" hidden/>
            <button class="btn-rev" type="submit" onclick="uploadVid(this,${id})"  id="upload">Upload</button>
            <button class="btn-rev" type="reset" onclick="removeStatus();" id="reset" >Reset</button>
        </div>
        <div class="status form-item" style='display:flex;'></div>
        </div>
        <div class="form-item" style='display:flex;'><a class='item' href='/api/movie/${id}'>Visit Movie</a></div>
        </div>
    </form></div>`
}