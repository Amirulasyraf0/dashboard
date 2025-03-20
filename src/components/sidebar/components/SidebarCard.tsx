// Chakra imports
import { Box, Flex, Text, Badge, Icon, LightMode } from '@chakra-ui/react';
import LineChart from 'components/charts/LineChart';
import { BsArrowsAngleExpand } from 'react-icons/bs';
// Custom components
import {
  lineChartDataSidebar,
  lineChartOptionsSidebar,
} from 'variables/charts';
export default function SidebarDocs(props: {
  mini: boolean;
  hovered: boolean;
}) {
  const { mini, hovered } = props;
  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bgGradient="linear(to-b, brand.400, brand.600)"
      borderRadius="10px"
      me="20px"
      position="relative"
      minWidth="250px"
    >
      <Icon
        display={mini === true && hovered === false ? 'block' : 'none'}
        h="36px"
        w="26px"
        my="100px"
        mx="20px"
        color="white"
        as={BsArrowsAngleExpand}
      />
    </Flex>
  );
}
