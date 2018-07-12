const express = require('express');
const bodyParser = require('body-parser');
const helper = require('../helpers/github.js');
const database = require('../database/index.js');


let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res) => {
  console.log(`You're in the post function of your server index!`)
 
  let username = req.body.data;
  return github.getReposByUsername(username)
    .then((repos) => {
      repos.forEach((repo) => {
        db.save(newRepoObj);
      });
    }); 
});




app.get('/repos', function (req, res) {

  console.log(`You're in the get function of your server index!`)

  db.fetch((error, repos) => {
    if (error) {
      console.log(error);
    } else {
      console.log(repos);
    }
  });
})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});