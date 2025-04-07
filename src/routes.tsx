import { Icon } from '@chakra-ui/react';
import {
  MdDashboard,
} from 'react-icons/md';


// Main Imports

import ApplicationsCalendar from 'views/admin/main/applications/calendar';


const routes = [
  // // --- Main pages ---
  {

        name: 'Applications',
        path: '/main/applications',
        icon: <Icon as={MdDashboard} width="20px" height="20px" color="teal" />,
        collapse: true,
        items: [
          {
            name: 'Cleaning Schedule',
            layout: '/admin',
            path: '/main/applications/calendar',
            exact: false,
            
            component: <ApplicationsCalendar />,
          },
        ],
    
   
  },
 ];

export default routes;
