const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  } 

  request.get(options, (err, gitObject) => {
    if(err){
      console.log('there was an issure in your request here: ' + err)
    }else{
      console.log(gitObject.body)
      callback(gitObject)
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;