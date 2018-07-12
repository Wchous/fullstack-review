const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// db.on('error', console.error.bind(console, `HEY there's a connection error`));
// db.once('open', function(){
//   console.log('Success w/ DB connection')
// });

let repoSchema = mongoose.Schema({
  name: String, 
  url: String,
  id: Number,
  stars: Number 
});

let Repo = mongoose.model('Repo', repoSchema);

let save = ((err, gitObj) => {
  
  console.log(`HEYYYYYYY it's the GITOBJ ${gitObj}!!!!!!!!!`)
  let parsedObj = gitObj

  let returnObj = {};
  for(let i = 0; i<parsedObj.length; i++){
    console.log(`HEYYYYYYYYYY it's the parsedObj ${parsedObj}`)
    

    returnObj.name = parsedObj[i].name
    returnObj.url = parsedObj[i].url
    returnObj.id = parsedObj[i].id
    returnObj.stars = parsedObj[i].stargazers_count  
  }
  console.log(`HEYYYYYYYYYY it's the returnObj after the for loop ${returnObj}`)
  let gitRepo = new Repo(returnObj)
  
  gitRepo.save()
})

let getGitRepos = callback => {
  Repo.find((err,repo) => {
    if(err){
      console.log(err, null)
    }else{
      callback(null, repo)
    }
  }).limit(25).sort({stars: 1})
}


module.exports.getGitRepos = getGitRepos;
module.exports.save = save;