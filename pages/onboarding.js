import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  Select,
  useColorModeValue,
  useToast,
  Progress,
  Flex,
  Heading,
  Container,
} from '@chakra-ui/react';
import { Heart } from 'lucide-react';

// @dev OnboardingPage component that guides users through a series of questions to set up their profile.
export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');
  const toast = useToast();
  const router = useRouter();

  // @dev Redirect to the authentication page if the user is not authenticated.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

  // @dev Handle the next step or submission of the onboarding form.
  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  // @dev Handle the submission of the onboarding form.
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          age: parseInt(age), 
          gender, 
          interests: interests.split(',').map(i => i.trim()) 
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Onboarding Complete",
          description: "Welcome to DatingCoachGPT! Your profile is now set up.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push('/dating-assistant');
      } else {
        const data = await response.json();
        toast({
          title: "Onboarding Error",
          description: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: "Onboarding Error",
        description: "An unexpected error occurred. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // @dev Define color mode values for background, box background, text, and border.
  const bgColor = useColorModeValue('purple.50', 'gray.900');
  const boxBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const borderColor = useColorModeValue('brand.200', 'brand.600');

  // @dev Array of questions to be displayed in the onboarding process.
  const questions = [
    { title: "How old are you?", component: (
      <Input
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="number"
        focusBorderColor="brand.400"
      />
    )},
    { title: "What's your gender?", component: (
      <Select
        placeholder="Select your gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        focusBorderColor="brand.400"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        <option value="other">Other</option>
      </Select>
    )},
    { title: "What are your interests?", component: (
      <Input
        placeholder="E.g., hiking, movies, cooking (separate with commas)"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        focusBorderColor="brand.400"
      />
    )},
  ];

  return (
    <Flex minHeight="90vh" width="100%" alignItems="center" justifyContent="center" bg={bgColor}>
      <Container maxW="container.sm">
        <Box 
          bg={boxBg} 
          borderRadius="lg" 
          boxShadow="xl" 
          p={8} 
          borderWidth={2}
          borderColor={borderColor}
        >
          <VStack spacing={6} align="stretch">
            <Flex align="center" justify="center" mb={4}>
              <Heart size={24} color="brand.500" />
              <Heading size="lg" color="brand.500" ml={2}>DatingCoachGPT Onboarding</Heading>
            </Flex>
            <Progress value={(step + 1) * 33.33} colorScheme="brand" borderRadius="full" />
            <Text fontSize="md" textAlign="center" color={textColor}>
              Step {step + 1} of 3: Let's get to know you better to provide personalized advice.
            </Text>
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="brand.500">{questions[step].title}</Heading>
              {questions[step].component}
            </VStack>
            <Button 
              onClick={handleNext} 
              colorScheme="brand" 
              isDisabled={(step === 0 && !age) || (step === 1 && !gender) || (step === 2 && !interests)}
              size="lg"
            >
              {step < 2 ? 'Next' : 'Complete Onboarding'}
            </Button>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
}