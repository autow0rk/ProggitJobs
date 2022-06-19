export type JobPosting = {
    fromSubreddit: string;
    jobTitle: string;
    jobPostingDetails: string;
    datePosted: Date;
    monthYearPosted: string;
    url: string;
     /*the dates for reddit comments are stored as POSIX timestamps
     (read more here: https://www.reddit.com/r/redditdev/comments/46g9ao/using_praw_to_call_reddit_api_need_help/)*/
    
}