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
  Radio,
  Tag,
  TagLabel,
  Text,
  Box,
  HStack,
  Icon,
  useRadioGroup,
} from '@chakra-ui/react';
import { CustomEvent, TaskCategory, RobotType, ZoneType} from './types/types';
import TimeSelect from './TimeSelect';
import HorizontalDraggableLists from './Draggabletags';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaArrowsRotate } from "react-icons/fa6";
import { CheckboxCard } from './RecurringOption';
import { WeekdaySelector } from './WeeklySelector'

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
  const [zoneType, setZoneType] = useState<ZoneType>(ZoneType.Zone_A);
  const options = ['react', 'vue', 'svelte']


  const [newEventDescription, setNewEventDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [endTimeHour, setEndTimeHour] = useState('--');
  const [endTimeMinute, setEndTimeMinute] = useState('--');
  const [endTimePeriod, setEndTimePeriod] = useState('--');
  const [recurrence, setRecurrence] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');
  const [repeatUntil, setRepeatUntil] = useState('');
  
  // Zone modal state and selected zones
  const [isRecurrModalOpen, setIsRecurrModalOpen] = useState(false);
  const openRecurrModal = () => setIsRecurrModalOpen(true);
  const closeRecurrModal = () => setIsRecurrModalOpen(false);
  //const [selectedZones, setSelectedZones] = useState<string[]>([]);
  //const [zone, setZone] = useState('');

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

  const handleEventZoneTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedzoneType = e.target.value as ZoneType;
    setZoneType(selectedzoneType);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewEventDescription(e.target.value);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })

  const isFormIncomplete = !newEventTitle || !newEventStartDate || !startTimeHour || !startTimeMinute || !newEventEndDate;

  const zoneOptions = ['Zone A', 'Zone B', 'Zone C'];

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
      zoneType,
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
            <Text fontSize="lg" fontWeight="bold">Task Info</Text>
              {/* Task Name */}
              <FormControl isInvalid={!!errors.title}>
                <Flex direction="column" mb={1}>
                  <FormLabel>Task Name</FormLabel>
                  <Input
                    placeholder="Enter Your Task Name"
                    value={newEventTitle}
                    onChange={handleTitleChange}
                  />
                  {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
                </Flex>
              </FormControl>

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

             {/* Robot Type && Zone Selection */}
          
                <SimpleGrid columns={{ base: 2, md: 2 }} spacing={2}>
              

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



                  {/* Add Zone Button */}
                  <FormControl>
                <Flex direction="column" mb={4}>
                  <FormLabel>Select Zone</FormLabel>
                  <Select value={zoneType} onChange={handleEventZoneTypeChange}>
                    {Object.values(ZoneType).map((zone) => (
                      <option key={zone} value={zone}>
                        {zone.charAt(0).toUpperCase() + zone.slice(1)}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </FormControl>

              </SimpleGrid>

              <Flex justify="space-between" px="1px"   >
        <Text
          fontSize="xl"
          fontWeight="600"
          lineHeight="100%"
        >
        Scheduling Details
        </Text>
        <Button

          leftIcon={<FaArrowsRotate />} colorScheme='pink' variant='solid'
          onClick={openRecurrModal}

        >
          Make Recurring
        </Button>
      </Flex>
             
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

                <FormControl>
  <FormLabel>Repeat</FormLabel>
  <Select value={recurrence} onChange={(e) => setRecurrence(e.target.value as any)}>
    <option value="none">None</option>
    <option value="daily">Daily</option>
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
  </Select>
</FormControl>

{recurrence !== 'none' && (
  <FormControl mt={4}>
    <FormLabel>Repeat Until</FormLabel>
    <Input
      type="date"
      value={repeatUntil}
      onChange={(e) => setRepeatUntil(e.target.value)}
    />
  </FormControl>
)}
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

      {/* Recurr Selection Modal  */}
      <Modal isOpen={isRecurrModalOpen} onClose={closeRecurrModal} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Recurrence</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
  
            <WeekdaySelector />
 

          </ModalBody>
          <ModalFooter>
            <Button variant="outline" colorScheme="blue" onClick={closeRecurrModal} mr="10px">
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
             
                closeRecurrModal();
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
