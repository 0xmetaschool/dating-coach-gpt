import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  Grid,
  useColorModeValue,
  Avatar,
  Icon,
  Center,
} from '@chakra-ui/react';
import { Send, User, MessageSquare, FileText, Shirt, Mail, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/authContext';

// @dev Component to display individual chat messages.
const ChatMessage = ({ message }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const isAssistant = message.role === 'assistant';

  return (
    <Flex 
      w="full" 
      py={3}
      justify={isAssistant ? "flex-start" : "flex-end"}
    >
      <Flex
        maxW="70%"
        align="start"
        bg={isAssistant ? undefined : 'brand.900'}
        color={isAssistant ? 'inherit' : 'white'}
        px={4}
        py={3}
        borderRadius="lg"
      >
        {isAssistant && (
          <Avatar 
            icon={<Icon as={MessageSquare} />}
            bg="brand.900"
            color="white"
            mr={3}
            size="sm"
          />
        )}
        <Text>{message.content}</Text>
      </Flex>
    </Flex>
  );
};

// @dev Component to display informational cards with icons and text.
const InfoCard = ({ icon, text, onClick }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg={bgColor}
      p={4}
      borderRadius="lg"
      textAlign="center"
      height="100%"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ transform: 'scale(1.05)', cursor: 'pointer' }}
      onClick={onClick}
    >
      <Icon as={icon} size={24} mb={2} color={textColor} />
      <Text fontSize="sm" color={textColor}>{text}</Text>
    </Flex>
  );
};

// @dev Component to display a typing indicator.
const TypingIndicator = () => (
  <Flex align="center" mt={2}>
    <Text fontSize="xl" color="gray.500">•</Text>
    {[0, 1].map((index) => (
      <Text
        key={index}
        fontSize="xl"
        color="gray.500"
        animation={`typing-indicator 1.4s infinite ease-in-out ${index * 0.2}s`}
        ml={1}
      >
        •
      </Text>
    ))}
  </Flex>
);

// @dev Function to get a greeting based on the current time of day.
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// @dev Main component for the Dating Assistant page.
export default function DatingAssistantPage() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef(null);
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [remainingCredits, setRemainingCredits] = useState(user?.credits || 0);

  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // @dev Scroll to the bottom of the conversation when new messages are added.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // @dev Check if the user is authenticated when the component mounts.
  useEffect(() => {
    checkUser();
  }, [router]);

  // @dev Update the remaining credits when the user object changes.
  useEffect(() => {
    setRemainingCredits(user?.credits || 0);
  }, [user]);

  // @dev Function to check if the user is authenticated and fetch user details.
  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      const response = await fetch('/api/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        const name = data.name.split(' ')[0] || data.name;
        setUserName(name);
      }
    }
  };

  // @dev Function to handle form submission and initiate the chat interaction.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (remainingCredits <= 0) {
      alert("You have used up your free credits. Please upgrade to continue.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      setConversation(prev => [...prev, { role: 'user', content: input }]);
      const currentInput = input;
      setInput('');
      setIsLoading(true);

      const encodedInput = encodeURIComponent(currentInput);
      const eventSource = new EventSource(`/api/dating-guide/stream?input=${encodedInput}&token=${token}`);

      let assistantResponse = '';

      eventSource.onmessage = (event) => {
        try {
          setIsLoading(false);
          const data = JSON.parse(event.data);
          if (data.content === "[DONE]") {
            eventSource.close();
          } else {
            assistantResponse += data.content;
            setConversation(prev => {
              const newConv = [...prev];
              if (newConv[newConv.length - 1]?.role === 'assistant') {
                newConv[newConv.length - 1].content = assistantResponse;
              } else {
                newConv.push({ role: 'assistant', content: assistantResponse.trim() });
              }
              return newConv;
            });
          }
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close();
        alert("Connection Error: Failed to connect to the server. Please try again.");
      };

      setRemainingCredits(prev => prev - 1);
      await updateUser({ credits: remainingCredits - 1 });

    } catch (error) {
      console.error('Error getting advice:', error);
      alert("Error: An error occurred while getting advice. Please try again.");
    }
  };

  return (
    <Flex direction="column" h="92vh" bg={bg}>
      <Box flex={1} overflowY="auto" px={4} py={6}>
        {conversation.length === 0 ? (
          <VStack spacing={6} align="stretch" maxW="3xl" mx="auto" w="full" h="full" justifyContent="center">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4} color="gray.700">
              {getGreeting()}, {userName}
            </Text>
            <Center>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} maxW="md">
                <InfoCard 
                  icon={MessageSquare} 
                  text="Ask for dating advice" 
                  onClick={() => setInput("Can you give me some general dating advice?")}
                />
                <InfoCard 
                  icon={FileText} 
                  text="Get tips for writing a great profile" 
                  onClick={() => setInput("How can I improve my dating profile?")}
                />
                <InfoCard 
                  icon={Shirt} 
                  text="Outfit suggestions for a date" 
                  onClick={() => setInput("What should I wear on a first date?")}
                />
                <InfoCard 
                  icon={Mail} 
                  text="Help crafting messages to matches" 
                  onClick={() => setInput("How do I write a good first message to a match?")}
                />
              </Grid>
            </Center>
          </VStack>
        ) : (
          <VStack spacing={4} align="stretch" maxW="3xl" mx="auto" w="full">
            {conversation.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <Flex justify="flex-start">
                <TypingIndicator />
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>
        )}
      </Box>
      <Box borderTop="1px" borderColor={borderColor} p={4} bg={useColorModeValue('white', 'gray.800')}>
        <Flex maxW="3xl" mx="auto" mb={2} justify="space-between" align="center">
          <Flex align="center">
            <Icon as={CreditCard} size={20} color="gray.500" mr={2} />
            <Text>
              Free credits: <strong>{remainingCredits}</strong>
            </Text>
          </Flex>
          {remainingCredits <= 0 ? (
            <Button colorScheme="brand" size="sm">
              Upgrade
            </Button>
          ) : (
            <Text fontSize="sm" color="gray.500">
              Need more credits?{' '}
              <Button
                variant="link"
                color="black"
                size="sm"
                onClick={() => router.push('/pricing')}
              >
                Upgrade
              </Button>
            </Text>
          )}
        </Flex>
        <Flex as="form" onSubmit={handleSubmit} maxW="3xl" mx="auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me for any dating advice..."
            mr={2}
            isDisabled={isLoading || remainingCredits <= 0}
            size="lg"
            borderRadius="full"
          />
          <Button
            type="submit"
            color="black"
            border="2px solid"
            borderColor="black"
            isDisabled={isLoading || remainingCredits <= 0}
            size="lg"
            borderRadius="full"
          >
            <Send size={20} />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}