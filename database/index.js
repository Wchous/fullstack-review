const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

db.on('error', console.error.bind(console, `HEY there's a connection error`));
db.once('open', function(){
  console.log('Success w/ DB connection')
});

let repoSchema = mongoose.Schema({
  name: String, 
  url: String,
  id: Number,
  stars: Number 
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
      onsole.log('HEY you just got an error in the DB '+ err)
    }
    // else{
    //   let repoArray = [];
    //   repoArray.push(gitRepo)
    // }
  })
})

let sortGitRepos = callback => {
  Repo.find((err,repo) => {
    if(err){
      console.log(err)
    }else{
      callback(repo)
    }
  }).limit(25).sort({stars: 1})
}


module.exports.sortGitRepos = sortGitRepos;
module.exports.save = save;