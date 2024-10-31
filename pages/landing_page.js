import React from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Wrap,
  WrapItem,
  Image,
  Link,
} from '@chakra-ui/react';
import { FaRobot, FaComments, FaMagic, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { GiCrystalBall, GiCupidTarget, GiLovers } from 'react-icons/gi';
import TestimonialCarousel from '../components/TestimonialCarousel';

const AppLogo = ({ name }) => (
  <Box
    width={{ base: "80px", md: "120px" }}
    height={{ base: "30px", md: "30px" }}
    position="relative"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Image 
      src={`/images/logos/${name.toLowerCase()}.png`} 
      alt={`${name} logo`} 
      layout="fill"
      objectFit="contain"
      objectPosition="center"
      style={{ filter: 'grayscale(100%) brightness(0%)' }}
    />
  </Box>
);

const Feature = ({ icon, title, text }) => (
  <VStack 
    align="center" 
    spacing={4} 
    p={6} 
    bg={useColorModeValue('white', 'gray.700')} 
    borderRadius="xl" 
    boxShadow="md" 
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
  >
    <Icon as={icon} w={12} h={12} color="brand.500" />
    <Heading size="md" textAlign="center">{title}</Heading>
    <Text textAlign="center">{text}</Text>
  </VStack>
);

const PricingCard = ({ title, price, features, isPopular, onClick }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      direction="column"
      justify="space-between"
      borderWidth="1px"
      borderRadius="xl"
      borderColor={isPopular ? 'brand.500' : borderColor}
      p={6}
      bg={bgColor}
      boxShadow="md"
      position="relative"
      transition="all 0.3s"
      _hover={{ boxShadow: 'lg' }}
    >
      {isPopular && (
        <Text
          position="absolute"
          top="-3"
          right="-3"
          bg="brand.900"
          color="white"
          fontSize="sm"
          fontWeight="bold"
          px={3}
          py={1}
          borderRadius="full"
        >
          Most Popular
        </Text>
      )}
      <VStack spacing={4} align="stretch">
        <Heading size="lg">{title}</Heading>
        <Text fontSize="4xl" fontWeight="bold" color="brand.900">
          ${price}
          <Text as="span" fontSize="sm" fontWeight="normal" color={useColorModeValue('gray.600', 'gray.400')}>
            /month
          </Text>
        </Text>
        {features.map((feature, index) => (
          <HStack key={index}>
            <Icon as={GiLovers} color="brand.900" />
            <Text>{feature}</Text>
          </HStack>
        ))}
      </VStack>
    </Flex>
  );
};

