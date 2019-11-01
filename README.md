# liri-node-app

This application is to be run on the Node.JS RTE and pulls together several API's and Node Packages:

API's:  
Spotify API
OMDB
Bands in Town API

Packages:
Node Spotify API - https://www.npmjs.com/package/node-spotify-api
Axios - https://www.npmjs.com/package/axios
Moment - https://www.npmjs.com/package/moment
dotenv - https://www.npmjs.com/package/dotenv

There may not an application that allows access to movie data, song data, and concert data.  This app solves for this functionality by allowing users to query the API's above using specific commands.  Data from the API's then displays to the user.  All inputs and data are logged into a text file.  

To run the app, execute Node.JS on liri.js, and input one of the following arguments:

- concert-this (band name)
- spotify-this-song (song name)
- movie-this (movie name)
- do-what-it-says

For each of the above, add additional arguments according to the type specified in parentheses above.  The fourth option is run based off of what is in the random.txt file.  

Videos that go through the file to explain the assignment are as follows:

Part 1 (6 mins 30 seconds): https://drive.google.com/file/d/1XneX4S8Y5hirtcR62JClyr8lIJ7p88kD/view
Part 2 (1 minute 30 seconds): https://drive.google.com/file/d/1kFIh5_XDrbAwX9YmS-nz4Odc6J8ERiMN/view
