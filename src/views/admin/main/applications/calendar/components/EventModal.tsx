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
  Textarea,
  Tag,
  TagLabel,
  Text,
  Box,
  HStack,
} from '@chakra-ui/react';
import { CustomEvent, TaskCategory, RobotType } from './types/types';
import TimeSelect from './TimeSelect';
import HorizontalDraggableLists from './Draggabletags';
import { IoIosAddCircleOutline } from "react-icons/io";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CustomEvent) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  // Form state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStartDate, setNewEventStartDate] = useState('');
  const [startTimeHour, setStartTimeHour] = useState('--');
  const [startTimeMinute, setStartTimeMinute] = useState('--');
  const [startTimePeriod, setStartTimePeriod] = useState('--');
  const [newEventEndDate, setNewEventEndDate] = useState('');
  const [eventType, setEventType] = useState<TaskCategory>(TaskCategory.Cleaning_Task);
  const [robotType, setRobotType] = useState<RobotType>(RobotType.Robot_A);
  const [newEventDescription, setNewEventDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [endTimeHour, setEndTimeHour] = useState('--');
  const [endTimeMinute, setEndTimeMinute] = useState('--');
  const [endTimePeriod, setEndTimePeriod] = useState('--');

  // Zone modal state and selected zones
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const openZoneModal = () => setIsZoneModalOpen(true);
  const closeZoneModal = () => setIsZoneModalOpen(false);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  // Handlers for time and form data
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

  const handleEndTimeHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTimeHour(e.target.value);
  };

  const handleEndTimeMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTimeMinute(e.target.value);
  };

  const handleEndTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTimePeriod(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventEndDate(e.target.value);
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

  const isFormIncomplete = !newEventTitle || !newEventStartDate || !startTimeHour || !startTimeMinute || !newEventEndDate;

  const handleAddEvent = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newEventTitle) newErrors.title = 'Task name is required.';
    if (!newEventStartDate) newErrors.startDate = 'Start date is required.';
    if (!newEventEndDate) newErrors.endDate = 'End date is required.';

    if ([startTimeHour, startTimeMinute, startTimePeriod].includes('--')) {
      newErrors.startTime = 'Please select a start time.';
    }

    if ([endTimeHour, endTimeMinute, endTimePeriod].includes('--')) {
      newErrors.endTime = 'Please select an end time.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convert start time
    let hour = parseInt(startTimeHour, 10);
    if (startTimePeriod === 'PM' && hour !== 12) hour += 12;
    if (startTimePeriod === 'AM' && hour === 12) hour = 0;
    const hourString = hour.toString().padStart(2, '0');
    const startDateTime = new Date(`${newEventStartDate}T${hourString}:${startTimeMinute}`);

    // Convert end time
    let endHour = parseInt(endTimeHour, 10);
    if (endTimePeriod === 'PM' && endHour !== 12) endHour += 12;
    if (endTimePeriod === 'AM' && endHour === 12) endHour = 0;
    const endHourString = endHour.toString().padStart(2, '0');
    const endDateTime = new Date(`${newEventEndDate}T${endHourString}:${endTimeMinute}`);

    if (startDateTime >= endDateTime) {
      setErrors({ timeRange: 'Start time must be before end time.' });
      return;
    }

    setErrors({});
    const newEvent: CustomEvent = {
      id: Date.now(),
      title: newEventTitle,
      start: startDateTime,
      end: endDateTime,
      type: eventType,
      robotType,
      description: newEventDescription.trim() || undefined,
    };

    onAddEvent(newEvent);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewEventTitle('');
    setNewEventStartDate('');
    setNewEventEndDate('');
    setStartTimeHour('--');
    setStartTimeMinute('--');
    setStartTimePeriod('--');
    setEndTimeHour('--');
    setEndTimeMinute('--');
    setEndTimePeriod('--');
    setEventType(TaskCategory.Cleaning_Task);
    setRobotType(RobotType.Robot_A);
    setNewEventDescription('');
    setErrors({});
  };

  return (
    <>
      {/* Main Event Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={1} spacing={4}>
              {/* Task Name */}
              <FormControl isInvalid={!!errors.title}>
                <Flex direction="column" mb={4}>
                  <FormLabel>Task Name</FormLabel>
                  <Input
                    placeholder="Enter Your Task Name"
                    value={newEventTitle}
                    onChange={handleTitleChange}
                  />
                  {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
                </Flex>
              </FormControl>

              {/* Task Description */}
              <FormControl>
                <Flex direction="column" mb={4}>
                  <FormLabel>Task Description (Optional)</FormLabel>
                  <Textarea
                    placeholder="Enter Task Description"
                    value={newEventDescription}
                    onChange={handleDescriptionChange}
                    resize="vertical"
                  />
                </Flex>
              </FormControl>

              {/* Robot Type */}
              <FormControl>
                <Flex direction="column" mb={4}>
                  <FormLabel>Robot Type</FormLabel>
                  <Select value={robotType} onChange={handleEventRobotTypeChange}>
                    {Object.values(RobotType).map((robot) => (
                      <option key={robot} value={robot}>
                        {robot.charAt(0).toUpperCase() + robot.slice(1)}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </FormControl>

              {/* Task Category & Zone Selection */}
              <FormControl>
                <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
                  {/* Task Category */}
                  <FormControl>
                    <Flex direction="column" mb={4}>
                      <FormLabel>Task Category</FormLabel>
                      <Select value={eventType} onChange={handleEventTypeChange}>
                        {Object.values(TaskCategory).map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </FormControl>

                  {/* Add Zone Button */}
                  <Flex direction="column" justifyContent="flex-end" mb={4}>
                    <FormLabel>Zone Selection</FormLabel>
                    <Button
                      leftIcon={<IoIosAddCircleOutline />}
                      colorScheme="blue"
                      onClick={openZoneModal}
                    >
                      Add Zone
                    </Button>
                  </Flex>
                </SimpleGrid>

                </FormControl>

                {/* Display Selected Zones */}
                <Box mt={2}>
                  <FormLabel>Selected Zones</FormLabel>
                  <HStack wrap="wrap" spacing={2}>
                    {selectedZones.length > 0 ? (
                      selectedZones.map((zone) => (
                        <Tag key={zone} colorScheme="blue">
                          <TagLabel>{zone}</TagLabel>
                        </Tag>
                      ))
                    ) : (
                      <Text fontSize="sm" color="gray.500">
                        No zones selected
                      </Text>
                    )}
                  </HStack>
                </Box>


             

              {/* Start Date and Time */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isInvalid={!!errors.startDate}>
                  <Flex direction="column" mb={4}>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="date"
                      value={newEventStartDate}
                      onChange={handleStartDateChange}
                    />
                    {errors.startDate && <FormErrorMessage>{errors.startDate}</FormErrorMessage>}
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors.startTime}>
                  <Flex direction="column" mb={4}>
                    <FormLabel>Start Time</FormLabel>
                    <TimeSelect
                      valueHour={startTimeHour}
                      valueMinute={startTimeMinute}
                      valuePeriod={startTimePeriod}
                      onChangeHour={handleStartTimeHourChange}
                      onChangeMinute={handleStartTimeMinuteChange}
                      onChangePeriod={handleStartTimePeriodChange}
                    />
                    {errors.startTime && <FormErrorMessage>{errors.startTime}</FormErrorMessage>}
                  </Flex>
                </FormControl>
              </SimpleGrid>

              {/* End Date and Time */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isInvalid={!!errors.endDate}>
                  <Flex direction="column" mb={4}>
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="date"
                      value={newEventEndDate}
                      onChange={handleEndDateChange}
                    />
                    {errors.endDate && <FormErrorMessage>{errors.endDate}</FormErrorMessage>}
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors.endTime}>
                  <Flex direction="column" mb={4}>
                    <FormLabel>End Time</FormLabel>
                    <TimeSelect
                      valueHour={endTimeHour}
                      valueMinute={endTimeMinute}
                      valuePeriod={endTimePeriod}
                      onChangeHour={handleEndTimeHourChange}
                      onChangeMinute={handleEndTimeMinuteChange}
                      onChangePeriod={handleEndTimePeriodChange}
                    />
                    {errors.endTime && <FormErrorMessage>{errors.endTime}</FormErrorMessage>}
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

      {/* Zone Selection Modal */}
      <Modal isOpen={isZoneModalOpen} onClose={closeZoneModal} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Zone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HorizontalDraggableLists
              onSelectedChange={(zones) => setSelectedZones(zones.map((z) => z.label))}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" colorScheme="blue" onClick={closeZoneModal} mr="10px">
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                // You could add additional logic here if needed before closing
                closeZoneModal();
              }}
            >
              Add Zone
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventModal;
