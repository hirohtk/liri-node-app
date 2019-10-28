require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');

var fs = require("fs");

var selection = process.argv[2];

var input = process.argv.slice(3).join(" ");

//Only used for do-what-it-says:

var whichAppFromTextFile;
var yourSearchFromTextFile;

let timeNow = moment().format("LLLL");

var toLog = "\n\n***Logged at " + timeNow + "\n      You Selected: " + selection + "\n      You Queried: " + input + "\n" + "--> Data returned was... \n";

function log() {
    fs.appendFile("log.txt", toLog, function(err) {
        if (err) {
          return console.log(err);
        }
    });
}

switch (selection) {
    case ("concert-this"):
        concert(input);
        log();
        break;

    case ("spotify-this-song"):
        doSpotify(input);
        log();
        break;

    case ("movie-this"):
        movieThis(input);
        log();
        break;

    case ("do-what-it-says"):
        doWhatItSays(theCallback);
        log();
        function theCallback() {
            switch (whichAppFromTextFile) {
                case ("concert-this"):
                concert(yourSearchFromTextFile);
                break;
        
                case ("spotify-this-song"):
                doSpotify(yourSearchFromTextFile);
                break;
        
                case ("movie-this"):
                movieThis(yourSearchFromTextFile);
                break;
                
                default: 
                console.log("Invalid Data in Text file");
            }
        }
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
                var result = "Venue # " + i + "\nName of Venue: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\nDate of Event: " + convertedDate + "\n";
                fs.appendFile("log.txt", result, function(err) {
                    if (err) {
                      return console.log(err);
                    }
                  });
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
            console.log("This movie was produced in the language of " + response.data.Language);
            console.log("\nHere's a short description of the movie's plot: " + "\n\n" + response.data.Plot);
            console.log("\nThe actors/actresses in this movie are: " + "\n" + response.data.Actors + "\n");
            var result = "\n" + "Movie Title: " + response.data.Title + "\nThis movie came out in " + response.data.Year + "." + "\nThe IMDB rating for this movie is " + response.data.imdbRating + "\nThe " + response.data.Ratings[1].Source + " rating for this movie is " + response.data.Ratings[1].Value + "\nThis movie was produced in " + response.data.Country + "\nThis movie was produced in the language of " + response.data.Language + "\nHere's a short description of the movie's plot: " + "\n\n" + response.data.Plot + "\nThe actors/actresses in this movie are: " + "\n" + response.data.Actors + "\n";
            fs.appendFile("log.txt", result, function(err) {
                if (err) {
                  return console.log(err);
                }
              });
        });
}

function doSpotify(a) {
    var songSearch = a;
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
    var result = "\nArtist Name: " + spotifyPath[0].artists[0].name + "\nSong Title is: " + spotifyPath[0].name + "\nSpotify Preview Link: " + spotifyPath[0].preview_url + "\nSong is on the album named: " + spotifyPath[0].album.name;
    fs.appendFile("log.txt", result, function(err) {
        if (err) {
          return console.log(err);
        }
      });
});
   
}

function doWhatItSays(callback) {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        //have to store the split data into an object (data form changed from string to array), so you can use it below
        var arrayFromSplit = data.split(",");
        whichAppFromTextFile = arrayFromSplit[0].trim();
        yourSearchFromTextFile = arrayFromSplit[1].trim();
        callback();
      });
}

