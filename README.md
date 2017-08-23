# Twired

Twitter bot to fetch posts from reddit and post them on twitter.

## Install all packages

Install all packages using `npm install`

## Setting up environment variables

The following list of environment variables should be added for the application
to run properly

    cron="59 * * * *"

    reddit_sub="" # Subreddit to fetch content from

    # Twitter api token
    twitter_consumer_key=""
    twitter_consumer_secret=""
    twitter_access_token_key=""
    twitter_access_token_secret=""

You can generate twitter token from there [developers page](https://apps.twitter.com/)

## Starting up the app

Startup script is simply `npm start`. I am using that along with `pm2` to
push the script as background daemon.

### Self promotion

Love the code and would like to hear from me ? follow me on twitter 
[@theRahulBhola](https://twitter.com/theRahulBhola).
