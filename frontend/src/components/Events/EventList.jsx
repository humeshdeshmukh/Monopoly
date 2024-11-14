// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import EventCard from './EventCard'; // Import the EventCard component

const EventList = ({ events }) => {
  // Assuming events is passed as a prop to this component
  const [filteredEvents, setFilteredEvents] = useState(events);

  // You can implement filtering logic here (e.g., by date, category)
  const filterEvents = (category) => {
    const filtered = events.filter((event) => event.category === category);
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    // If the events prop changes, update the filtered events
    setFilteredEvents(events);
  }, [events]);

  return (
    <div className="p-4">
      {/* Filter buttons */}
      <div className="mb-4">
        <button
          onClick={() => filterEvents('workshop')}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        >
          Workshops
        </button>
        <button
          onClick={() => filterEvents('tournament')}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Tournaments
        </button>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No events found.</p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

// Define PropTypes
EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventList;
