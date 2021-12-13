"use strict";

(function(){
    //glitch database
    const API_URL = `https://upbeat-hail-splash.glitch.me/movies`;

    // OMBD API Search Function
    let getOmbdData = (search, year) =>{
        const API_OMBD_URL = `http://www.omdbapi.com/?t=${search}&y=${year}&apikey=${OMBD_API}&`;
        return fetch(API_OMBD_URL+search).then(response => response.json()).catch(error => console.error(error));
    }
    getOmbdData("matrix", "1999").then(data => console.log(data));

    // function to retrieve/fetch movie info from glitch database
    let getMovieInfo = () =>{
        return fetch(API_URL).then(response => response.json()).catch(error => console.error(error));
    }

    // function to render movies on html div  <-- start -->
    let renderMovieInfo = () =>{
        getMovieInfo().then(data => {
            data.forEach(function(element){
                // console.log(element.id);
                return $('#container').append(`<div class="card"> <h3>Movie Title: </h3>${element.title}, <strong>Movie Id: </strong>${element.id}, <strong>Movie Plot: </strong>"${element.plot}"</div>`);
            })
        });
    }
    renderMovieInfo();
// <-- end of function -->

    // search function
    $('#searchMovieBtn').click(function(){

        let movieSearch = $("#searchTitle").val();
        $("#container").html(" ");
        console.log(movieSearch);
        getMovieInfo().then(data => {
            data.forEach(function(movie){
                if(movie.title === movieSearch || movie.id === Number(movieSearch))  {
                    $('#searchMovieDisplay').append(`<div class="card"> <h3>Movie Title: </h3>${movie.title}, <strong>Movie Id: </strong>${movie.id}, <strong>Movie Plot: </strong>"${movie.plot}"</div>`);
                    $('#container').append(`<div class="card"> <h3>Movie Title: </h3>${movie.title}, <strong>Movie Id: </strong>${movie.id}, <strong>Movie Plot: </strong>"${movie.plot}"</div>`);
                }
            })
        })
    })


    // function to retrieve movie by id
    let getMovieById =(id) => {
        return fetch(`${API_URL}/${id}`).then(response => response.json()).catch(error => console.error(error));
    }
    // calls function
    getMovieById(2).then(data => console.log(data));

    // create movie function
    let createMovie = (movie) =>{
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify((movie))
        }
        return fetch(API_URL, options).then(response => response.json()).catch(error => console.error(error));
    }

    $("#newMovie").click(function(e){
        e.preventDefault();
        let tempMovie = $("#createTitle").val();
        let tempYear = $("#createYear").val();
        console.log(tempMovie);
        console.log(tempYear)
        getOmbdData(tempMovie, tempYear).then(data => {
            $("#postMovieDisplay").append(`<h5>${data.Title}, released in ${data.Year}, plot summary ${data.Plot}`);
            console.log(data.Actors);
            console.log(data.Director);
            console.log(data.Genre);
            console.log(data.Plot);
            console.log(data.Poster);
            console.log(data.Ratings);
            console.log(data.Title);
            console.log(data.Year);
            let movieTemplate = {
                actors: data.Actors,
                director: data.Director,
                genre: data.Genre,
                plot: data.Plot,
                poster: data.Poster,
                rating: data.Ratings,
                title: data.Title,
                year: data.Year
            }
            createMovie(movieTemplate).then(data => console.log(data));
        })
    })


    // start: *** delete movie function ***
    let deleteMovie = (id) => {
        let options ={
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        return fetch(`${API_URL}/${id}`, options).then(response => response.json()).catch(error => console.error(error));
    }
    // end: *** delete function ***

    // start: *** calls delete function ***
    $("#delete-movie").click(function(e){
        e.preventDefault();
        let deleteMovie = $("#deleteMovie").val();
        $("#displayDeleteMovieSelection").html(" ");
        console.log(deleteMovie);
        getMovieInfo().then(data => {
            data.forEach(function(movie){
                if (deleteMovie === movie.title){
                    $('#displayDeleteMovieSelection').append(`<div class="card"> <h3>Movie Title: </h3>${movie.title}, <strong>Movie Id: </strong>${movie.id}, <strong>Movie Plot: </strong>"${movie.plot}"</div>`);
                    // alert((`<div class="card"> <h3>Movie Title: </h3>${movie.title}, <strong>Movie Id: </strong>${movie.id}, <strong>Movie Plot: </strong>"${movie.plot}"</div>`));
                    let confirmed = confirm(`Confirm you would like to delete Movie title:${movie.title} Movie Id: ${movie.id}?`) ? "true" : "false";
                    console.log(confirmed);
                    let deleteMovie = (id) => {
                        let options ={
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                        return fetch(`${API_URL}/${id}`, options).then(response => response.json()).catch(error => console.error(error));
                    }
                    deleteMovie(movie.id).then(data => console.log(data));
                    alert(movie.title + "deleted.");
                }
            })
        })
    })
    // end: *** end of call ***


    // start: edit movie function
    let editMovie = (movie) => {
        let options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        }
        return fetch(`${API_URL}/${movie.id}`, options).then(response => response.json()).catch(error => console.error(error));
    }
    // end of function































})();