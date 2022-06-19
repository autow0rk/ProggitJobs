import Snoowrap = require('snoowrap');
import {Listing, Submission, SearchOptions, Comment} from 'snoowrap'
import type {JobPosting} from '../types/JobPosting';

export default function findJobThread(redditClient: Snoowrap, subredditName: string, searchOptions: SearchOptions){
    return redditClient.getSubreddit(subredditName).search(searchOptions).then((results: Listing<Submission>) => { // search the scala subreddit for the most recent monthly job posting
        //const jobThread: Submission = results[0];
        //return jobThread; // resolve promise with job thread info
        return results;
    });
}