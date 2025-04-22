import React, { useState } from 'react';
import {
  Box,
  HStack,
  Tag,
  TagLabel,
  Text,
  VStack,
  Heading,
} from '@chakra-ui/react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

const initialAvailable = [
  { id: 'tag-1', label: 'Zone A' },
  { id: 'tag-2', label: 'Zone B' },
  { id: 'tag-3', label: 'Zone C' },
  { id: 'tag-4', label: 'Zone D' },
];

const initialSelected = [
  { id: 'tag-5', label: 'Zone E' },
];

type Zone = {
  id: string;
  label: string;
};

type HorizontalDraggableListsProps = {
  onSelectedChange?: (zones: Zone[]) => void;
};

const HorizontalDraggableLists: React.FC<HorizontalDraggableListsProps> = ({ onSelectedChange }) => {
  const [available, setAvailable] = useState<Zone[]>(initialAvailable);
  const [selected, setSelected] = useState<Zone[]>(initialSelected);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceList = source.droppableId === 'available' ? [...available] : [...selected];
    const destList = destination.droppableId === 'available' ? [...available] : [...selected];
    const setSourceList = source.droppableId === 'available' ? setAvailable : setSelected;
    const setDestList = destination.droppableId === 'available' ? setAvailable : setSelected;

    const [movedItem] = sourceList.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, movedItem);
      setSourceList(sourceList);
      if (source.droppableId === 'selected' && onSelectedChange) {
        onSelectedChange(sourceList);
      }
    } else {
      destList.splice(destination.index, 0, movedItem);
      setSourceList(sourceList);
      setDestList(destList);
      if (destination.droppableId === 'selected' && onSelectedChange) {
        onSelectedChange(destList);
      } else if (source.droppableId === 'selected' && onSelectedChange) {
        onSelectedChange(sourceList);
      }
    }
  };

  return (
    <VStack spacing={6} align="stretch" p={6}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {[
          { id: 'available', title: 'Available Zones', items: available },
          { id: 'selected', title: 'Selected Zone Sequence', items: selected },
        ].map(({ id, title, items }) => (
          <Box key={id}>
            <Heading size="sm" mb={2}>
              {title}
            </Heading>
            <Droppable droppableId={id} direction="horizontal">
              {(provided) => (
                <HStack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  spacing={3}
                  border="1px dashed gray"
                  borderRadius="md"
                  p={3}
                  minHeight="70px"
                  flexWrap="wrap"
                >
                  {items.map((tag, index) => (
                    <React.Fragment key={tag.id}>
                      <Draggable draggableId={tag.id} index={index}>
                        {(provided, snapshot) => (
                          <Tag
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            variant="solid"
                            colorScheme="blue"
                            opacity={snapshot.isDragging ? 0.7 : 1}
                            cursor="grab"
                          >
                            <TagLabel>{tag.label}</TagLabel>
                          </Tag>
                        )}
                      </Draggable>

                      {id === 'selected' && index < items.length - 1 && (
                        <Text fontSize="lg" color="gray.500">
                          →
                        </Text>
                      )}
                    </React.Fragment>
                  ))}
                  {provided.placeholder}
                </HStack>
              )}
            </Droppable>
          </Box>
        ))}
      </DragDropContext>
    </VStack>
  );
};

export default HorizontalDraggableLists;
