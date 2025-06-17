import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../slice/productSlice";

const UpdateProductModal = ({ isOpen, onClose, product, updatedProduct, setUpdatedProduct }) => {
	const dispatch = useDispatch();
	const toast = useToast();

	const handleUpdateProduct = async () => {
		try {
			const { success, message } = await dispatch(
				updateProduct({ pid: product._id, updatedProduct })
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
							onChange={(e) =>
								setUpdatedProduct({ ...updatedProduct, name: e.target.value })
							}
						/>
						<Input
							placeholder="Price"
							name="price"
							type="number"
							value={updatedProduct.price}
							onChange={(e) =>
								setUpdatedProduct({ ...updatedProduct, price: e.target.value })
							}
						/>
						<Input
							placeholder="Image URL"
							name="image"
							value={updatedProduct.image}
							onChange={(e) =>
								setUpdatedProduct({ ...updatedProduct, image: e.target.value })
							}
						/>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
						Update
					</Button>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default UpdateProductModal;
