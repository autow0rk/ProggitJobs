"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JobPosting {
    constructor(fromSubreddit, jobTitle, jobPostingDetails, datePosted, monthYearPosted, url) {
        this.fromSubreddit = fromSubreddit;
        this.jobTitle = jobTitle;
        this.jobPostingDetails = jobPostingDetails;
        this.datePosted = datePosted;
        this.monthYearPosted = monthYearPosted;
        this.url = url;
    }
}
exports.default = JobPosting;
