// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto mb-6">
      {/* Event Image */}
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover object-center"
      />

      <div className="p-4">
        {/* Event Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>

        {/* Event Description */}
        <p className="text-gray-600 text-sm mb-4">{event.description}</p>

        {/* Event Date & Time */}
        <div className="flex justify-between text-gray-500 text-xs mb-4">
          <span>{new Date(event.date).toLocaleDateString()}</span>
          <span>{new Date(event.time).toLocaleTimeString()}</span>
        </div>

        {/* Call to Action Button */}
        <button
          onClick={() => alert(`You clicked on: ${event.title}`)} // Add event handler
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Attend Event
        </button>
      </div>
    </div>
  );
};

// Prop validation
EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired, // Ensure it's a valid date string
    time: PropTypes.string.isRequired, // Ensure it's a valid time string
  }).isRequired,
};

export default EventCard;
