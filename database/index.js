const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

db.on('error', console.error.bind(console, `HEY there's a connection error`));
db.once('open', function(){
  console.log('Success w/ DB connection')
});

let repoSchema = mongoose.Schema({
  git_name: String, 
  git_url: String,
  git_id: Number,
  git_stargazers_count: Number 
});

let Repo = mongoose.model('Repo', repoSchema);

let save = ((err, gitObj) => {

  let parsedObj = JSON.parse(gitObj.body)

  for(let i = 0; i<parsedObj.length; i++){
    let returnObj = {};

    returnObj.name = parsedObj[i].name
    returnObj.url = parsedObj[i].url
    returnObj.id = parsedObj[i].owner.id
    returnObj.stars = parsedObj[i].stargazers_count  
  }

  let gitRepo = new Repo(returnObj)
  
  gitRepo.save(err => {
    if(err){
      return console.log('HEY you just got an error in the DB '+ err)
    }else{
      let repoArray = [];
      repoArray.push(gitRepo)
    }
  })
})
  

module.exports.save = save;