const LandingPage = ({ onShowAuth }) => {
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const footerColor = useColorModeValue('gray.700', 'gray.200');
  const footerBg = useColorModeValue('gray.100', 'gray.900');

  return (
    <>
      <Head>
        <title>DatingCoachGPT - Your Path to Love</title>
        <meta name="description" content="AI-powered DatingCoachGPT to help you find your perfect match" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        {/* Hero Section */}
        <Box py={20} color="white">
          <Container maxW="container.xl">
            <VStack spacing={8} align="center" textAlign="center">
              <Heading as="h1" size="2xl" color={headingColor}>
                Find Love with AI Magic ✨
              </Heading>
              <Text fontSize="xl" maxW="2xl" color={headingColor}>
                Your personal DatingCoachGPT is here to guide you to meaningful connections and lasting relationships.
              </Text>
              <Button size="lg" color="black" border="2px solid" borderColor="black" onClick={onShowAuth}>
                Start Your Love Journey
              </Button>
            </VStack>
          </Container>
        </Box>

        {/* Trusted By Section */}
        <Box py={10} bg={useColorModeValue('gray.50', 'gray.800')}>
          <Container maxW="container.xl">
            <VStack spacing={6}>
              <Heading size="md" textAlign="center" color={headingColor}>
                Trusted by users on popular dating platforms
              </Heading>
              <Wrap justify="center" spacing={8}>
                <WrapItem>
                  <AppLogo name="Tinder" />
                </WrapItem>
                <WrapItem>
                  <AppLogo name="Bumble" />
                </WrapItem>
                <WrapItem>
                  <AppLogo name="Hinge" />
                </WrapItem>
                <WrapItem>
                  <AppLogo name="OkCupid" />
                </WrapItem>
              </Wrap>
            </VStack>
          </Container>
        </Box>

        {/* Features Section */}
        <Box py={20}>
          <Container maxW="container.xl">
            <Heading textAlign="center" mb={12} color={headingColor}>
              Unlock the Power of AI in Your Love Life
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              <Feature
                icon={GiCrystalBall}
                title="Smart Matching"
                text="Analyzes your preferences to find your ideal match."
              />
              <Feature
                icon={FaRobot}
                title="24/7 AI Coach"
                text="Get personalized advice and tips anytime, anywhere."
              />
              <Feature
                icon={FaMagic}
                title="Profile Magic"
                text="Transform your dating profile with AI-powered suggestions."
              />
              <Feature
                icon={FaComments}
                title="Conversation Spark"
                text="Never run out of things to say with our AI-powered conversation starter."
              />
            </SimpleGrid>
          </Container>
        </Box>

        {/* Testimonial Carousel */}
        <Box py={20} bg={useColorModeValue('gray.50', 'gray.800')}>
          <Container maxW="container.xl">
            <Heading textAlign="center" mb={12} color={headingColor}>
              Love Stories Powered by AI
            </Heading>
            <TestimonialCarousel />
          </Container>
        </Box>

        {/* Pricing Section */}
        <Box py={20}>
          <Container maxW="container.xl">
            <Heading textAlign="center" mb={12} color={headingColor}>
              Choose Your Path to Love
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <PricingCard
                title="Love Seeker"
                price={9.99}
                features={[
                  'AI Matching',
                  'Basic Profile Optimization',
                  'Limited AI Coaching',
                ]}
              />
              <PricingCard
                title="Love Explorer"
                price={19.99}
                features={[
                  'Advanced AI Matching',
                  'Full Profile Optimization',
                  'Unlimited AI Coaching',
                  'Priority Support',
                ]}
                isPopular={true}
              />
              <PricingCard
                title="Love Master"
                price={29.99}
                features={[
                  'VIP AI Matching',
                  'Expert Profile Review',
                  'Personalized Coaching Sessions',
                  '24/7 Premium Support',
                ]}
              />
            </SimpleGrid>
          </Container>
        </Box>

        {/* FAQ Section */}
        <Box py={20} bg={useColorModeValue('gray.50', 'gray.800')}>
          <Container maxW="container.xl">
            <Heading textAlign="center" mb={12} color={headingColor}>
              Frequently Asked Questions
            </Heading>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      How does the DatingCoachGPT work?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Our DatingCoachGPT uses advanced algorithms to analyze your preferences, behavior, and interactions. It provides personalized advice, helps optimize your profile, and suggests potential matches based on compatibility.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Is my data safe and private?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Yes, we take your privacy very seriously. All your data is encrypted and stored securely. We never share your personal information with third parties without your explicit consent.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Can I use this with other dating apps?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Absolutely! Our DatingCoachGPT is designed to work alongside popular dating apps. You can apply the insights and advice you receive to improve your dating experience across multiple platforms.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What if I'm not satisfied with the service?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  We offer a 30-day money-back guarantee. If you're not completely satisfied with our AI DatingCoachGPT, you can request a full refund within the first 30 days of your subscription.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box py={20} bg="brand.900" color="white">
          <Container maxW="container.xl" textAlign="center">
            <Heading mb={6}>Ready to Find Your Perfect Match?</Heading>
            <Text fontSize="xl" mb={8}>
              Join thousands of happy couples who found love with our AI coach.
            </Text>
            <Button
              size="lg"
              color="black"
              onClick={onShowAuth}
              fontWeight="bold"
              px={8}
              py={6}
              fontSize="xl"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
              transition="all 0.3s"
              border="2px solid"
              borderColor="black"
            >
              Get Started Now
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;