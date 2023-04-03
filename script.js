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
// Function with If Statement If User chooses xxx returns earliest date/latest date,
// based on user input we will change cearch param to particular year
// If user chooses decae option with certain index, create if statement that returns an index number
// If they choose 1960's [0], 1970's [1] blah blah
const earliestDate = ["1960-01-01", "1970-01-01", "1980-01-01", "1990-01-01"];
const latestDate = ["1969-12-31", "1979-12-31", "1989-12-31", "1999-12-31"];
const app = {}
app.init = () => {
    app.addEventListeners();
}
// app.yearId;
// app.genreId;
console.log(app.genreId, "Global") ;
app.apiKey = "352855b1ece3130738315189ae8c3079";
app.url = "https://api.themoviedb.org/3/discover/movie";
const url = new URL(app.url)
url.search = new URLSearchParams({
    api_key:app.apiKey,
    language: 'en-US',
    sort_by: "popularity.desc",
    with_genres: app.genreId,
    page: 1,
    "primary_release_date.gte": earliestDate[app.yearId],
    "primary_release_date.lte": latestDate[app.yearId],
})
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonResult){
            // console.log(jsonResult);
            //Pass our JSON Results to our displayMovies function.
            app.displayMovies(jsonResult.results);
        });
// Define a Method to display the Movies
app.displayMovies = (arrayOfFilms) => {
    // Target the Node we will attatch to
    const movieContainer = document.querySelector('.resultsContainer');
    // console.log(arrayOfFilms);
        // Iterate through the API Data
        arrayOfFilms.forEach(film => {
            // console.log(film);
            // Create some HTML
            // Create container Elements
            const movie = document.createElement('li');
            // Create an element for our Movie Title
            const movieTitle = document.createElement('p');
            movieTitle.classList.add(`array`);
            movieTitle.innerText = film.title;
            // Create Image Element for Poster
            const poster = document.createElement('img');
            poster.classList.add(`imgContainer`)
            poster.src = `http://image.tmdb.org/t/p/w500/${film.poster_path}`;
            // Creatre Element for release Year of Film
            const releaseYear = document.createElement('p');
            releaseYear.innerText = film.release_date;
            // Put all of the Elements together
            movie.appendChild(movieTitle);
            movie.appendChild(poster);
            movie.appendChild(releaseYear);
            // Append Movie to its Ul Target
            movieContainer.appendChild(movie);
     })
}
// Listen for a Change Event with the Filter Options on Landing Page
app.attachEventListeners = () => {
    app.genreSelect = document.querySelector('#genre');
    app.yearSelect = document.querySelector('#year');
    app.genreSelect.addEventListener('change', function(event){
        const selectedGenre = app.genreSelect.value;
        console.log(selectedGenre);
        if (selectedGenre === "Crime"){
            app.genreId = "80";
        } else if (selectedGenre === "Horror"){
            app.genreId = "27";
        } else if (selectedGenre === "Romance"){
            app.genreId = "10749";
        } else {
            app.genreId = "28";
        }
    console.log("genreId", app.genreId);
    });
    app.yearSelect.addEventListener('change', function(event){
        const selectedYear = app.yearSelect.value;
        if (selectedYear === "1990"){
             app.yearId = 3;
        } else if (selectedYear === "1980"){
            app.yearId = 2;
        } else if (selectedYear === "1970"){
            app.yearId = 1;
        } else if (selectedYear === "1960"){
            app.yearId = 0;
        }
        // console.log(app.yearId)
    }
)};
app.attachEventListeners();