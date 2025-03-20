// Chakra imports
import { Flex, Text, Heading, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand(props: { mini: boolean; hovered: boolean }) {
  const { mini, hovered } = props;
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');
  let separatorBg = useColorModeValue('#E0E5F2', 'whiteAlpha.200');
  return (
    <Flex alignItems="center" flexDirection="column">

      <Heading fontSize="5xl" fontStyle="Helvetica" textColor={logoColor}>BCA</Heading>


      <HSeparator mb="20px" bg={separatorBg} />
    </Flex>
  );
}

export default SidebarBrand;
