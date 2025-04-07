import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import { CustomEvent, TaskCategory, TaskCategoryColors } from './types/types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CustomEvent) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStartDate, setNewEventStartDate] = useState('');
  const [newEventStartTime, setNewEventStartTime] = useState('');
  const [newEventEndDate, setNewEventEndDate] = useState('');
  const [newEventEndTime, setNewEventEndTime] = useState('');
  const [eventType, setEventType] = useState<TaskCategory>(TaskCategory.Sweep); // Default to Sweep

  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventTitle(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventStartDate(e.target.value);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventStartTime(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventEndDate(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventEndTime(e.target.value);
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as TaskCategory;
    setEventType(selectedType);
  };

  const handleAddEvent = () => {
    if (
      !newEventTitle ||
      !newEventStartDate ||
      !newEventStartTime ||
      !newEventEndDate ||
      !newEventEndTime
    ) {
      setError('All fields are required!');
      return;
    }

    const startDateTime = new Date(`${newEventStartDate}T${newEventStartTime}`);
    const endDateTime = new Date(`${newEventEndDate}T${newEventEndTime}`);

    if (startDateTime >= endDateTime) {
      setError('Start time must be before end time.');
      return;
    }

    setError(null);
    const newEvent: CustomEvent = {
      id: Date.now(),
      title: newEventTitle,
      start: startDateTime,
      end: endDateTime,
      type: eventType,
      resource: eventType,
    };

    onAddEvent(newEvent);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewEventTitle('');
    setNewEventStartDate('');
    setNewEventStartTime('');
    setNewEventEndDate('');
    setNewEventEndTime('');
    setEventType(TaskCategory.Sweep); // Reset type to default
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={1} spacing={4}>

            
            {/* Row 1: Event Title */}
            <FormControl isInvalid={!!error}>
              <Flex direction="column" mb={4}>
                <FormLabel>Task Name</FormLabel>
                <Input
                  placeholder="Enter Your Task Name"
                  value={newEventTitle}
                  onChange={handleTitleChange}
                />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </Flex>
            </FormControl>

            {/* Row 2: Event Type (Category) */}
            <FormControl isInvalid={!!error}>
              <Flex direction="column" mb={4}>
                <FormLabel>Task Category</FormLabel>
                <Select value={eventType} onChange={handleEventTypeChange}>
                  {Object.values(TaskCategory).map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </Select>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </Flex>
            </FormControl>

            {/* Row 3: Start Date and Start Time */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isInvalid={!!error}>
                <Flex direction="column" mb={4}>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    value={newEventStartDate}
                    onChange={handleStartDateChange}
                  />
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!error}>
                <Flex direction="column" mb={4}>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="time"
                    value={newEventStartTime}
                    onChange={handleStartTimeChange}
                  />
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </Flex>
              </FormControl>
            </SimpleGrid>

            {/* Row 4: End Date and End Time */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isInvalid={!!error}>
                <Flex direction="column" mb={4}>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="date"
                    value={newEventEndDate}
                    onChange={handleEndDateChange}
                  />
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!error}>
                <Flex direction="column" mb={4}>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="time"
                    value={newEventEndTime}
                    onChange={handleEndTimeChange}
                  />
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </Flex>
              </FormControl>
            </SimpleGrid>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="blue" onClick={onClose} mr="10px">
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleAddEvent}>
            Add Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
