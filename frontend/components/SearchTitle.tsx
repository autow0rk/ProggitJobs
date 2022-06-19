import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { JobPosting } from "../types/JobPosting";

interface Props {
    searchTitle: string
    setSearchTitle: Dispatch<SetStateAction<string>>
}

const SearchTitle: FC<Props> = ({searchTitle, setSearchTitle}) => {

    function filterJobsByTitle(e: ChangeEvent<HTMLInputElement>){
        setSearchTitle(e.target.value);
    }
   
return (
    <div className="flex flex-col px-80">
        <label htmlFor="searchTitle">Title Only</label>
        <input onChange={filterJobsByTitle} value={searchTitle} className="px-2" type="text" id="searchTitle"/>
    </div>
);
}

export default SearchTitle;