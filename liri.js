require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require('moment');

var nodeArgs = process.argv;

var selection = process.argv[2];

var input = process.argv.slice(3).join(" ");

console.log(selection);
console.log(input);