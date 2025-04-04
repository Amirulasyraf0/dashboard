import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Button, Card, useColorModeValue, IconButton , Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverHeader} from '@chakra-ui/react';
import EventModal from './EventModel'; // Import EventModal component
import { CustomEvent, TaskCategory, TaskCategoryColors } from './types/types'; // Import TaskCategory and TaskCategoryColors
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { BsPlusCircleFill, BsFillTrashFill } from 'react-icons/bs';


// Initialize moment localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<CustomEvent[]>([]); // State for events
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null); // To store selected event for deletion

  const openModal = () => setIsModalOpen(true);  // Function to open modal
  const closeModal = () => setIsModalOpen(false); // Function to close modal

  // Add event to the events array
  const handleAddEvent = (event: CustomEvent) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  // Handle deleting event
  const handleDeleteEvent = (eventToDelete: CustomEvent) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event !== eventToDelete));
  };

  // Chakra UI color mode values
  const bgColor = useColorModeValue('white', 'navy.900');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const todayBg = useColorModeValue('secondaryGray.900', '#2a4365');

  return (
    <Box width="100%" display="flex" alignItems="center">
      <Card width="100%" padding="20px" borderRadius="10px" bg={bgColor}>
        <Button me="auto" w="140px" variant="brand" fontWeight="500" onClick={openModal}>
          <Box mr="8px">
            <BsPlusCircleFill />
          </Box>
          Add Event
        </Button>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          style={{ height: 800, marginTop: 20, color: textColor }}
          eventPropGetter={(event: CustomEvent) => ({
            style: {
              backgroundColor: TaskCategoryColors[event.type as TaskCategory], // Apply color based on the task category
              color: 'white',
              borderRadius: '4px',
              padding: '4px',
            },
            title: event.start,
            description: event.type 
          })}
          onSelectEvent={(event: CustomEvent) => setSelectedEvent(event)} // Set the selected event for deletion
          dayPropGetter={(date) => ({
            style: {
              backgroundColor: moment(date).isSame(moment(), 'day') ? todayBg : 'inherit',
            },
          })}
        />



      </Card>

      <EventModal isOpen={isModalOpen} onClose={closeModal} onAddEvent={handleAddEvent} />
    </Box>
  );
};

export default MyCalendar;
