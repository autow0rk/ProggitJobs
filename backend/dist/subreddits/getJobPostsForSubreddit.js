"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobPosting_1 = __importDefault(require("../classes/JobPosting"));
const findJobThread_1 = __importDefault(require("./findJobThread"));
const date_fns_1 = require("date-fns");
function getJobsForMonth(redditClient, jobThread, filterJobs, subredditName) {
    return redditClient.getSubmission(jobThread.id).expandReplies({ limit: Infinity, depth: Infinity }).then((jobThreadWithComments) => __awaiter(this, void 0, void 0, function* () {
        function getMonthName(month) {
            const date = new Date();
            date.setMonth(month);
            return (0, date_fns_1.format)(date, 'MMMM');
        }
        let jobsPostings = [];
        const allCommentsInJobThread = jobThreadWithComments.comments;
        const jobPostingsInThread = filterJobs(allCommentsInJobThread, jobThread);
        jobPostingsInThread.forEach((jobPosting) => {
            const redditBaseUrl = 'https://www.reddit.com';
            const jobTitle = jobPosting.body.split('\n')[0];
            const dateOfJobPost = new Date(jobPosting.created_utc * 1000);
            const monthPosted = (0, date_fns_1.format)(new Date((0, date_fns_1.getMonth)(dateOfJobPost)), 'MMMM');
            const monthYearPosted = getMonthName((0, date_fns_1.getMonth)(dateOfJobPost)) + ', ' + (0, date_fns_1.getYear)(dateOfJobPost);
            let job = new JobPosting_1.default(subredditName, jobTitle, jobPosting.body, dateOfJobPost, monthYearPosted, redditBaseUrl + jobPosting.permalink);
            jobsPostings.push(job);
        });
        return jobsPostings;
    }));
}
function getJobPostsForSubreddit(redditClient, subredditName, searchOptions, filterJobs) {
    return (0, findJobThread_1.default)(redditClient, subredditName, searchOptions).then((jobThreads) => __awaiter(this, void 0, void 0, function* () {
        // go through each jobThread in jobThreads, then resolve each of the jobThread promises individually (do it sequentually, await each of them).
        // Once each one is awaited for and finished, add each jobThreads' respective jobs to a 'global array'.
        // Then resolve the 'main' promise that getJobPostsForSubreddit returns, by returning the array of jobs.
        let arrayOfJobThreadPromises = [];
        jobThreads.forEach((jobThread) => {
            arrayOfJobThreadPromises.push(getJobsForMonth(redditClient, jobThread, filterJobs, subredditName));
        });
        return Promise.all(arrayOfJobThreadPromises)
            .then((allJobs) => {
            return allJobs;
        });
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
    }));
}
exports.default = getJobPostsForSubreddit;
