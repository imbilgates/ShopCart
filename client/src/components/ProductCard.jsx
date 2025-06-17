import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	SkeletonText,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../slice/productSlice";
import { addItemToCart } from "../slice/cartSlice";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";

const ProductCard = ({ product, isLoading }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const dispatch = useDispatch();
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

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

	const handleUpdateProduct = async (pid, updatedProduct) => {
		try {
			const { success, message } = await dispatch(
				updateProduct({ pid, updatedProduct })
			).unwrap();
			onClose();
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
		<Box
			shadow="lg"
			rounded="lg"
			overflow="hidden"
			transition="all 0.3s"
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
			role="group"
		>
			{isLoading ? (
				<Skeleton height="200px" />
			) : (
				<Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
			)}

			<Box p={4}>
				{isLoading ? (
					<>
						<SkeletonText mt="4" noOfLines={1} skeletonHeight="20px" />
						<SkeletonText mt="2" noOfLines={1} skeletonHeight="20px" />
					</>
				) : (
					<>
						<Flex align="center" justify="space-between" mb={3}>
							<Heading as="h3" size="md" mb={2}>
								{product.name}
							</Heading>

							<Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
								₹{product.price}
							</Text>
						</Flex>


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
								<IconButton icon={<FaEdit />} onClick={onOpen} colorScheme="blue" size="sm" />
								<IconButton
									icon={<FaTrashAlt />}
									onClick={() => handleDeleteProduct(product._id)}
									colorScheme="red"
									size="sm"
								/>
							</HStack>
						</Flex>

					</>
				)}
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder="Product Name"
								name="name"
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder="Price"
								name="price"
								type="number"
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder="Image URL"
								name="image"
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default ProductCard;
