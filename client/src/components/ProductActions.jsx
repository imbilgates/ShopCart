import { Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { addItemToCart } from "../slice/cartSlice";
import { deleteProduct } from "../slice/productSlice";
import { useToast } from "@chakra-ui/react";

const ProductActions = ({ product, onEditClick }) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const handleDeleteProduct = async (pid) => {
		try {
			const { success, message } = await dispatch(deleteProduct(pid)).unwrap();
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
		<Flex align="center" justify="space-between" mb={3}>
			<Button
				leftIcon={<FaPlus />}
				colorScheme="teal"
				variant="solid"
				size="sm"
				onClick={() => dispatch(addItemToCart(product))}
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
				<IconButton
					icon={<FaTrashAlt />}
					onClick={() => handleDeleteProduct(product._id)}
					colorScheme="red"
					size="sm"
				/>
			</HStack>
		</Flex>
	);
};

export default ProductActions;
