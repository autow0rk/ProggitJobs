import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { JobPosting } from "../types/JobPosting";

interface Props {
    searchBody: string
    setSearchBody: Dispatch<SetStateAction<string>>
}

const SearchBody: FC<Props> = ({searchBody, setSearchBody}) => {

    const [userSearchInput, setUserSearchInput] = useState<string>('');

    function filterJobsByBody(userInput: string){
        setSearchBody(userInput);
    }

    function test(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        filterJobsByBody(userSearchInput);
    }

    function updateUserInput(e: ChangeEvent<HTMLInputElement>){
        setUserSearchInput(e.target.value);
    }
   
return (
    <>
     {/* <div className="flex flex-col justify-center items-center w-full"> */}
     <div className="flex flex-col items-center justify-center">
     <label className="font-bold text-3xl" htmlFor="searchBody">Search</label>
     </div>
        
        {/* <div className="bg-yellow-500 flex flex-col items-center justify-center w-1/2 h-20 max-h-80">        */}
        <form className="mt-2 flex flex-col items-center justify-center w-full h-16 max-h-80" onSubmit={test}>
        <input onChange={updateUserInput} value={userSearchInput} className="bg-[#FFFFF7] text-2xl font-bold px-2 rounded-lg border-2 w-1/2 h-full" type="text" id="searchBody"/>
        </form>
        {/* </div> */}
       
        
     {/* </div> */}
    </>
);
}

export default SearchBody;