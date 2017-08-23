// Include all packages required for bot
const Twitter = require('twitter');

// Define a twitter client
var client = new Twitter({
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token_key: process.env.twitter_access_token_key,
  access_token_secret: process.env.twitter_access_token_secret
});

/**
 * Class to interact with twitter
 * @contructor
 */
function twitter() {
    this.tweet = "";
}

/**
 * Set tweet content
 */
twitter.prototype.set_content = function (tweet) {
    this.tweet = tweet;
}

/**
 * Post tweet update
 */
twitter.prototype.post_status = function () {
    return new Promise((fullfill,reject)=>{
        client.post('statuses/update', {status: this.tweet},(err,tweet,resp)=>{
            if(err){
                reject(err);
            } else {
                fullfill(this.tweet);
            }
        });
    });
}

module.exports = twitter;
