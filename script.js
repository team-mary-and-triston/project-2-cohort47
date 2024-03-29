

const app = {};

app.init = () => {
    // app.openModal();
    app.submitListener();
    app.formReset();
};

//Reset our Form and allow users to resubmit
app.formReset = () => {
    app.reset = document.getElementById('resetBtn');

    // Create event listener 
    app.reset.addEventListener('click', function (e) {
        //Prevent page from restarting
        e.preventDefault();
        //Define our Variables 
        const container = document.getElementsByClassName('resultsList');
        //Remove the items from our Array
        const removed = container[0];
        removed.innerHTML = ``;
    })

}

// "Pick my Flix" listener
app.submitListener = () => {
    // target submit button
    const submitBtn = document.getElementById('submitBtn');

    // listen for click
    submitBtn.addEventListener('click', function (e) {
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
            app.genreId = 80;
        } else if (selectedGenre === "Horror") {
            app.genreId = 27;
        } else if (selectedGenre === "Romance") {
            app.genreId = 10749;
        } else if (selectedGenre === "Action") {
            app.genreId = 28;
        };

        //change user selection for year into index in order to use for earliest and lastest date
        if (selectedYear === "1990") {
            app.yearId = 3;
        } else if (selectedYear === "1980") {
            app.yearId = 2;
        } else if (selectedYear === "1970") {
            app.yearId = 1;
        } else if (selectedYear === "1960") {
            app.yearId = 0;
        };

        // API call
        app.apiKey = "352855b1ece3130738315189ae8c3079";
        app.url = "https://api.themoviedb.org/3/discover/movie";
        const url = new URL(app.url)
        url.search = new URLSearchParams({
            api_key: app.apiKey,
            language: 'en-US',
            sort_by: "popularity.desc",
            with_genres: app.genreId,
            page: 1,
            "primary_release_date.gte": earliestDate[app.yearId],
            "primary_release_date.lte": latestDate[app.yearId],
        })
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResult) {
                //Pass our JSON Results to our displayMovies function.
                app.displayMovies(jsonResult.results)

                //save total pages to use for randomizer in more results
                app.totalPages = jsonResult.total_pages;
            })

        // scroll to results (have to figure out why scroll is working on the 2nd click and not the first)
        const results = document.querySelector('h4').offsetTop;
        window.scrollTo({ top: results, behavior: "smooth" });

    })
};

// Display movies to page
app.displayMovies = (arrayOfFilms) => {
    // target ul 
    app.movieContainer = document.querySelector('.resultsList');

    arrayOfFilms.forEach(film => {

        // limit results to 12
        if (arrayOfFilms.indexOf(film) <= 11) {
            // create li element
            const movie = document.createElement('li');
            movie.classList.add('resultsContainer')

            // create div elements to house image and title
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('imgContainer');

            const titleOverlay = document.createElement('div');
            titleOverlay.classList.add('textOverlay')

            // use API call data to change poster and film title
            imageContainer.innerHTML =
                `
            <img src="http://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.title}">
            `
            titleOverlay.innerHTML =
                `
            <p>${film.title}</p>
            `
            // append divs to li
            movie.appendChild(imageContainer);
            movie.appendChild(titleOverlay);

            // append li to ul on page
            app.movieContainer.appendChild(movie)

        };
    })
};

// More results listener 

app.moreButton = document.getElementById('moreBtn');
// Listen for Click
app.moreButton.addEventListener('click', function (e) {
    // Clear out our list for more results
    app.movieContainer.innerHTML = "";

    // Prevent Restart
    e.preventDefault();

    // save dropdown selections into variables
    const selectedGenre = document.getElementById('genre').value;
    const selectedYear = document.getElementById('year').value;

    // save array of earliest decade date to latest decade date to be used for "primary release date" in search params
    const earliestDate = ["1960-01-01", "1970-01-01", "1980-01-01", "1990-01-01"];
    const latestDate = ["1969-12-31", "1979-12-31", "1989-12-31", "1999-12-31"];

    // change user selection of genre into id used by API 
    if (selectedGenre === "Crime") {
        app.genreId = 80;
    } else if (selectedGenre === "Horror") {
        app.genreId = 27;
    } else if (selectedGenre === "Romance") {
        app.genreId = 10749;
    } else if (selectedGenre === "Action") {
        app.genreId = 28;
    };

    //change user selection for year into index in order to use for earliest and lastest date
    if (selectedYear === "1990") {
        app.yearId = 3;
    } else if (selectedYear === "1980") {
        app.yearId = 2;
    } else if (selectedYear === "1970") {
        app.yearId = 1;
    } else if (selectedYear === "1960") {
        app.yearId = 0;
    };

    // randomize page function
    app.randomPage = (pageMax) => {
        return Math.ceil(Math.random() * pageMax);
    }

    // API call
    app.apiKey = "352855b1ece3130738315189ae8c3079";
    app.url = "https://api.themoviedb.org/3/discover/movie";
    const url = new URL(app.url)
    url.search = new URLSearchParams({
        api_key: app.apiKey,
        language: 'en-US',
        sort_by: "popularity.desc",
        with_genres: app.genreId,
        page: app.randomPage(app.totalPages),
        "primary_release_date.gte": earliestDate[app.yearId],
        "primary_release_date.lte": latestDate[app.yearId],
    })
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResult) {
            //Pass our JSON Results to our displayMovies function.
            app.displayMovies(jsonResult.results)
        })

    // scroll to results (have to figure out why scroll is working on the 2nd click and not the first)
    const results = document.querySelector('h4').offsetTop;
    window.scrollTo({ top: results, behavior: "smooth" });
})

app.init();