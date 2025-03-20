// Chakra Imports
import {
  Button,
  Box,
  Flex,
  Icon,
  Text,
  Image,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  SimpleGrid,
  DrawerOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Light from 'assets/img/layout/Light.png';
import Dark from 'assets/img/layout/Dark.png';
// Assets
import {
  MdSettings,
  MdFullscreen,
  MdOutlineFullscreenExit,
} from 'react-icons/md';
import ConfiguratorRadio from './ConfiguratorRadio';
export default function HeaderLinks(props: { [x: string]: any }) {
  const { theme, setTheme } = props;
  //eslint-disable-next-line
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [active, setActive] = useState('Purple');
  const [contrast, setContrast] = useState(false);
  const resetTheme = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        brand: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#422AFB',
          300: '#422AFB',
          400: '#7551FF',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#11047A',
        },
        brandScheme: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#7551FF',
          300: '#7551FF',
          400: '#7551FF',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#02044A',
        },
        brandTabs: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#422AFB',
          300: '#422AFB',
          400: '#422AFB',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#02044A',
        },
        background: {
          100: '#FFFFFF',
          900: '#0b1437',
        },
      },
    };
    setTheme(newTheme);
  };
  const navbarIcon = useColorModeValue('gray.400', 'white');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const activeShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.22)',
    'none',
  );
  const activeBg = useColorModeValue('#F7F9FF', 'whiteAlpha.100');
  const Bg = useColorModeValue('white', 'navy.700');
  const drawerBg = useColorModeValue('white', 'navy.800');
  useEffect(() => {
    if (theme.colors.brand[500] === theme.colors.horizonGreen[500]) {
      setActive('Green');
    } else if (theme.colors.brand[500] === theme.colors.horizonOrange[500]) {
      setActive('Orange');
    } else if (theme.colors.brand[500] === theme.colors.horizonRed[500]) {
      setActive('Red');
    } else if (theme.colors.brand[500] === theme.colors.horizonBlue[500]) {
      setActive('Blue');
    } else if (theme.colors.brand[500] === theme.colors.horizonTeal[500]) {
      setActive('Teal');
    } else {
      setActive('Purple');
    }
  }, [
    theme.colors.brand,
    theme.colors.horizonGreen,
    theme.colors.horizonOrange,
    theme.colors.horizonRed,
    theme.colors.horizonBlue,
    theme.colors.horizonTeal,
  ]);
  const fullscreenBorder = useColorModeValue(
    'secondaryGray.100',
    'whiteAlpha.200',
  );
  const fullscreenBg = useColorModeValue(
    'rgba(11,11,11,0)',
    'rgba(11,11,11,0)',
  );
  const configuratorShadow = useColorModeValue(
    '-20px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '-22px 32px 51px 4px #0B1437',
  );
  useEffect(() => {
    if (theme.colors.background[100] === '#FFFFFF') {
      setContrast(false);
    } else {
      setContrast(true);
    }
  }, [theme.colors.background]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);
  return (
    <>
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={onOpen}
      >
        <Icon me="10px" h="18px" w="18px" color={navbarIcon} as={MdSettings} />
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === 'rtl' ? 'left' : 'right'}
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent
          boxShadow={configuratorShadow}
          w={{ base: 'calc(100vw - 32px)', md: '400px' }}
          maxW={{ base: 'calc(100vw - 32px)', md: '400px' }}
          ms={{
            base: '0px',
            sm: '16px',
          }}
          me={{
            base: '16px',
          }}
          my={{
            sm: '16px',
          }}
          borderRadius="14px"
          bg={drawerBg}
        >
          <DrawerHeader
            w={{ base: '100%', md: '400px' }}
            pt="24px"
            pb="0px"
            px="24px"
          >
            <Box
              position="absolute"
              cursor="pointer"
              top="13px"
              right="50px"
              onClick={() => {
                resetTheme();
                props.setMini(false);
              }}
            >
            
            </Box>
            <DrawerCloseButton color={textColor} />
            <Flex alignItems="center">
              </Flex>
              <Box>
                <Text color={textColor} fontSize="xl" fontWeight="700">
                  Color Mode
                </Text>
              </Box>
          </DrawerHeader>
          <DrawerBody
            pt="0px"
            pb="24px"
            w={{ base: '100%', md: '400px' }}
            maxW="unset"
          >
            <Flex flexDirection="column">

              <SimpleGrid columns={2} gap="20px" mb="30px" mt="20px">
                <ConfiguratorRadio
                  onClick={colorMode === 'dark' ? toggleColorMode : null}
                  active={colorMode === 'dark' ? false : true}
                  label={<Text>Light</Text>}
                >
                  <Image
                    src={Light}
                    maxW={{ base: '100%', md: '130px' }}
                    borderRadius="8px"
                  />
                </ConfiguratorRadio>
                <ConfiguratorRadio
                  onClick={colorMode === 'light' ? toggleColorMode : null}
                  active={colorMode === 'light' ? false : true}
                  label={<Text>Dark</Text>}
                >
                  <Image
                    src={Dark}
                    maxW={{ base: '100%', md: '130px' }}
                    borderRadius="8px"
                  />
                </ConfiguratorRadio>
              </SimpleGrid>
            </Flex>
            <Button
              h="max-content"
              w="100%"
              py="16px"
              border="1px solid"
              display={'flex'}
              justifyContent="center"
              alignItems="center"
              bg={fullscreenBg}
              _hover={{ background: Bg, boxShadow: activeShadow }}
              _focus={{ background: Bg, boxShadow: activeShadow }}
              _active={{ background: activeBg, boxShadow: activeShadow }}
              borderColor={fullscreenBorder}
              onClick={() => {
                isFullscreen
                  ? document.exitFullscreen()
                  : document.body.requestFullscreen();
              }}
            >
              {isFullscreen ? 'Exit fullscreen' : 'Fullscreen mode'}
              <Icon
                ms="6px"
                h="18px"
                w="18px"
                color={textColor}
                as={isFullscreen ? MdOutlineFullscreenExit : MdFullscreen}
              />
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
