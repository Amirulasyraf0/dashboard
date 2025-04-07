import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Icon,
  
  } from "@chakra-ui/react";
  import {
    MdCalendarToday,
    MdViewAgenda,
    MdViewModule,
    MdWork,
  } from "react-icons/md";
  import { View } from "react-big-calendar";
  import { ChevronDownIcon } from '@chakra-ui/icons';
  import { FaCalendarDay , FaCalendarWeek } from "react-icons/fa";
  import { MdOutlineCalendarMonth } from "react-icons/md";
  import { FaCalendarDays } from "react-icons/fa6";



  
  const viewIcons: Record<View, JSX.Element> = {
    day: <Icon as={FaCalendarDay} boxSize={4}  mr={2} />,
    week: <Icon as={FaCalendarWeek} boxSize={4}  mr={2} />,
    month: <Icon as={FaCalendarDays} boxSize={4}  mr={2} />,
    work_week: <Icon as={MdWork} boxSize={4}  mr={2} />,
    agenda: <Icon as={MdViewAgenda} boxSize={4}  mr={2} />,
  };
  
  const viewOptions: View[] = ["day", "week", "month"]; // Limit to what you're using


  
  type CustomToolbarProps = {
    view: View;
    onView: (view: View) => void;
  };
  
  const CustomViewSelector = ({ view, onView }: CustomToolbarProps) => {
    return (
        <Menu >
        <MenuButton as={Button} size="md" bg='teal' color="white" rightIcon={<ChevronDownIcon />} >
          {viewIcons[view]} {view.charAt(0).toUpperCase() + view.slice(1)}
        </MenuButton>
        <MenuList minW="200px" zIndex="popover">
          {viewOptions.map((v) => (
            <MenuItem key={v} onClick={() => onView(v)} >
              {viewIcons[v]} {v.charAt(0).toUpperCase() + v.slice(1)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  };
  
  export default CustomViewSelector;
  