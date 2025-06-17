import { Button, Flex, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../slice/cartSlice";
import { deleteProduct } from "../slice/productSlice";
import { animateToCart } from "../utils/animateToCart";

const ProductActions = ({ product, onEditClick, imageRef }) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const handleAddToCart = () => {
		dispatch(addItemToCart(product));
		if (imageRef?.current) {
			animateToCart(imageRef.current); // ✅ Fly animation
		}
	};

	const handleDeleteProduct = async () => {
		try {
			const { success, message } = await dispatch(deleteProduct(product._id)).unwrap();
			toast({
				title: success ? "Success" : "Error",
				description: message,
				status: success ? "success" : "error",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: error.message || "Something went wrong",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
		}
	};

return (
  <Flex align="center" justifyContent={"space-between"} gap={3}>
    <Button
      leftIcon={<FaPlus />}
      colorScheme="teal"
      variant="solid"
      size="sm"
      onClick={handleAddToCart}
      _hover={{ bg: "teal.500", transform: "scale(1.05)" }}
    >
      Add to Cart
    </Button>

    <HStack
      spacing={2}
      opacity={0}
      _groupHover={{ opacity: 1 }}
      transition="opacity 0.2s"
    >
      <IconButton icon={<FaEdit />} onClick={onEditClick} colorScheme="blue" size="sm" />
      <IconButton icon={<FaTrashAlt />} onClick={handleDeleteProduct} colorScheme="red" size="sm" />
    </HStack>
  </Flex>
);
};

export default ProductActions;
