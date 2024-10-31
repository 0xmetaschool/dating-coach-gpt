import React from 'react';
import { Box, Text, VStack, Avatar, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The DatingCoachGPT helped me understand what I really want in a partner. I\'m now in a fulfilling relationship!',
    avatar: '/images/avatars/sarah.jpg',
  },
  {
    name: 'John D.',
    text: 'My confidence skyrocketed after using this app. The personalized advice was a game-changer.',
    avatar: '/images/avatars/john.jpg',
  },
  {
    name: 'Emily L.',
    text: 'I was skeptical at first, but the AI\'s insights into my dating patterns were eye-opening. Highly recommended!',
    avatar: '/images/avatars/emily.jpg',
  },
  {
    name: 'Michael R.',
    text: 'This AI coach taught me how to communicate effectively in dating. It\'s been a transformative experience.',
    avatar: '/images/avatars/michael.jpg',
  },
  {
    name: 'Jessica T.',
    text: 'I\'ve tried other dating apps, but none compare to the personalized guidance I get from this AI coach.',
    avatar: '/images/avatars/jessica.jpg',
  },
  {
    name: 'David W.',
    text: 'The profile optimization feature helped me showcase my best self. I\'m getting way more matches now!',
    avatar: '/images/avatars/david.jpg',
  },
];

const TestimonialCard = ({ testimonial }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" height="full" display="flex" flexDirection="column" justifyContent="space-between">
      <VStack spacing={4} align="center" flex={1}>
        <Avatar size="xl" src={testimonial.avatar} name={testimonial.name} />
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {testimonial.name}
        </Text>
        <Text fontSize="md" color={textColor} textAlign="center" flex={1}>
          "{testimonial.text}"
        </Text>
      </VStack>
    </Box>
  );
};

const TestimonialCarousel = () => {
  return (
    <Carousel
      showArrows={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      interval={5000}
    >
      {[0, 3].map((startIndex) => (
        <SimpleGrid columns={3} spacing={8} key={startIndex}>
          {testimonials.slice(startIndex, startIndex + 3).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </SimpleGrid>
      ))}
    </Carousel>
  );
};

export default TestimonialCarousel;