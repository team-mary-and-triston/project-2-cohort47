const app = {}

app.apiKey = "352855b1ece3130738315189ae8c3079";
app.url = "https://api.themoviedb.org/3/discover/movie";

const url = new URL(app.url)
url.search = new URLSearchParams({
    api_key:app.apiKey,
    language: 'en-US', 
    sort_by: "popularity.desc",
    year: 2022, 
    with_genres: "10749", "36", "28", "80",     
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

// // Define a Method to display the Movies
// app.displayMovies = (arrayOfFilms) => {
// // Query the Document and Find the First Ul
//     const ul = document.querySelector('ul')
//     // Iterate through the API Data 
//     arrayOfFilms.filter((data) => {
//     // Create list Elements 
//     const listElement = document.createElement('li')
//     // Create Image Element for Poster
//     const imageElement = document.createElement('img')
//     // Add Src and Alt Attributes 
        
    
//      })
// }