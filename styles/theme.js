import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Source Sans Pro, sans-serif',
    body: 'Source Sans Pro, sans-serif',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'black' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'black',
        minHeight: '100vh',
        margin: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      '#__next': {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
    }),
  },
  colors: {
    brand: {
      50: '#f7f7f7',
      100: '#e1e1e1',
      200: '#cfcfcf',
      300: '#b1b1b1',
      400: '#9e9e9e',
      500: '#7e7e7e',
      600: '#626262',
      700: '#515151',
      800: '#3b3b3b',
      900: '#222222',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.200',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.300',
          },
        }),
        ghost: (props) => ({
          color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
            bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
            _hover: {
              borderColor: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
            },
            _focus: {
              borderColor: 'gray.500',
              boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? 'gray.500' : 'gray.600'}`,
            },
          },
        }),
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'semibold',
      },
    },
  },
});

export default theme;