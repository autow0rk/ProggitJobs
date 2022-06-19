import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import { JobPosting } from '../types/JobPosting';
import Months from './Months';
import Search from './Search';
import Subreddits from './Subreddits';


interface Props {
    searchBody: string,
    setSearchBody: React.Dispatch<SetStateAction<string>>
    monthsSelected: string[],
    setMonthsSelected: React.Dispatch<React.SetStateAction<string[]>>,
    subredditFilters: string[],
    setSubredditFilters: Dispatch<SetStateAction<string[]>>
}


const Filter: FC<Props> = ({monthsSelected, setMonthsSelected, subredditFilters, setSubredditFilters, searchBody, setSearchBody}) => {
    // setSubredditFilters(['hi'])
    return (
        <>
        <Search searchBody={searchBody} setSearchBody={setSearchBody}/>

        <Months monthsSelected={monthsSelected} setMonthsSelected={setMonthsSelected}/>
   
        <Subreddits subredditFilters={subredditFilters} setSubredditFilters={setSubredditFilters}/>

            </>

        // <div className="bg-blue-500 flex flex-col">

        //     <div className="border-rose-500 bg-yellow-500">

            

            
        //     </div>
            
            
        //     <h1>example text</h1>
              
           
        // </div>
    )
}

export default Filter;