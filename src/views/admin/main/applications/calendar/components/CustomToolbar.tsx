import React from "react";
import { ToolbarProps, View } from "react-big-calendar";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import CustomViewSelector from "./CustomViewSelector"; // <-- Import here
import { CustomEvent } from "./types/types"; // Your custom event type
import { BsPlusCircleFill, BsFillTrashFill } from 'react-icons/bs';




const CustomToolbar: React.FC<ToolbarProps<CustomEvent, object>> = ({
  label,
  onNavigate,
  onView,
  view,
}) => {

    const toolbarTextColor = useColorModeValue("black", "white");
    const toolbarBorderColor = useColorModeValue("grey.500", "grey.500");
    const buttonColor = useColorModeValue("teal", "gray");


  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="10px"
      background="transparent"
      color={toolbarTextColor}
      borderWidth={1}
      borderColor={toolbarBorderColor} 
      borderRadius="5px"
      mb='12px'
    >
      {/* Navigation Buttons */}
      <Box display="flex" alignItems="center">

        <Button onClick={() => onNavigate("PREV")} mr="2" colorScheme={buttonColor} variant='solid'>
          ◀ Prev
        </Button>

        <Button onClick={() => onNavigate("NEXT")} mr="2" colorScheme={buttonColor} variant='solid' >
          Next ▶
        </Button>
      </Box>
      <Box fontWeight="bold" mr="4">
          {label}
        </Box>

      {/* Custom View Selector with Icons */}
      <CustomViewSelector view={view} onView={onView}  />
    </Box>
  );
};

export default CustomToolbar;
