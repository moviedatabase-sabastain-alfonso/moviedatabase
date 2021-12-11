"use strict";

(function(){
    //glitch database
    const API_URL = `https://upbeat-hail-splash.glitch.me/movies`;

    // OMBD API Search Function
    let getOmbdData = (search) =>{
        const API_OMBD_URL = `http://www.omdbapi.com/?s=${search}&apikey=${OMBD_API}&`;
        return fetch(API_OMBD_URL+search).then(response => response.json()).catch(error => console.error(error));
    }
    getOmbdData("matrix").then(data => console.log(data));

    // function to retrieve/fetch movie info from glitch database
    let getMovieInfo = () =>{
        return fetch(API_URL).then(response => response.json()).catch(error => console.error(error));
    }


    let renderMovieInfo = () =>{
        getMovieInfo().then(data => {
            data.forEach(function(element){
                console.log(element.id);
                return $('#divTest').append(`<li> Movie Title: ${element.title}, Movie Id: ${element.id}</li>`);
            })
        });
    }
    renderMovieInfo();




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


    // start: *** function to delete movie ***
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

    // function to edit a movie
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





























})();