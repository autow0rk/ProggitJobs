import React, {FC, useState} from 'react';
import {format, getYear} from 'date-fns';

interface Props {
    monthsSelected: string[],
    setMonthsSelected: React.Dispatch<React.SetStateAction<string[]>>
}

const Months: FC<Props> = ({monthsSelected, setMonthsSelected}) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    // const [monthsSelected, setMonthsSelected] = useState<string[]>([]);
    const months = getPastThreeMonths();

    function getPastThreeMonths() { // get the month name of a month number, by creating a new Date() object, setting the month to the month number, then returning the formatted version of that Date (return the month's name only in the newly created and formatted Date object)
        let currentMonth = new Date().getMonth();
        let currentYear = getYear(new Date());
        let pastThreeMonths: string[] = []
        for(let i = 0; i <= 2; i++){
            const currentDate = new Date();
            currentDate.setMonth(currentMonth - i);
            pastThreeMonths.push(format(currentDate, 'MMMM') + ', ' + currentYear);
        }
        return pastThreeMonths;
    }

    function filterForMonth(e: React.ChangeEvent<HTMLInputElement>): void{
        if (e.target.checked) {
            setMonthsSelected([...monthsSelected, e.target.value]);
        } else {
            setMonthsSelected(monthsSelected.filter((month) => month != e.target.value));
        }

    }


    function showMonthNames(months: string[]){
        if(isClicked){
            return months.map(month => {
                return (<label className="font-medium text-xl" key={month}>
                    <input type="checkbox" onChange={filterForMonth} className="pl-2 mr-1.5" value={month}/>
                    {month}
                </label>);
            })
        } else {
            return null;
        }
        
    }

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
    return (
        <div>

<div className="text-left pl-2 gap-x-2 flex flex-row justify-center items-center">
        <h1 className="text-2xl font-medium">Months</h1>
        <button onClick={toggleDropdown}>{dropdownSymbol()}</button>
        </div>
        <div className=" pl-2 flex flex-row gap-x-2 justify-center items-center">
            {showMonthNames(months)}
        </div>

        </div>
        
    )
}

export default Months;