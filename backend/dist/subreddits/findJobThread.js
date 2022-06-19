"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findJobThread(redditClient, subredditName, searchOptions) {
    return redditClient.getSubreddit(subredditName).search(searchOptions).then((results) => {
        //const jobThread: Submission = results[0];
        //return jobThread; // resolve promise with job thread info
        return results;
    });
}
exports.default = findJobThread;
