"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reactJobThreadFilter(commentsInJobThread, jobThread) {
    const jobThreadId = jobThread.name;
    return commentsInJobThread.filter((comment) => {
        if (comment.collapsed == true) { // if the comment in the job thread is deleted, then filter it out
            return false;
        }
        return (comment.parent_id == jobThreadId && !comment.stickied); // filter only for comments on the job thread post, which are parent comments, and are therefore job posts. there is also always a stickied comment on ReactJS job threads which is not a job, so filter that out.
    });
}
exports.default = reactJobThreadFilter;
