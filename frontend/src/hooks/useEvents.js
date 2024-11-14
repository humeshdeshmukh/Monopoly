import { useState } from 'react';

const useEvents = () => {
  // State to hold the list of game events
  const [events, setEvents] = useState([]);

  // Function to log a new event
  const logEvent = (message) => {
    const timestamp = new Date().toLocaleTimeString(); // Get the current time
    const newEvent = { message, timestamp };
    setEvents((prevEvents) => [newEvent, ...prevEvents]); // Add the new event to the top of the list
  };

  // Function to clear all events
  const clearEvents = () => {
    setEvents([]); // Reset the events state
  };

  // Return the events and event logging functions
  return {
    events,
    logEvent,
    clearEvents,
  };
};

export default useEvents;
