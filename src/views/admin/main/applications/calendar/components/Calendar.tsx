// MyCalendar.tsx

import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import { Box, Button, Card } from "@chakra-ui/react"; 
import EventModal from "./EventModel"; 
import { CustomEvent } from "./types/types";
import "react-big-calendar/lib/css/react-big-calendar.css";  

// Set up moment localizer
const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<CustomEvent[]>([
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle adding new event
  const handleAddEvent = (event: CustomEvent) => {
    setEvents((prevEvents) => [...prevEvents, event]); // Add the new event to the list
  };

  return (
    <Box
      width="100%" 
      display="flex" 
      alignItems="center"
    >
      <Card
        width="100%" 
        padding="20px" 
        borderRadius="10px"
      >
       
        <Button me='auto' w='140px' variant='brand' fontWeight='500' onClick={openModal}>
          Add Event
        </Button>
        <Calendar
          defaultView="day"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}  // Only show Month, Week, and Day views (no Agenda)
          style={{ height: 600, marginTop: 20 }}
        />
      </Card>

      {/* Modal to add event */}
      <EventModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onAddEvent={handleAddEvent} 
      />
    </Box>
  );
};

export default MyCalendar;
