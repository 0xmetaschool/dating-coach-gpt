import React from 'react';
import { ChakraProvider, Text, Flex, Heading, Button, useColorMode, Container, useColorModeValue } from '@chakra-ui/react';
import { Sun, Moon, Heart, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import theme from '../styles/theme';
import Image from 'next/image';
import loadingGif from '../public/cupidLoading.gif';
import { AuthProvider, useAuth } from '../contexts/authContext';
import { Global } from '@emotion/react';

// @dev Define custom fonts using Global styles.
const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Source Sans Pro';
        src: url('/fonts/SourceSansPro-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `}
  />
);

// @dev Main content component that handles rendering based on authentication and loading states.
function AppContent({ Component, pageProps }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  // @dev Define color mode values for background, text, header background, and header shadow.
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const headerBgColor = useColorModeValue('white', 'gray.800');
  const headerShadow = useColorModeValue('sm', 'md');

  // @dev Display a loading spinner if the app is in a loading state.
  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center" bg={bgColor}>
        <Image
          src={loadingGif}
          alt="Loading"
          width={300}
          height={300}
        />
      </Flex>
    );
  }

  // @dev Determine if the current route is the dating assistant page.
  const isDatingAssistant = router.pathname === '/dating-assistant';

  return (
    <Flex flexDirection="column" minHeight="100vh" bg={bgColor} color={textColor}>
      {/* @dev Header component with navigation and color mode toggle. */}
      <Flex 
        as="header" 
        bg={headerBgColor} 
        py={4} 
        px={8}
        boxShadow={headerShadow} 
        position="sticky" 
        top={0} 
        zIndex={10}
        alignItems="center"
      >
        <Container maxW="container.xl" display="flex" alignItems="center">
          <Flex alignItems="center" cursor="pointer" onClick={() => router.push('/')}>
            <Heart size={24} color={theme.colors.brand[900]} />
            <Heading 
              size="lg" 
              color={textColor} 
              ml={2} 
              fontFamily="'Source Sans Pro', sans-serif"
              fontWeight="bold"
              fontSize="2xl"
            >
              DatingCoachGPT
            </Heading>
          </Flex>
          <Flex ml="auto" alignItems="center">
            <Button 
              onClick={toggleColorMode} 
              mr={4} 
              variant="ghost" 
              size="sm"
              aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            {user && (
              <Button 
                onClick={logout} 
                color="black" 
                border="2px solid" 
                borderColor="black" 
                size="sm" 
                leftIcon={<LogOut size={18} />}
              >
                Logout
              </Button>
            )}
          </Flex>
        </Container>
      </Flex>
      {/* @dev Main content area with conditional rendering based on the current route. */}
      <Flex flexGrow={1} flexDirection="column">
        {isDatingAssistant ? (
          <Component {...pageProps} />
        ) : (
          <Container maxW="container.xl" py={8} flexGrow={1}>
            <Component {...pageProps} />
          </Container>
        )}
      </Flex>
    </Flex>
  );
}

// @dev Main application component that wraps the entire app with ChakraProvider and AuthProvider.
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <AuthProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;