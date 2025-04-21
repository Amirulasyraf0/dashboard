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
  Textarea
} from '@chakra-ui/react';
import { CustomEvent, TaskCategory, RobotType } from './types/types';
import ZoneSelectionModal from './ZoneSelection';
import TimeSelect from './TimeSelect';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CustomEvent) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStartDate, setNewEventStartDate] = useState('');
  const [startTimeHour, setStartTimeHour] = useState('08');
  const [startTimeMinute, setStartTimeMinute] = useState('00');
  const [newEventEndDate, setNewEventEndDate] = useState('');
  const [newEventEndTime, setNewEventEndTime] = useState('');
  const [eventType, setEventType] = useState<TaskCategory>(TaskCategory.Cleaning_Task);
  const [robotType, setRobotType] = useState<RobotType>(RobotType.Robot_A);
  const [newEventDescription, setNewEventDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [startTimePeriod, setStartTimePeriod] = useState('AM');

  const handleStartTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTimePeriod(e.target.value);
  };


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventTitle(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventStartDate(e.target.value);
  };

  const handleStartTimeHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTimeHour(e.target.value);
  };

  const handleStartTimeMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTimeMinute(e.target.value);
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

  const handleEventRobotTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRobotType = e.target.value as RobotType;
    setRobotType(selectedRobotType);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewEventDescription(e.target.value);
  };

  const handleAddEvent = () => {
    if (!newEventTitle || !newEventStartDate || !startTimeHour || !startTimeMinute || !newEventEndDate || !newEventEndTime) {
      setError('All fields are required!');
      return;
    }

    let hour = parseInt(startTimeHour, 10);
    if (startTimePeriod === 'PM' && hour !== 12) {
      hour += 12;
    } else if (startTimePeriod === 'AM' && hour === 12) {
      hour = 0;
    }
  
    const hourString = hour.toString().padStart(2, '0');
    const startDateTime = new Date(`${newEventStartDate}T${hourString}:${startTimeMinute}`)


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
      robotType: robotType,
      description: newEventDescription.trim() || undefined, // optional field
    };

    onAddEvent(newEvent);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewEventTitle('');
    setNewEventStartDate('');
 
    setNewEventEndDate('');
    setNewEventEndTime('');
    setEventType(TaskCategory.Cleaning_Task);
    setRobotType(RobotType.Robot_A); // Reset robotType to default
    setNewEventDescription(''); // Reset description
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={1} spacing={4}>
            {/* Task Name */}
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

            {/* Task Description */}
            <FormControl isInvalid={!!error}>
              <Flex direction="column" mb={4}>
                <FormLabel>Task Description (Optional)</FormLabel>
                <Textarea
                  placeholder="Enter Task Description"
                  value={newEventDescription}
                  onChange={handleDescriptionChange}
                  resize="vertical"
                />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </Flex>
            </FormControl>

            {/* Task Category */}
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

            {/* Start Date and Time */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isInvalid={!!error}>
                <Flex direction="column" mb={4}>
                  <FormLabel>Start DateTime </FormLabel>
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
                  <FormLabel>Start Time </FormLabel>
                  <TimeSelect
  valueHour={startTimeHour}
  valueMinute={startTimeMinute}
  valuePeriod={startTimePeriod}
  onChangeHour={handleStartTimeHourChange}
  onChangeMinute={handleStartTimeMinuteChange}
  onChangePeriod={handleStartTimePeriodChange}
/>
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </Flex>
              </FormControl>
            </SimpleGrid>

            {/* End Date and Time */}
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

            {/* Robot Type */}
            <FormControl isInvalid={!!error}>
              <Flex direction="column" mb={4}>
                <FormLabel>Robot Type</FormLabel>
                <Select value={robotType} onChange={handleEventRobotTypeChange}>
                  {Object.values(RobotType).map((robot) => (
                    <option key={robot} value={robot}>
                      {robot.charAt(0).toUpperCase() + robot.slice(1)}
                    </option>
                  ))}
                </Select>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </Flex>
            </FormControl>
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
