import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Spacer,
  Button,
  Center,
  useColorMode,
  Image,
} from '@chakra-ui/react';
import { addItemFromCart, removeItemFromCart, clearCart } from '../slice/cartSlice';
import emptyCart from '../assets/shopping-cart.png' 

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);

  const { colorMode } = useColorMode();

  const bgColor = { light: 'white', dark: 'gray.700' };
  const textColor = { light: 'gray.800', dark: 'whiteAlpha.900' };
  const borderColor = { light: 'gray.200', dark: 'gray.600' };

  return (
    <Center minH="100vh" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'} px={4}>
      <Box
        bg={bgColor[colorMode]}
        p={6}
        rounded="lg"
        shadow="lg"
        w="full"
        maxW="lg"
        color={textColor[colorMode]}
      >
        <Heading size="lg" textAlign="center" mb={4}>
          Your Cart
        </Heading>

        {items.length === 0 ? (
          <Center flexDirection="column" textAlign="center" gap={4}>
            <Text>Your cart is empty.</Text>
            <Image src={emptyCart} alt="Empty Cart" boxSize="200px" objectFit="contain" />
          </Center>
        ) : (
          <Stack spacing={4}>
            {items.map((item) => (
              <Box key={item._id} borderBottom="1px" borderColor={borderColor[colorMode]} pb={2}>
                <Flex align="center">
                  <Box>
                    <Text fontWeight="semibold">{item.name}</Text>
                    <Text fontSize="sm" color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
                      {item.quantity} × ₹{item.price}
                    </Text>
                  </Box>
                  <Spacer />
                  <Text fontWeight="medium">₹{item.quantity * item.price}</Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    ml={4}
                    onClick={() => dispatch(removeItemFromCart(item._id))}
                  >
                    −
                  </Button>
                                    <Button
                    size="sm"
                    colorScheme="green"
                    ml={4}
                    onClick={() => dispatch(addItemFromCart(item._id))}
                  >
                    +
                  </Button>
                </Flex>
              </Box>
            ))}

            <Flex justify="space-between" pt={4}>
              <Text fontWeight="bold" fontSize="lg">
                Total:
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                ₹{Number(total).toFixed(2)}
              </Text>
            </Flex>

            <Button colorScheme="red" variant="outline" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </Stack>
        )}
      </Box>
    </Center>
  );
};

export default Cart;
