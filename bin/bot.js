// Include all packages required for bot
require('dotenv').config();
const chalk  = require('chalk');
const cron   = require('node-schedule');
const reddit = require('../lib/reddit.js');
const twitter = require('../lib/twitter.js');

// Load environement variables
var cron_string = process.env.cron;
var reddit_sub  = process.env.reddit_sub;

// Display a startup message
var init_message = chalk.red.bold("Starting twired bot");
console.log(init_message);

/**
 * Schedules the cron job
 */
cron.scheduleJob(cron_string, function(){
    var twitter_ctx = new twitter();
    var reddit_ctx = new reddit(reddit_sub);
    reddit_ctx
        .load_page()
        .then(()=> reddit_ctx.get_first())
        .then((tweet)=> twitter_ctx.set_content(tweet))
        .then(()=> twitter_ctx.post_status())
        .then((tweet)=>{
            var message = chalk.green("TWEET : "+tweet);
            console.log(message);
        })
        .catch((err)=>{
            var message = chalk.red("ERROR : "+err.message);
            console.log(message);
        });
});
