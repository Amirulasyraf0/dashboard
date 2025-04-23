import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  useColorModeValue,
  IconButton,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import EventModal from './EventModal';
import { CustomEvent, TaskCategory, TaskCategoryColors, ZoneType, RobotType } from './types/types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Tooltip } from 'react-tooltip';
import './calendar.css';
import { BsPlusCircleFill } from 'react-icons/bs';
import CustomToolbar from './CustomToolbar';
import { predefinedTasks } from './types/predefinedTasks';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';


const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
  const [view, setView] = useState<View>('week');
  const [filterType, setFilterType] = useState<TaskCategory | 'All'>('All');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  useEffect(() => {
    setEvents(predefinedTasks);
  }, []);

  const handleAddEvent = (event: Omit<CustomEvent, 'id'>) => {
    setEvents((prevEvents) => [...prevEvents, { ...event, id: Date.now() }]);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      closeDeleteModal();
    }
  };

  const filteredEvents =
    filterType === 'All' ? events : events.filter((event) => event.robotType === filterType);

  const bgColor = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('black', 'white');
  const todayBg = useColorModeValue('secondaryGray.900', '#2a4365');

  return (
    <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center">
      <Card width="100%" padding="20px" borderRadius="10px" bg={bgColor}>
        {/* Controls */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Select
            width="200px"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as TaskCategory | 'All')}
          >
            <option value="All">All</option>
            <option value="Robot A">Robot A</option>
            <option value="Robot B">Robot B</option>
            <option value="Robot C">Robot C</option>
          </Select>

          <Button w="140px" variant="brand" fontWeight="500" onClick={openModal} ml="auto">
            <Box mr="8px">
              <BsPlusCircleFill />
            </Box>
            Add Event
          </Button>
        </Box>

        <Calendar
  localizer={localizer}
  tooltipAccessor={null}
  step={15}
  events={filteredEvents}
  startAccessor="start"
  endAccessor="end"
  views={['month', 'week', 'day']}
  view={view}
  onView={handleViewChange}
  style={{
    height: 800,
    marginTop: 20,
    color: textColor,
  }}
  eventPropGetter={(event: CustomEvent) => ({
    style: {
      backgroundColor: TaskCategoryColors[event.type as TaskCategory],
      borderRadius: '4px',
      padding: '4px',
      color: 'white',
    },
  })}
  components={{
    toolbar: (props) => (
      <CustomToolbar {...props} onView={handleViewChange} view={view} />
    ),
    event: ({ event }: { event: CustomEvent }) => (
      <Box
        data-tooltip-id={`event-tooltip-${event.id}`}
        data-tooltip-content={`🕒 ${moment(event.start).format('hh:mm A')} - ${moment(
          event.end
        ).format('hh:mm A')}\n${event.title}\n\n${event.robotType}\n\n${event.zoneType}\n`}
        data-tooltip-place="bottom"
        onClick={() => {
          setSelectedEvent(event);
          openDeleteModal();
        }}
        cursor="pointer"
        position="relative"  // Make sure the event container is positioned
      >
           <Box  fontSize="10px">
      {event.title}
    </Box>
    <Box fontSize="10px" color="gray.100">
      {event.robotType} {event.zoneType}
    </Box>
        <Tooltip
      id={`event-tooltip-${event.id}`}
      style={{
        position: 'fixed',
        top: '50%',
        left: '20%',
        transform: 'translate(0%, 20%)',
        maxWidth: '500px',
        backgroundColor: '#1A202C',
        color: 'white',
        fontSize: '14px',
        padding: '8px 12px',
        borderRadius: '6px',
        zIndex: 9999,
      }}
    />
      </Box>
    ),
  }}
  dayPropGetter={(date) => ({
    style: {
      backgroundColor: moment(date).isSame(moment(), 'day') ? todayBg : 'inherit',
    },
  })}
/>

        {/* Delete Confirmation Modal */}
        {selectedEvent && (
          <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Event Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
  <Text mb="2">
    <strong>Event:</strong> {selectedEvent.title}
  </Text>
  <Text mb="2">
    <strong>Robot:</strong> {selectedEvent.robotType}
  </Text>
  <Text mb="2">
    <strong>Zone:</strong> {selectedEvent.zoneType}
  </Text>
  <Text>
    <strong>Time:</strong>{' '}
    {moment(selectedEvent.start).format('hh:mm A')} – {moment(selectedEvent.end).format('hh:mm A')}
  </Text>
</ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleDeleteEvent}>
                  Delete
                </Button>
                <Button  onClick={closeDeleteModal} variant='outline'>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Card>

      {/* Event Creation Modal */}
      <EventModal isOpen={isModalOpen} onClose={closeModal} onAddEvent={handleAddEvent} />
    </Box>
  );
};

export default MyCalendar;
