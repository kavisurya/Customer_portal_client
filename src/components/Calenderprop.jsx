import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useGlobalContext } from '../contexts/context2';



const Calendarprop = () => {

    const {setDate,date} = useGlobalContext();

	// const [date, setDate] = useState(new Date());
	const onDateChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);
}


	return (

		<Calendar
          onChange={onDateChange}
          value={date}
          showNeighboringMonth={false}
          selectRange={true}
        />


		)
} 


export default Calendarprop