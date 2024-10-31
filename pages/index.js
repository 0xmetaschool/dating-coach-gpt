import React, { useState } from 'react';
import { VStack, Box, Fade, useColorModeValue, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { useAuth } from '../contexts/authContext';
import LandingPage from './landing_page';

// @dev Home component that serves as the entry point for the application.
export default function Home() {
  // @dev Destructure the AuthPage and login functions from the auth context.
  const { AuthPage, login } = useAuth();

  // @dev State to manage the visibility of the authentication modal.
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // @dev Define background colors for different components based on the color mode.
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const overlayBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');

  // @dev Function to open the authentication modal.
  const handleShowAuth = () => {
    setIsAuthModalOpen(true);
  };

  // @dev Function to close the authentication modal.
  const handleCloseAuth = () => {
    setIsAuthModalOpen(false);
  };

  // @dev Function to handle the authentication process.
  const handleAuth = async (token, userData) => {
    await login(token, userData);
    setIsAuthModalOpen(false);
  };

  return (
    <Fade in={true}>
      <VStack spacing={2} minH="100vh" bg={bgColor} justify="center" p={4}>
        <Box textAlign="center" w="100%">
          {/* @dev Render the landing page and pass the handleShowAuth function as a prop. */}
          <LandingPage onShowAuth={handleShowAuth} />
        </Box>
        {/* @dev Modal component to display the authentication form. */}
        <Modal isOpen={isAuthModalOpen} onClose={handleCloseAuth} size="md">
          <ModalOverlay bg={overlayBg} backdropFilter="blur(5px)" />
          <ModalContent 
            bg="transparent"
            boxShadow="none"
            maxW="md"
            w="100%"
          >
            {/* @dev Render the AuthPage component and pass the handleAuth and handleCloseAuth functions as props. */}
            <AuthPage onAuth={handleAuth} onClose={handleCloseAuth} />
          </ModalContent>
        </Modal>
      </VStack>
    </Fade>
  );
}