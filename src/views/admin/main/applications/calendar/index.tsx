/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Grid, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import { calendarData } from 'views/admin/main/applications/calendar/variables/calendar';
import EventCalendar from 'components/calendar/EventCalendar';
import Timeline from 'views/admin/main/applications/calendar/components/Timeline';
import Events from 'views/admin/main/applications/calendar/components/Events';
import MyCalendar from './components/Calendar';

export default function Default() {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	return (
		<Grid
			pt={{ base: '130px', md: '80px', xl: '80px' }}
			
			gap={{ base: '20px', xl: '20px' }}
			display={{ base: 'block', lg: 'grid' }}>

			<Card gridArea='1 / 1 / 1 / 1' minH='680px'>


				<MyCalendar  />
			</Card>
		</Grid>
	);
}


//<EventCalendar initialDate='2022-10-01' calendarData={calendarData} />