// Include all packages required for bot
require('dotenv').config();
const chalk = require('chalk');
const cron  = require('node-schedule');

// Load environement variables
var cron_string = process.env.cron;
var reddit_sub  = process.env.reddit_sub;

// Display a startup message
var init_message = chalk.green.bold("Starting twired bot");
console.log(init_message);

/**
 * Schedules the cron job
 */
cron.scheduleJob(cron_string, function(){
    // Fetch from reddit and post to twitter
});
