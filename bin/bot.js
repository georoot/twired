// Include all packages required for bot
require('dotenv').config();
const chalk  = require('chalk');
const cron   = require('node-schedule');
const reddit = require('../lib/reddit.js');

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
    var reddit_ctx = new reddit(reddit_sub);
    reddit_ctx
        .load_page()
        .then(()=> reddit_ctx.get_first())
        .then((tweet)=>{
            var message = chalk.green("TWEET : "+tweet);
            console.log(message);
        })
        .catch((err)=>{
            var message = chalk.red("ERROR : "+err.message);
            console.log(message);
        });
});
