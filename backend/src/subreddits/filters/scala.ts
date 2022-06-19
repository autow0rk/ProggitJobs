import {Listing, Submission, Comment} from 'snoowrap'

function scalaJobThreadFilter(commentsInJobThread: Listing<Comment>, jobThread:Submission): Comment[] {
    const jobThreadId = jobThread.name; // the only job postings in the job thread, are the parent comments. if a comment has their parent comment's id == the job thread's name property(the name property represents the job thread's 'ID'), then it's a parent comment.
    return commentsInJobThread.filter((comment) => {
        if(comment.collapsed == true){ // if the comment in the job thread is deleted, then filter it out
            return false;
        }
        return (comment.parent_id == jobThreadId); // the only job postings in the job thread, are the parent comments. if a comment has their parent comment's id == the job thread's name property(the name property represents the job thread's 'ID'), then it's a parent comment.
    });
}

export default scalaJobThreadFilter;