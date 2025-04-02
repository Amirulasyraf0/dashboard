// EventModal.tsx

import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button, Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"; 
import { CustomEvent } from "./types/types"; // Importing event type

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CustomEvent) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventStart, setNewEventStart] = useState<Date | null>(null);
  const [newEventEnd, setNewEventEnd] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);  // For error message

  // Handle change for the event title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventTitle(e.target.value);
  };

  // Handle change for the start datetime
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventStart(new Date(e.target.value));
  };

  // Handle change for the end datetime
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEventEnd(new Date(e.target.value));
  };

  const handleAddEvent = () => {
    // Validate input
    if (!newEventTitle || !newEventStart || !newEventEnd) {
      setError("All fields are required!");
      return;
    }

    // Clear error and create new event
    setError(null);
    const newEvent: CustomEvent = {
      title: newEventTitle,
      start: newEventStart,
      end: newEventEnd,
    };

    onAddEvent(newEvent); // Send event to parent
    onClose(); // Close modal after submitting
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!error}>
            <FormLabel>Event Title</FormLabel>
            <Input
              placeholder="Event Title"
              value={newEventTitle}
              onChange={handleTitleChange} // Use the handler function
              mb={4}
            />
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              value={newEventStart ? newEventStart.toISOString().slice(0, 16) : ""}
              onChange={handleStartChange} // Use the handler function
              mb={4}
            />
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              value={newEventEnd ? newEventEnd.toISOString().slice(0, 16) : ""}
              onChange={handleEndChange} // Use the handler function
              mb={4}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleAddEvent}>
            Add Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
