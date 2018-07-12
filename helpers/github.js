const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  console.log('youre in the helper!!!!!!')

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  } 
  // return new Promise((reject,resolve) => {
  return request.get(options, callback) 
  // })
}

module.exports.getReposByUsername = getReposByUsername;