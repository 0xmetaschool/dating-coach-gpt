import React, { useState } from 'react';
import { VStack, Box, Fade, useColorModeValue, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { useAuth } from '../contexts/authContext';
import LandingPage from './landing_page';

export default function Home() {
  const { AuthPage, login } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const overlayBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');

  const handleShowAuth = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuth = async (token, userData) => {
    await login(token, userData);
    setIsAuthModalOpen(false);
  };

  return (
    <Fade in={true}>
      <VStack spacing={2} minH="100vh" bg={bgColor} justify="center" p={4}>
        <Box textAlign="center" w="100%">
          <LandingPage onShowAuth={handleShowAuth} />
        </Box>
        <Modal isOpen={isAuthModalOpen} onClose={handleCloseAuth} size="md">
          <ModalOverlay bg={overlayBg} backdropFilter="blur(5px)" />
          <ModalContent 
            bg="transparent"
            boxShadow="none"
            maxW="md"
            w="100%"
          >
            <AuthPage onAuth={handleAuth} onClose={handleCloseAuth} />
          </ModalContent>
        </Modal>
      </VStack>
    </Fade>
  );
}