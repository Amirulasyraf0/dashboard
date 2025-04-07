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
} from '@chakra-ui/react';
import EventModal from './EventModal'; // Import EventModal component
import { CustomEvent, TaskCategory, TaskCategoryColors } from './types/types'; // Import types
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Tooltip } from 'react-tooltip';
import './calendar.css';
import { BsPlusCircleFill, BsFillTrashFill } from 'react-icons/bs';
import CustomToolbar from './CustomToolbar'; // Import CustomToolbar component

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);
  const [view, setView] = useState<View>('week');
  const [filterType, setFilterType] = useState<TaskCategory | 'All'>('All');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // New state for delete confirmation modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true); // Open delete modal
  const closeDeleteModal = () => setIsDeleteModalOpen(false); // Close delete modal

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const predefinedTasks: CustomEvent[] = [
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2025, 3, 4, 9, 0),
      end: new Date(2025, 3, 4, 9, 15),
      type: 'Cleaning_Task',
      robotType: 'RobotA',
    },
    {
      id: 2,
      title: 'Code Review',
      start: new Date(2025, 3, 4, 11, 0),
      end: new Date(2025, 3, 4, 12, 0),
      type: 'Daily Maintenance',
      robotType: 'RobotB',
    },
    {
      id: 3,
      title: 'Lunch Break',
      start: new Date(2025, 3, 4, 12, 30),
      end: new Date(2025, 3, 4, 13, 30),
      type: 'DailyMaintenance',
      robotType: 'RobotC',
    },
  ];

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
      closeDeleteModal(); // Close modal after deletion
    }
  };

  const filteredEvents =
    filterType === 'All' ? events : events.filter((event) => event.robotType === filterType);

  const bgColor = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('black', 'white');
  const todayBg = useColorModeValue('secondaryGray.900', '#2a4365');
  const toolbarTextColor = useColorModeValue('black', 'white');

  return (
    <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center">
      <Card width="100%" padding="20px" borderRadius="10px" bg={bgColor}>
        {/* Controls: Add + Filter */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Select
            width="200px"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as TaskCategory | 'All')}
          >
            <option value="All">All</option>
            <option value="robotA">Robot A</option>
            <option value="robotB">Robot B</option>
            <option value="robotC">Robot C</option>
          </Select>

          <Button w="140px" variant="brand" fontWeight="500" onClick={openModal} ml="auto">
            <Box mr="8px">
              <BsPlusCircleFill />
            </Box>
            Add Event
          </Button>
        </Box>

        {/* Calendar */}
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
          style={{ height: 800, marginTop: 20, 
            color: textColor,

            }}
          eventPropGetter={(event: CustomEvent) => ({
            style: {
              backgroundColor: TaskCategoryColors[event.type as TaskCategory],
              
              borderRadius: '15px',
              padding: '2px',
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
                ).format('hh:mm A')}\n ${event.title}`}
                data-tooltip-place="top"
                cursor="pointer"
                onClick={() => {
                  setSelectedEvent(event); // Set the selected event when clicked
                  openDeleteModal(); // Open the delete confirmation modal
                }}
              >
                {event.title}
                <Tooltip id={`event-tooltip-${event.id}`} />
              </Box>
            ),
          }}
          dayPropGetter={(date) => ({
            style: {
              backgroundColor: moment(date).isSame(moment(), 'day') ? todayBg : 'inherit',
            },
          })}
        />

        {/* Delete Event Modal */}
        {selectedEvent && (
          <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Are you sure you want to delete this event?</ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleDeleteEvent}>
                  Delete
                </Button>
                <Button variant="ghost" onClick={closeDeleteModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Card>

      <EventModal isOpen={isModalOpen} onClose={closeModal} onAddEvent={handleAddEvent} />
    </Box>
  );
};

export default MyCalendar;
