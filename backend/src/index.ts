import express = require("express");
let app = express();
import {Request, Response} from 'express';
const snoowrap = require('snoowrap');
import { Listing, Submission } from 'snoowrap';
import fetchJobs from "./fetchJobs";
import { PrismaClient } from "@prisma/client";
import getSubredditFilters from './init';

const prisma = new PrismaClient();
const port = 5000;

let cors = require('cors');


// the Typescript server needs to send back a list of subreddits to filter by, to the React frontend.
// Since every client request will need the list of subreddit filter options, 
// we make a database request once (before the TS server starts),
// to get all the filters, and send that result back along with all the job data, instead of making a database request for EVERY single client request.



getSubredditFilters(prisma).then((subredditFilters) => {
    app.use(cors());
    console.log('i got the subreddit filters: ', subredditFilters);

    app.get('/', async (req:Request, res:Response) => {
        console.log('before getting jobs');
        await fetchJobs();
        console.log('results posted');
    });
    
    app.get('/allJobs', async (req:Request, res:Response) => {
        
        const jobs = await prisma.job.findMany();
    
    
        res.json({jobs, subredditFilters});
        
    });

    app.listen(port, () => {
        console.log(`listening to port ${port}`)
    });
});



