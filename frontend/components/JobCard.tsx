import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
// import { JobPosting } from "../classes/JobPosting";
import JobPosting from '../classes/JobPosting';
const parse = require('html-react-parser');

interface Props {
    job: JobPosting;
    jobBody: (any)[] | string;
}
const JobCard: FC<Props> = ({job, jobBody}) => {
    // const [value, setValue] = useState(0);
    // function useForceUpdate(){
    //      // integer state
    //     setValue(value + 1); // update state to force render
    //     // An function that increment 👆🏻 the previous state like here 
    //     // is better than directly setting `value + 1`
    // }


    const [showViewMore, setShowViewMore] = useState<boolean>(false);
    const bodyTextClipped = useRef(null);

    function isClipped(){
        
    }

    // TODO: create a ref to the body details of the job post, and:
    // make the visibility hidden at first(so we can detect the line height of the html element, but without actually rendering it into the DOM), and then re-render the component and
    // detect the line height of 3 lines worth. if there are more than 3 lines,
    // clip the content, and insert a div in the job card, that says "Show More!"

    // useRef allows you to update an element in the DOM without causing a re-render, basically.
    
    // I have to conditionally render a div into the JobCard's "main" div, depending on how many lines of text are present
    // in the job body. To deal with this conditional rendering, I should:
    // 1) Create a ref to the job body text
    // 2) Make the job body html tag hidden, then calculate it's client height.
    // 3) Run a function to calculate whether or not a JobCards' body is more than 3 lines
    // 4) If it is, set the state value of shouldShowViewMore to true, re-render the JobCard, and conditionally render the click-down button depending on the state value of shouldShowViewMore

    // 5) If the user clicks the view more, then the original full length body of the job should show
    // Issue: How do I clip how many lines of text to show in the job body? the line-clamp utility does not work perfectly, so I need a way to only show 3 lines worth of text in the body html tag
    // Solution: Fix the height of the job body tag to be 3 lines worth, detect if there's an overflow, and if there is, show the "View more!" div

// console.log('current ref: ', bodyTextClipped.current)

    // useLayoutEffect(() => {
    //     console.log('current ref: ', window.getComputedStyle(bodyTextClipped.current).lineHeight);
    // }, []);

    // TODO: I want to make the height of the html tag that contains the job body content, a multiplier of the root element font size, to make the tag only contain X lines of text (assuming line-height is the same value as well). Issue is that I'm not sure how to scale with

    // const forceUpdate = useForceUpdate();

return (
   
    
    <div className="px-4 fadeIn">
        
        <div className="border-rounded rounded-md">
        <h1 className="bg-[#E3E3E3] px-4 py-2 rounded-t-md whitespace-nowrap overflow-hidden text-ellipsis">{job.jobTitle}</h1>
        <p ref={bodyTextClipped} className="bg-[#FDFDFD] text-base py-2 px-2 break-words">{parse(jobBody)}</p> {/*h-[4.5rem] overflow-hidden*/}
        <h2 className="bg-[#E3E3E3] px-4 py-2 rounded-b-md"><a href={job.url}>Original job post</a></h2>
        </div>
    </div>
    // <p>hello i am <strong className="bg-yellow-300">bruh</strong></p>
    // <p>{renderTest}</p>
)
}

export default JobCard;