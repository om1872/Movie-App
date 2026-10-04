# Movie App

A movie catalog built with Node.js, Express, MongoDB, and EJS. It loads movie and TV information from The Movie Database (TMDB), and it can store and stream video files with GridFS.

## Features

- Log in and register with JWT authentication
- Search movies and TV shows through the TMDB API
- View movie and TV details
- Upload a video for a movie, store it in MongoDB, and stream it back
- Delete a movie from the database
- Save favorites into named buckets, then add, manage, and remove those buckets

## Tech stack

Node.js, Express, MongoDB, HTML, CSS, JavaScript, EJS

## Run it

1. Clone the repository and open it in an editor.
2. Install [Node.js](https://nodejs.org/) and MongoDB.
3. Install dependencies and start the app:

```bash
npm install
npm start
```

4. Open [http://localhost:3000](http://localhost:3000).

`npm start` loads a `.env` file. Create one in the project root with the variables below. Do not commit that file.

| Variable | Required | Purpose |
| --- | --- | --- |
| `API_KEY` | Yes | TMDB API key |
| `JWT_SECRET` | Yes | Secret used to sign login tokens. The app exits if this is missing. |
| `EMAIL` | For admin seed | Admin email. The admin user is created only when both `EMAIL` and `PASSWORD` are set. |
| `PASSWORD` | For admin seed | Admin password. |
| `NAME` | No | Admin display name. Defaults to `Admin`. |
| `PORT` | No | Defaults to `3000`. |
| `MONGO_URI` | No | Defaults to a local database at `mongodb://0.0.0.0:27017/movieDB`. Set this to use MongoDB Atlas. |

## Screenshots

<p>
  <strong>Home</strong><br>
  <img src="https://github.com/om1872/Movie-App/assets/109571034/437f24a5-2f38-4cd8-944b-8ab07c570468" alt="Home page" width="720">
</p>

<table>
  <tr>
    <td>
      <strong>Home, mobile</strong><br>
      <img src="https://github.com/om1872/Movie-App/assets/109571034/a3abfef7-da34-464e-bd71-9eff9b09d96d" alt="Home page on a phone" width="280">
    </td>
    <td>
      <strong>Dashboard, mobile</strong><br>
      <img src="https://github.com/om1872/Movie-App/assets/109571034/e480e0a9-351c-45d4-a6fd-6e76702aaab3" alt="Dashboard on a phone" width="280">
    </td>
  </tr>
</table>

<p>
  <strong>Dashboard</strong><br>
  <img src="https://github.com/om1872/Movie-App/assets/109571034/de14fd78-2fa0-4957-9d7a-d67cb0262bbd" alt="Dashboard" width="720">
</p>

<p>
  <strong>Login</strong><br>
  <img src="https://github.com/om1872/Movie-App/assets/109571034/75c0088a-1d40-46b0-9109-4403139b6d33" alt="Login prompt" width="720">
</p>

<p>
  <strong>Manage movies</strong><br>
  <img src="https://github.com/om1872/Movie-App/assets/109571034/31be60d4-dee3-402b-8762-c72a8adbf3c0" alt="Manage movies page" width="720">
</p>

<p>
  <img src="https://github.com/om1872/Movie-App/assets/109571034/625f2be5-1693-45f1-9e95-96797840b221" alt="Manage movies, second view" width="720">
</p>

<p>
  <strong>After a successful upload</strong><br>
  <img src="https://github.com/om1872/Movie-App/assets/109571034/c4328c19-f609-4493-b09f-99977af3d3b5" alt="Successful upload" width="720">
</p>

<p>
  <strong>Movie page</strong><br>
  <img src="https://github.com/om1872/Movie-App/assets/109571034/43be4794-9807-42b0-ba03-65bf529d73d6" alt="Movie page" width="720">
</p>

<p>
  <strong>Movie page, mobile</strong><br>
  <img src="https://github.com/om1872/Movie-App/assets/109571034/3b640fd2-6274-491c-9e16-e40e83ff8bc7" alt="Movie page on a phone" width="280">
</p>
