import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, SimpleGrid, Flex, Checkbox } from '@chakra-ui/react';
import { useDrag, useDrop } from 'react-dnd';
import { CustomEvent, TaskCategory, TaskCategoryColors, RobotType } from './types/types';

interface ZoneSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectZones: (selectedZones: string[]) => void;
}

const availableZones = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];

const ZoneSelectionModal: React.FC<ZoneSelectionModalProps> = ({ isOpen, onClose, onSelectZones }) => {
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  const handleSelectZone = (zone: string) => {
    setSelectedZones(prev => {
      if (prev.includes(zone)) {
        return prev.filter(item => item !== zone);
      } else {
        return [...prev, zone];
      }
    });
  };

  const handleSave = () => {
    onSelectZones(selectedZones);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Zones</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={1} spacing={4}>
            <FormControl>
              <FormLabel>Select Zones</FormLabel>
              {availableZones.map((zone) => (
                <Flex key={zone} align="center" mb={2}>
                  <Checkbox
                    isChecked={selectedZones.includes(zone)}
                    onChange={() => handleSelectZone(zone)}
                  >
                    {zone}
                  </Checkbox>
                </Flex>
              ))}
            </FormControl>
            <FormControl>
              <FormLabel>Sorted Zones</FormLabel>
              <ZoneList zones={selectedZones} />
            </FormControl>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="blue" onClick={onClose} mr="10px">
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save Zones
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface ZoneListProps {
  zones: string[];
}

const ZoneList: React.FC<ZoneListProps> = ({ zones }) => {
  const [, drop] = useDrop({
    accept: 'zone',
    drop: (item: any) => moveZone(item.index, item.zone),
  });

  const moveZone = (index: number, zone: string) => {
    const updatedZones = [...zones];
    updatedZones.splice(index, 1);
    updatedZones.push(zone);
    console.log(updatedZones);
  };

  return (
    <div ref={drop}>
      {zones.map((zone, index) => (
        <ZoneItem key={zone} index={index} zone={zone} />
      ))}
    </div>
  );
};

interface ZoneItemProps {
  zone: string;
  index: number;
}

const ZoneItem: React.FC<ZoneItemProps> = ({ zone, index }) => {
  const [, drag] = useDrag({
    type: 'zone',
    item: { zone, index },
  });

  return (
    <div ref={drag} style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '8px', cursor: 'move' }}>
      {zone}
    </div>
  );
};

export default ZoneSelectionModal;
