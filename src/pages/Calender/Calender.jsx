import React from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import {events} from '../../data/dummy';
import { Header } from '../../components';


const Calender = () => {

const localizer = momentLocalizer(moment);



	return (
		 <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header  title="Calendar" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Calender",nav:"calendar"}]}  />

       <div style={{ height: 500 }}>
    <Calendar localizer={localizer} events={events}  />
  		</div>

		</div>
		)
}

export default Calender