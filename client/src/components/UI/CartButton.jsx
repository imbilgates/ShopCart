import { Link } from "react-router-dom";
import { IconButton, Box, Badge } from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartButton = () => {
  const items = useSelector((state) => state.cart.items);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box
      position="fixed"
      bottom="9"
      right="9"
      zIndex="999"
    >
      <Link to="/cart">
        <Box position="relative" display="inline-block">
<IconButton
  id="cart-icon"
  icon={<FaCartPlus />}
  colorScheme="teal"
  variant="solid"
  aria-label="Cart"
  size="lg"
  shadow="md"
/>

          {totalCount > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              bg="red.500"
              color="white"
              borderRadius="full"
              px="2"
              fontSize="0.8em"
            >
              {totalCount}
            </Badge>
          )}
        </Box>
      </Link>
    </Box>
  );
};

export default CartButton;
