const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
]

const app = {}

app.apiKey = "352855b1ece3130738315189ae8c3079";
app.url = 'https://api.themoviedb.org/3/discover/movie';
// app.url = "https://api.themoviedb.org/3/genre/movie/list";

const url = new URL(app.url)
url.search = new URLSearchParams({
    api_key:app.apiKey,
    language: 'en-US', 
    sort_by: "popularity.desc",
    year: 2022, 
    with_genres: "10751",
    page: 1,

})
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonResult){
            console.log(jsonResult)
            //Pass our JSON Results to our displayMovies function.
            // app.displayMovies(jsonResult)
        });


