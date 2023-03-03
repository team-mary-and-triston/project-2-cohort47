const app = {}

app.apiKey = "352855b1ece3130738315189ae8c3079";
app.url = "https://api.themoviedb.org/3/genre/movie/list";

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
            app.displayMovies(jsonResult)
        });