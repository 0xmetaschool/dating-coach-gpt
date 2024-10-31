import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button,
  Stack,
  Flex,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  SimpleGrid,
  VStack,
  HStack,
  Icon
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { GiLovers } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/authContext';

// @dev Component to display a pricing card with a title, price, features, and an optional "Most Popular" tag.
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
        <Text fontSize="4xl" fontWeight="bold" color="brand.500">
          ${price}
          <Text as="span" fontSize="sm" fontWeight="normal" color={useColorModeValue('gray.600', 'gray.400')}>
            /month
          </Text>
        </Text>
        {features.map((feature, index) => (
          <HStack key={index}>
            <Icon as={GiLovers} color="brand.500" />
            <Text>{feature}</Text>
          </HStack>
        ))}
      </VStack>
      <Button colorScheme="brand" size="lg" mt={8} onClick={onClick}>
        Choose Plan
      </Button>
    </Flex>
  );
};

// @dev Main component for the Pricing page that displays available plans and a comparison table.
export default function PricingPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  // @dev Handle the selection of a plan and update the user's credits.
  const handlePlanClick = async (credits) => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      await updateUser({ credits: user.credits + credits });
      router.push('/dating-assistant');
    } catch (error) {
      console.error('Error updating credits:', error);
      alert('An error occurred while updating your credits. Please try again.');
    }
  };

  return (
    <Box py={12}>
      <Heading as="h1" size="2xl" textAlign="center" mb={10}>
        Upgrade Your Plan
      </Heading>
      <Flex justify="center" align="center" wrap="wrap" maxW="6xl" mx="auto" mb={12}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <PricingCard
            title="Love Seeker"
            price={9.99}
            features={[
              '100 credits',
              'AI Matching',
              'Basic Profile Optimization',
              'Limited AI Coaching',
            ]}
            onClick={() => handlePlanClick(100)}
          />
          <PricingCard
            title="Love Explorer"
            price={19.99}
            features={[
              '250 credits',
              'Advanced AI Matching',
              'Full Profile Optimization',
              'Unlimited AI Coaching',
              'Priority Support',
            ]}
            isPopular={true}
            onClick={() => handlePlanClick(250)}
          />
          <PricingCard
            title="Love Master"
            price={29.99}
            features={[
              '1000 credits',
              'VIP AI Matching',
              'Expert Profile Review',
              'Personalized Coaching Sessions',
              '24/7 Premium Support',
            ]}
            onClick={() => handlePlanClick(1000)}
          />
        </SimpleGrid>
      </Flex>
      <Box maxW="6xl" mx="auto">
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          Plan Comparison
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Features</Th>
                <Th textAlign="center">Basic</Th>
                <Th textAlign="center">Pro</Th>
                <Th textAlign="center">Elite</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Credits</Td>
                <Td textAlign="center">100</Td>
                <Td textAlign="center">250</Td>
                <Td textAlign="center">1000</Td>
              </Tr>
              <Tr>
                <Td>Basic dating advice</Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
              </Tr>
              <Tr>
                <Td>Profile tips</Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
              </Tr>
              <Tr>
                <Td>Advanced dating advice</Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
              </Tr>
              <Tr>
                <Td>Profile review</Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
              </Tr>
              <Tr>
                <Td>Message crafting</Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
              </Tr>
              <Tr>
                <Td>Profile optimization</Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
              </Tr>
              <Tr>
                <Td>Message strategy</Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
              </Tr>
              <Tr>
                <Td>Date planning</Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                <Td textAlign="center"><CheckIcon color="green.500" /></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}