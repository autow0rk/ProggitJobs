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
const express = require("express");
let app = express();
const snoowrap = require('snoowrap');
const fetchJobs_1 = __importDefault(require("./fetchJobs"));
const client_1 = require("@prisma/client");
const init_1 = __importDefault(require("./init"));
const prisma = new client_1.PrismaClient();
const port = 5000;
let cors = require('cors');
// the Typescript server needs to send back a list of subreddits to filter by, to the React frontend.
// Since every client request will need the list of subreddit filter options, 
// we make a database request once (before the TS server starts),
// to get all the filters, and send that result back along with all the job data, instead of making a database request for EVERY single client request.
(0, init_1.default)(prisma).then((subredditFilters) => {
    app.use(cors());
    console.log('i got the subreddit filters: ', subredditFilters);
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('before getting jobs');
        yield (0, fetchJobs_1.default)();
        console.log('results posted');
    }));
    app.get('/allJobs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield prisma.job.findMany();
        res.json({ jobs, subredditFilters });
    }));
    app.listen(port, () => {
        console.log(`listening to port ${port}`);
    });
});
