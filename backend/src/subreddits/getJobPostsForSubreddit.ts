import JobPosting from "../classes/JobPosting";
import findJobThread from "./findJobThread";
import {Listing, Submission, SearchOptions, Comment} from 'snoowrap'
import Snoowrap = require('snoowrap');
import { getYear, getMonth, format } from "date-fns";

type filterJobThreadFunc = (allCommentsInJobThread: Listing<Comment>, jobThread:Submission) => Comment[];

function getJobsForMonth(redditClient: Snoowrap, jobThread: Submission, filterJobs: filterJobThreadFunc, subredditName: string) {
    return redditClient.getSubmission(jobThread.id).expandReplies({limit: Infinity, depth: Infinity}).then(async (jobThreadWithComments: Submission) => {
        function getMonthName(month: number) { // get the month name of a month number, by creating a new Date() object, setting the month to the month number, then returning the formatted version of that Date (return the month's name only in the newly created and formatted Date object)
            const date = new Date();
            date.setMonth(month);
            return format(date, 'MMMM');
        }
        let jobsPostings: Array<JobPosting> = [];
        const allCommentsInJobThread: Listing<Comment> = jobThreadWithComments.comments;
      
        const jobPostingsInThread = filterJobs(allCommentsInJobThread, jobThread);
        jobPostingsInThread.forEach((jobPosting) => {
            const redditBaseUrl = 'https://www.reddit.com'
            const jobTitle = jobPosting.body.split('\n')[0];
            const dateOfJobPost = new Date(jobPosting.created_utc * 1000);
            const monthPosted = format(new Date(getMonth(dateOfJobPost)), 'MMMM');
            const monthYearPosted = getMonthName(getMonth(dateOfJobPost)) + ', ' + getYear(dateOfJobPost);
            let job = new JobPosting(subredditName, jobTitle, jobPosting.body, dateOfJobPost, monthYearPosted, redditBaseUrl + jobPosting.permalink)
            jobsPostings.push(job);
        });
        
        return jobsPostings;
        
    });
}

function getJobPostsForSubreddit(redditClient: Snoowrap, subredditName: string, searchOptions: SearchOptions, filterJobs: filterJobThreadFunc)/*: Promise<Array<JobPosting>>*/{
    return findJobThread(redditClient, subredditName, searchOptions).then(async (jobThreads: Submission[]) => {
        // go through each jobThread in jobThreads, then resolve each of the jobThread promises individually (do it sequentually, await each of them).
        // Once each one is awaited for and finished, add each jobThreads' respective jobs to a 'global array'.
        // Then resolve the 'main' promise that getJobPostsForSubreddit returns, by returning the array of jobs.
        let arrayOfJobThreadPromises: Promise<JobPosting[]>[] = [];
        jobThreads.forEach((jobThread) => {
            arrayOfJobThreadPromises.push(getJobsForMonth(redditClient, jobThread, filterJobs, subredditName));
        });
        return Promise.all(arrayOfJobThreadPromises)
        .then((allJobs) => {
            return allJobs;
        })
        
        //     redditClient.getSubmission(jobThread.id).expandReplies({limit: Infinity, depth: Infinity}).then(async (jobThreadWithComments: Submission) => {
        //         function getMonthName(month: number) { // get the month name of a month number, by creating a new Date() object, setting the month to the month number, then returning the formatted version of that Date (return the month's name only in the newly created and formatted Date object)
        //             const date = new Date();
        //             date.setMonth(month);
        //             return format(date, 'MMMM');
        //         }
        //         let jobsPostings: Array<JobPosting> = [];
        //         const allCommentsInJobThread: Listing<Comment> = jobThreadWithComments.comments;
              
        //         const jobPostingsInThread = filterJobs(allCommentsInJobThread, jobThread);
        //         jobPostingsInThread.forEach((jobPosting) => {
        //             const redditBaseUrl = 'https://www.reddit.com'
        //             const jobTitle = jobPosting.body.split('\n')[0];
        //             const dateOfJobPost = new Date(jobPosting.created_utc * 1000);
        //             const monthPosted = format(new Date(getMonth(dateOfJobPost)), 'MMMM');
        //             const monthYearPosted = getMonthName(getMonth(dateOfJobPost)) + ', ' + getYear(dateOfJobPost);
        //             let job = new JobPosting(subredditName, jobTitle, jobPosting.body, dateOfJobPost, monthYearPosted, redditBaseUrl + jobPosting.permalink)
        //             jobsPostings.push(job);
        //         });
                
        //         return jobsPostings;
                
        //     });
        
        // return redditClient.getSubmission(jobThread.id).expandReplies({limit: Infinity, depth: Infinity}).then(async (jobThreadWithComments: Submission) => {
        //     function getMonthName(month: number) { // get the month name of a month number, by creating a new Date() object, setting the month to the month number, then returning the formatted version of that Date (return the month's name only in the newly created and formatted Date object)
        //         const date = new Date();
        //         date.setMonth(month);
        //         return format(date, 'MMMM');
        //     }
        //     let jobsPostings: Array<JobPosting> = [];
        //     const allCommentsInJobThread: Listing<Comment> = jobThreadWithComments.comments;
          
        //     const jobPostingsInThread = filterJobs(allCommentsInJobThread, jobThread);
        //     jobPostingsInThread.forEach((jobPosting) => {
        //         const redditBaseUrl = 'https://www.reddit.com'
        //         const jobTitle = jobPosting.body.split('\n')[0];
        //         const dateOfJobPost = new Date(jobPosting.created_utc * 1000);
        //         const monthPosted = format(new Date(getMonth(dateOfJobPost)), 'MMMM');
        //         const monthYearPosted = getMonthName(getMonth(dateOfJobPost)) + ', ' + getYear(dateOfJobPost);
        //         let job = new JobPosting(subredditName, jobTitle, jobPosting.body, dateOfJobPost, monthYearPosted, redditBaseUrl + jobPosting.permalink)
        //         jobsPostings.push(job);
        //     });
            
        //     return jobsPostings;
            
        // });

    });
}

export default getJobPostsForSubreddit;