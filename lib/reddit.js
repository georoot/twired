// Include all packages required for bot
const request = require('request');

/**
 * Basic reddit class to fetch posts
 * @constructor
 * @param {String} reddit_sub - name of reddit sub
 */
function reddit(reddit_sub) {
    this.resp_content = {};
    this.reddit_sub = reddit_sub;
    this.api_url = "https://api.reddit.com/r/"+reddit_sub;
    this.req_context = {
        url: this.api_url,  // Api call url for reddit
        headers: {
            'User-Agent': 'twired;https://github.com/georoot/twired;v0.1'
        }
    }
};

/**
 * Load first page of reddit
 */
reddit.prototype.load_page = function () {
    var self = this;
    return new Promise((fullfill,reject)=>{
        request(self.req_context, (err,resp,body)=>{
            if(err){
                reject(err);
            } else {
                self.resp_content = JSON.parse(body);  // Store response data as JSON
                fullfill();
            }
        });
    });
};

/**
 * Get content from first
 */
reddit.prototype.get_first = function () {
    var self = this;
    return new Promise((fullfill,reject)=>{
        // FIXME : Maybe refractor this function later
        var found = false;
        var data_nodes = self.resp_content.data.children;

        // Iteration loop over response from reddit
        for(let i=0;i< data_nodes.length;i++){
            var post_title = data_nodes[i].data.title,
                post_length = post_title.length;
            if (post_length <= 140) {
                fullfill(post_title);
                found = true;
            }
        }
        if(!found) {
            reject(new Error("Length limitation error :("));
        }
    });
};

module.exports = reddit;
