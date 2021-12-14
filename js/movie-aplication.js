"use strict";

(function(){
    //glitch database
    const API_URL = `https://upbeat-hail-splash.glitch.me/movies`;





    // OMBD API Search Function
    let getOmbdData = (search, year) =>{
        const API_OMBD_URL = `http://www.omdbapi.com/?t=${search}&y=${year}&apikey=${OMBD_API}&`;
        return fetch(API_OMBD_URL+search).then(response => response.json()).catch(error => console.error(error));
    }

    let getPosterData = (search, year) =>{
        const API_POSTER_URL = `http://img.omdbapi.com/?t=${search}&y=${year}&apikey${OMBD_API}&`;
        return fetch(API_POSTER_URL+search).then(response => response.json()).catch(error => console.error(error));
    }


    // function to retrieve/fetch movie info from glitch database
    let getMovieInfo = () =>{
        return fetch(API_URL).then(response => response.json()).catch(error => console.error(error));
    }

    // loading img
    $("#container").append(`<div><img src="img/giphy.gif"></div>`);


    // function to render movies on html div  <-- start -->
    let renderMovieInfo = () =>{
        getMovieInfo().then(data => {
            data.forEach(function(element){
                console.log(element.poster);
                console.log(typeof(element.poster));
                return $('#container').append(`<div class="card" style="max-width: 250px"><div id="imgContainer" style="max-width: 250px; max-height: 500px;"><img style="max-width: 250px; max-height: 400px;" src=${element.poster}></div> <h3>Movie Title: </h3>${element.title}, <strong>Movie Id: </strong>${element.id}, <strong>Movie Plot: </strong>"${element.plot}"</div> `);
            })
        });
    }

    let loadData = setTimeout(function() {
        $('#container').html(" ");
        renderMovieInfo();
    }, 5000);

// <-- end of function -->

    // search function
    $('#searchMovieBtn').click(function(){
        let movieSearch = $("#searchTitle").val();
        $("#container").html(" ");
        console.log(movieSearch);
        getMovieInfo().then(data => {
            data.forEach(function(movie){
                if(movie.title === movieSearch || movie.id === Number(movieSearch))  {
                    console.log(movie.poster);
                    $('#searchMovieDisplay').append(`<div class="card bg-info"><div id="imgContainer" style="width: 200px"><img src=${movie.poster}></div> <h3>Movie Title: </h3>${movie.title}, <strong>Movie Id: </strong>${movie.id}, <strong>Movie Plot: </strong>${movie.plot}</div>`);
                    $('#container').append(`<div class="card"> <h3>Movie Title: </h3>${movie.title}, <strong>Movie Id: </strong>${movie.id}, <strong>Movie Plot: </strong>"${movie.plot}"</div>`);
                }
            })
        })
        $("#searchTitle").val(" ");
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
        $("#createTitle").val(" ");
        $("#createYear").val(" ");
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
                if (deleteMovie === movie.title || Number(deleteMovie) === movie.id){
                    $('#displayDeleteMovieSelection').append(`<div class="card"> <h3>Movie Title: </h3>${movie.title}, <strong>Movie Id: </strong>${movie.id}, <strong>Movie Plot: </strong>"${movie.plot}"</div>`);
                    // alert((`<div class="card"> <h3>Movie Title: </h3>${movie.title}, <strong>Movie Id: </strong>${movie.id}, <strong>Movie Plot: </strong>"${movie.plot}"</div>`));
                    let confirmed = confirm(`Confirm you would like to delete Movie title:${movie.title} Movie Id: ${movie.id}?`) ? "true" : "false";
                    if (confirmed === "true"){
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
                    alert(movie.title + " deleted.");
                    location.reload();
                    } else {
                        alert("Requested Aborted!")
                    }
                }
            })
        })
        $("#deleteMovie").val(" ");
    })
    // end: *** end of call ***

    // $("#selectMenu2").change(function(){
    //     let inputVal = $(this).val();
    // })



    // start: edit movie function
    let editMovie = (movie, id) => {
        let options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        }
        return fetch(`${API_URL}/${id}`, options).then(response => response.json()).catch(error => console.error(error));
    }
    // end of function

   $("#changeMovie").click(function(e){
       e.preventDefault();
       $("#displayMovieToEdit").html(" ");
       $("#container").html(" ");
       $("#searchMovieDisplay").html(" ");
       let id = $("#idToEdit").val();
       console.log(typeof(id));
       getMovieById(id).then(data => {
               if (data.id === Number(id)) {
                   $('#displayMovieToEdit').append(`<div class="card"> <h3>Movie Title: </h3>${data.title}, <strong>Movie Id: </strong>${data.id}, <strong>Movie Plot: </strong>${data.plot}</div>`);
               }
           let newTitle = prompt("Enter new title: ");
           let movie = data.title;
           console.log(movie);
           let editTemplate ={
               actors: data.actors,
               director: data.director,
               genre: data.genre,
               plot: data.plot,
               poster: data.poster,
               rating: data.rating,
               title: newTitle,
               year: data.year
           }
           console.log(newTitle);
           console.log(editTemplate);
           editMovie(editTemplate,id).then(data => console.log(data));
       })
       $('#idToEdit').val(" ");
   })































})();