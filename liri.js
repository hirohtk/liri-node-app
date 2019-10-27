require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require('moment');

var selection = process.argv[2];

var input = process.argv.slice(3).join(" ");

switch (selection) {
    case ("concert-this"):
        concert(input);
        break;

    case ("spotify-this-song"):
        doSpotify(input);
        break;

    case ("movie-this"):
        movieThis(input);
        break;

    case ("do-what-it-says"):
        doWhatItSays(input);
        break;

    case ("help"):
        console.log("\nPlease input one of the following, followed by a musical artist, song, or movie(in the case of the first three options): ");
        console.log("\nconcert-this");
        console.log("spotify-this-song");
        console.log("movie-this");
        console.log("do-what-it-says");
        break;

    default:
        console.log("\nInvalid selection!  Please input one of the following, followed by a musical artist, song, or movie (in the case of the first three options): ");
        console.log("\nconcert-this");
        console.log("spotify-this-song");
        console.log("movie-this");
        console.log("do-what-it-says");
}

function concert(a) {

    axios.get("https://rest.bandsintown.com/artists/" + a + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
                var concertDate = response.data[i].datetime;
                var convertedDate = moment(concertDate).format("MM/DD/YYYY");
                console.log("Venue # " + i);
                console.log("Name of Venue: " + response.data[i].venue.name);
                if (response.data[i].venue.region) {
                    console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                }
                else {
                    console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                }
                console.log("Date of Event: " + convertedDate);
                console.log("\n");
            }

        }
    );
}

function movieThis(a) {
    var movieSearch = a;
    if (movieSearch.length === 0) {
        a = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + a + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("\n\n");
            console.log("Movie Title: " + response.data.Title);
            console.log("This movie came out in " + response.data.Year + ".");
            console.log("The IMDB rating for this movie is " + response.data.imdbRating);
            console.log("The " + response.data.Ratings[1].Source + " rating for this movie is " + response.data.Ratings[1].Value);
            if (response.data.Country === "USA" || response.data.Country === "UK") {
                console.log("This movie was produced in the " + response.data.Country);
            }
            else {
                console.log("This movie was produced in " + response.data.Country);
            }
            console.log("This movie was produced in " + response.data.Language);
            console.log("\nHere's a short description of the movie's plot: " + "\n\n" + response.data.Plot);
            console.log("\nThe actors/actresses in this movie are: " + "\n" + response.data.Actors + "\n");
        });
}

function doSpotify(a) {var songSearch = a;
    if (songSearch.length === 0) {
        a = "Ace of Base The Sign"
    }
    spotify.search({ type: 'track', query: a}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    var spotifyPath = data.tracks.items;
    console.log("\nArtist Name: " + spotifyPath[0].artists[0].name);
    console.log("Song Title is: " + spotifyPath[0].name);
    console.log("Spotify Preview Link: " + spotifyPath[0].preview_url);
    console.log("Song is on the album named: " + spotifyPath[0].album.name); 
   });
}


function doWhatItSays(a) {

}
