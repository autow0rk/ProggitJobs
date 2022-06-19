// const snoowrap = require('snoowrap');
// import {Snoowrap} from 'snoowrap';
import Snoowrap = require("snoowrap");
// import getScalaJobPosts from './subreddits/scala'
// import getReactJSJobPosts from "./subreddits/reactJS";
import scalaJobThreadFilter from "./subreddits/filters/scala";
import reactJobThreadFilter from "./subreddits/filters/reactJS";
import { SearchOptions } from "snoowrap";
import { PrismaClient } from ".prisma/client";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import JobPosting from "./classes/JobPosting";
import getJobPostsForSubreddit from "./subreddits/getJobPostsForSubreddit";
import 'dotenv/config'

export default async function fetchJobs(){ // a script to be run periodically by a cron job to fetch new job postings in programming related subreddits
  const prisma = new PrismaClient();

  const searchOptionsScalaJobs : SearchOptions = {
    query: 'Monthly /r/Scala Job Postings Thread',
    restrictSr: true,
    time: 'all',
    //time: 'month',
    limit:3
}
const searchOptionsReactJSJobs : SearchOptions = {
  query: 'Who\'s Hiring?',
  restrictSr: true,
  time: 'all',
  //time: 'month',
  limit:3
}




  try { // if there's any issues in making our Reddit client or making Reddit API calls, we want to fail gracefully. We don't want some obscure error taking down the whole server, so we wrap the Reddit API logic in a try block.
    let userAgentValue: string;
    if(process.env.USER_AGENT) {
      userAgentValue = process.env.USER_AGENT;
    } else {
      throw new Error('The USER_AGENT environment variable for the Snoowrap Reddit Client is not set.');
    }
    const reddit_client:Snoowrap = new Snoowrap({
      userAgent: userAgentValue,
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD
    });
    // getJobPostsForSubreddit(reddit_client, 'scala', searchOptionsScalaJobs, scalaJobThreadFilter);
    const scalaJobRecords = (await getJobPostsForSubreddit(reddit_client, 'scala', searchOptionsScalaJobs, scalaJobThreadFilter)).flat();
      await prisma.job.createMany({
        data: scalaJobRecords,
        skipDuplicates: true
      });

    

    const reactJSJobRecords = (await getJobPostsForSubreddit(reddit_client, 'reactjs', searchOptionsReactJSJobs, reactJobThreadFilter)).flat();
    await prisma.job.createMany({
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
  } catch (err) {
    console.log('caught an error: ', err)
  }

}


fetchJobs();
// A = fetchJobs
// B = scala

// fetchJobs imports scala's scraper function, scala imports fetchJob's Snoowrap type?