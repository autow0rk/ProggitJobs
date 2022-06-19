import { Dispatch, FC, SetStateAction } from "react";
import { JobPosting } from "../types/JobPosting";
import SearchTitle from "./SearchTitle";
import SearchBody from './SearchBody'

interface Props {
    searchBody: string,
    setSearchBody: Dispatch<SetStateAction<string>>
    // jobs: JobPosting[] | null;
    // setFilteredJobs: Dispatch<SetStateAction<JobPosting[] | null>>
}

const Search: FC<Props> = ({searchBody, setSearchBody}) => {
return (
    <>
    <SearchBody searchBody={searchBody} setSearchBody={setSearchBody}/>
    </>
)
}

export default Search;