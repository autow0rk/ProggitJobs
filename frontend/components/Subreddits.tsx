import React, {FC, useState} from 'react';
import { JobPosting } from '../types/JobPosting';

interface Props {
    subredditFilters: string[],
    setSubredditFilters: React.Dispatch<React.SetStateAction<string[]>>
}

const Subreddits: FC<Props> = ({subredditFilters, setSubredditFilters}) => {

    // console.log('the recieved subreddit filters: ', subredditFilters);

    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [selectedSubredditsToFilter, setSelectedSubredditsToFilter] = useState<string[]>([]);

    function toggleDropdown() {
        setIsClicked(!isClicked);
    }

    function dropdownSymbol(){
        if(isClicked){  
            return "▼";
        } else {
            return "►";
        }
    }

    function filterForSubreddit(e: React.ChangeEvent<HTMLInputElement>): void{
        if (e.target.checked) {
            const updatedSubredditFilters = [...selectedSubredditsToFilter, e.target.value]
            setSelectedSubredditsToFilter(updatedSubredditFilters)
            setSubredditFilters(updatedSubredditFilters);
        } else {
            const updatedSubredditFilters = selectedSubredditsToFilter.filter((subredditName) => subredditName != e.target.value)
            setSelectedSubredditsToFilter(updatedSubredditFilters);
            setSubredditFilters(updatedSubredditFilters);
        }
    
    }

    function showSubredditNames(): JSX.Element[] | null{

        if(isClicked){
            return subredditFilters.map(subredditFilter => {
                return (<label className="font-medium text-xl" key={subredditFilter}>
                    <input type="checkbox" onChange={filterForSubreddit} className="pl-2 mr-1.5" value={subredditFilter}/>
                    {"r/"+subredditFilter}
                </label>);
            })
        } else {
            return null;
        }
        
    }
        return (
            <div>
            <div className="text-left pl-2 gap-x-2 flex flex-row justify-center items-center">
                <h1 className="text-2xl font-medium">Subreddits</h1>
                <button onClick={toggleDropdown}>{dropdownSymbol()}</button>
            </div>
  
            <div className=" pl-2 flex flex-row gap-x-2 justify-center items-center">
                {showSubredditNames()}
            </div>
            </div>
        )
    }
    
    export default Subreddits;