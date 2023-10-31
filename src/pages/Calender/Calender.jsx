import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Header } from '../../components';
import { Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CalendarApp = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventPriority, setEventPriority] = useState('medium');

  useEffect(() => {
    const savedEvents = localStorage.getItem('CalendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const saveEventsToLocalStorage = (newEvents) => {
    localStorage.setItem('CalendarEvents', JSON.stringify(newEvents));
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDialog = () => {
    setSelectedEvent(null);
  };

  const confirmDeleteEvent = () => {
    const updatedEvents = events.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    setSelectedEvent(null);
  };

  const handleSubmit = () => {
    const newEvent = {
      title: eventName,
      start: startDate,
      end: endDate,
      priority: eventPriority,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
    closeModal();
  };

  const priorityColors = {
    high: '#f34242',
    medium: '#f1bb23',
    low: '#45c945',
  };

  const modalContentStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Calendar" bread={[{ value: "Dashboard", nav: "dashboard" }, { value: "Calendar", nav: "calendar" }]} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openModal}>
          Add Event
        </Button>
      </div>

      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          onSelectEvent={handleEventSelect}
          eventPropGetter={(event, start, end, isSelected) => {
            return {
              style: {
                backgroundColor: priorityColors[event.priority],
              },
            };
          }}
        />
      </div>

      <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <div style={modalContentStyle}>
            <TextField
              label="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Start Date"
              type="datetime-local"
              value={moment(startDate).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="End Date"
              type="datetime-local"
              value={moment(endDate).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                value={eventPriority}
                onChange={(e) => setEventPriority(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!selectedEvent} onClose={closeEventDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEventDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteEvent}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalendarApp;
