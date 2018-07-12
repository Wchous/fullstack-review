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

  let callback = (err,res,body)=>{
    console.log('Youre in the callback var!!!!!!')
    if(err){
      console.log(err)
    }
    else if(body){
      console.log(body)
      database.save(body)
    }else{
      console.log(res)
      res.status(500)
    }
    res.end()
  };

  helper.getReposByUsername(username, callback)
    
});

app.get('/repos', function (req, res) {

  console.log(`You're in the get function of your server index!`)

  // use getGitRepo?
  database.getGitRepos(function(repo) {
    res.json(repo)
  })

  // database.fetch((error, repos) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(repos);
  //   }
  // });
})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});