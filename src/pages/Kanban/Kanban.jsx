import React,{useState} from 'react'
import { Header } from '../../components';
import './event.css';
import './task.css';
import { useMemo, useCallback, useEffect } from 'react';
import EventBar from '../../components/Kanban/EventBar';
import TaskBox from '../../components/Kanban/TaskBox';

// import Board from 'react-trello';

const Kanban = () => {

const initEvent = useMemo(() => [
    {
      title: 'Add a new Event',
      ['To do']: [],
      ['In progress']: [],
      ['Completed']: [],
    },
  ], []);

  const [events, setEvents] = useState(() => {
    return localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : initEvent;
  });

  const [currentEvent, setCurrentEvent] = useState(events[0]);

  const updateEvents = useCallback(async () => {
    try {
      if (!events.length) {
        await localStorage.setItem('events', JSON.stringify(initEvent));
        setEvents(JSON.parse(localStorage.getItem('events')));
      } else {
        await localStorage.setItem('events', JSON.stringify(events));
      }
    } catch (e) {
      console.error('Failed to modify events!');
    }
  }, [events]);

  // Set localStorage
  useEffect(() => {
    updateEvents();
  }, [events]);




	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
   <Header  title="Kanban" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Kanban",nav:"Kanban"}]} />
    <div className='App'>
      {/*<EventBar
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      />*/}
      <TaskBox
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      />
    </div>
   
    </div>
		)
}

export default Kanban