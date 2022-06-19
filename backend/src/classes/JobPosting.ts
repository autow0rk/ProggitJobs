export default class JobPosting {
    fromSubreddit: string;
    jobTitle: string;
    jobPostingDetails: string;
    datePosted: Date;
    monthYearPosted: string;
    url: string;
    constructor(fromSubreddit: string, jobTitle: string, jobPostingDetails: string, datePosted: Date, monthYearPosted: string, url: string){
        this.fromSubreddit = fromSubreddit;
        this.jobTitle = jobTitle;
        this.jobPostingDetails = jobPostingDetails;
        this.datePosted = datePosted;
        this.monthYearPosted = monthYearPosted;
        this.url = url;
    }
}