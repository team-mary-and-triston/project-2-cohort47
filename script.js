

const movieApp = {};

movieApp.init = () => {
    movieApp.submitListener();
};

// "Pick my Flix" listener
movieApp.submitListener = () => {
    const submitBtn = document.getElementById('submitBtn');
    
    // listen for click
    submitBtn.addEventListener('click', function(e) {
        // prevent page from restarting
        e.preventDefault();

        // save dropdown selections into variables
        const selectedGenre = document.getElementById('genre').value;
        const selectedYear = document.getElementById('year').value;

        // save array of earliest decade date to latest decade date to be used for "primary release date" in search params
        const earliestDate = ["1960-01-01", "1970-01-01", "1980-01-01", "1990-01-01"];
        const latestDate = ["1969-12-31", "1979-12-31", "1989-12-31", "1999-12-31"]; 


        // change user selection of genre into id used by API 
        if (selectedGenre === "Crime") {
            movieApp.genreId = 80;
        } else if (selectedGenre === "Horror") {
            movieApp.genreId = 27;
        } else if (selectedGenre === "Romance") {
            movieApp.genreId = 10749;
        } else if (selectedGenre === "Action") {
            movieApp.genreId = 28;
        };


        //change user selection for year into index in order to use for earliest and lastest date
        if (selectedYear === "1990") {
            movieApp.yearId = 3;
        } else if (selectedYear === "1980") {
            movieApp.yearId = 2;
        } else if (selectedYear === "1970") {
            movieApp.yearId = 1;
        } else if (selectedYear === "1960") {
            movieApp.yearId = 0;
        };

        console.log(movieApp.yearId,movieApp.genreId)
        

        // API call
        movieApp.apiKey = "352855b1ece3130738315189ae8c3079";
        movieApp.url = "https://api.themoviedb.org/3/discover/movie"; 
        const url = new URL(movieApp.url)
        url.search = new URLSearchParams({
            api_key: movieApp.apiKey,
            language: 'en-US',
            sort_by: "popularity.desc",
            with_genres: movieApp.genreId,
            page: 1,
            "primary_release_date.gte": earliestDate[movieApp.yearId],
            "primary_release_date.lte": latestDate[movieApp.yearId],
        })
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResult) {
                //Pass our JSON Results to our displayMovies function.
                console.log(jsonResult.results, jsonResult.total_pages)
                // movieApp.displayMovies(jsonResult.results);
            })
    })
};


// Save user selection into variable
// append data to results section
// listen to "more button" click to go to next page of results


movieApp.init();
