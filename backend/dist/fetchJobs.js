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
// const snoowrap = require('snoowrap');
// import {Snoowrap} from 'snoowrap';
const Snoowrap = require("snoowrap");
// import getScalaJobPosts from './subreddits/scala'
// import getReactJSJobPosts from "./subreddits/reactJS";
const scala_1 = __importDefault(require("./subreddits/filters/scala"));
const reactJS_1 = __importDefault(require("./subreddits/filters/reactJS"));
const client_1 = require(".prisma/client");
const getJobPostsForSubreddit_1 = __importDefault(require("./subreddits/getJobPostsForSubreddit"));
require("dotenv/config");
function fetchJobs() {
    return __awaiter(this, void 0, void 0, function* () {
        const prisma = new client_1.PrismaClient();
        const searchOptionsScalaJobs = {
            query: 'Monthly /r/Scala Job Postings Thread',
            restrictSr: true,
            time: 'all',
            //time: 'month',
            limit: 3
        };
        const searchOptionsReactJSJobs = {
            query: 'Who\'s Hiring?',
            restrictSr: true,
            time: 'all',
            //time: 'month',
            limit: 3
        };
        try { // if there's any issues in making our Reddit client or making Reddit API calls, we want to fail gracefully. We don't want some obscure error taking down the whole server, so we wrap the Reddit API logic in a try block.
            let userAgentValue;
            if (process.env.USER_AGENT) {
                userAgentValue = process.env.USER_AGENT;
            }
            else {
                throw new Error('The USER_AGENT environment variable for the Snoowrap Reddit Client is not set.');
            }
            const reddit_client = new Snoowrap({
                userAgent: userAgentValue,
                clientId: process.env.REDDIT_CLIENT_ID,
                clientSecret: process.env.REDDIT_CLIENT_SECRET,
                username: process.env.REDDIT_USERNAME,
                password: process.env.REDDIT_PASSWORD
            });
            // getJobPostsForSubreddit(reddit_client, 'scala', searchOptionsScalaJobs, scalaJobThreadFilter);
            const scalaJobRecords = (yield (0, getJobPostsForSubreddit_1.default)(reddit_client, 'scala', searchOptionsScalaJobs, scala_1.default)).flat();
            yield prisma.job.createMany({
                data: scalaJobRecords,
                skipDuplicates: true
            });
            const reactJSJobRecords = (yield (0, getJobPostsForSubreddit_1.default)(reddit_client, 'reactjs', searchOptionsReactJSJobs, reactJS_1.default)).flat();
            yield prisma.job.createMany({
                data: reactJSJobRecords,
                skipDuplicates: true
            });
            // const reactRecords = await prisma.job.findMany({
            //   where: {
            //     fromSubreddit: {
            //       equals: 'react'
            //     }
            //   }
            // });
            // console.log(reactRecords);
            // const reactJSJobRecords = await getReactJSJobPosts(reddit_client, 'reactjs', searchOptionsReactJSJobs);
            //  console.log(reactJSJobRecords.length);
            // await prisma.job.createMany({
            //   data: reactJSJobRecords,
            //   skipDuplicates: true
            // });
            // console.log('original date: ', results[results.length - 1].date);
            // console.log('converted to local time date: ', utcToZonedTime(results[results.length - 1].date, timezone))
            // const scalaJobRecords = await Promise.all(results.map(async (jobPosting) => {
            //   const newScalaJob = await prisma.job.create({
            //     data: {
            //       fromSubreddit: jobPosting.fromSubreddit,
            //       datePosted: jobPosting.datePosted,
            //       jobPostingDetails: jobPosting.jobPostingDetails,
            //       url: jobPosting.url
            //     }
            //   })
            // }));
            // console.log('lets check out all the scala job records: ', scalaJobRecords);
            // const results2 = await getReactJSJobPosts(reddit_client, 'reactjs', searchOptionsReactJSJobs);
            // console.log('react results: ', results2);
        }
        catch (err) {
            console.log('caught an error: ', err);
        }
    });
}
exports.default = fetchJobs;
fetchJobs();
// A = fetchJobs
// B = scala
// fetchJobs imports scala's scraper function, scala imports fetchJob's Snoowrap type?
