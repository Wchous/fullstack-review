const request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
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
  return new Promise((reject,resolve) => {
    request.get(options, (err, res, body) => {
      if(err){
        console.log(`there was an issure in your helper: ${err}`)
        reject(err)
      } else if (body.message) {
        reject(new Error('failed to find git username'))
      }else { 
       resolve(JSON.parse(body))
      }
    })
  })
}

module.exports.getReposByUsername = getReposByUsername;