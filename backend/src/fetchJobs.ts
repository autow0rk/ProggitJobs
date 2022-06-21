import Snoowrap = require("snoowrap");
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

  } catch (err) {
    console.log('caught an error: ', err)
  }

}