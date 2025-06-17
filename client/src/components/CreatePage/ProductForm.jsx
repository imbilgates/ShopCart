import {
	Box,
	Button,
	Image,
	Input,
	Text,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { FaUpload} from "react-icons/fa";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../slice/productSlice";

const ProductForm = () => {
	const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
	const [errors, setErrors] = useState({});
	const toast = useToast();
	const dispatch = useDispatch();
	const imageInputRef = useRef();

	const validate = () => {
		const newErrors = {};
		if (!newProduct.name.trim()) newErrors.name = "Product name is required";
		if (!newProduct.price || isNaN(newProduct.price) || newProduct.price <= 0)
			newErrors.price = "Price must be a positive number";
		if (!newProduct.image.trim()) newErrors.image = "Image is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleAddProduct = async () => {
		if (!validate()) return;
		try {
			const { success, message } = await dispatch(createProduct(newProduct)).unwrap();
			toast({
				title: success ? "Success" : "Error",
				description: message,
				status: success ? "success" : "error",
				isClosable: true,
				position: "top-right",
			});
			if (success) setNewProduct({ name: "", price: "", image: "" });
		} catch (error) {
			toast({
				title: "Error",
				description: error.message || "Something went wrong",
				status: "error",
				isClosable: true,
				position: "top-right",
			});
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onloadend = () => {
			setNewProduct({ ...newProduct, image: reader.result });
		};
		reader.readAsDataURL(file);
	};

	return (
		<Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded="lg" shadow="md">
			<VStack spacing={4}>
				<Input
					placeholder="Product Name"
					value={newProduct.name}
					onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
					isInvalid={!!errors.name}
					errorBorderColor="red.300"
				/>
				{errors.name && <Text color="red.500">{errors.name}</Text>}

				<Input
					placeholder="Price"
					type="number"
					value={newProduct.price}
					onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
					isInvalid={!!errors.price}
					errorBorderColor="red.300"
				/>
				{errors.price && <Text color="red.500">{errors.price}</Text>}

				<Box
					w="full"
					border="2px dashed"
					borderColor="gray.300"
					borderRadius="md"
					p={4}
					textAlign="center"
					cursor="pointer"
					_hover={{ bg: "gray.50" }}
					onClick={() => imageInputRef.current.click()}
				>
					{newProduct.image ? (
						<Image
							src={newProduct.image}
							alt="Preview"
							boxSize="150px"
							objectFit="cover"
							rounded="md"
							mx="auto"
							shadow="md"
						/>
					) : (
						<VStack spacing={2} color="gray.500">
							<FaUpload />
							<Text>Click to upload product image</Text>
						</VStack>
					)}
				</Box>
				<Input
					type="file"
					accept="image/*"
					ref={imageInputRef}
					display="none"
					onChange={handleImageChange}
				/>
				{errors.image && <Text color="red.500">{errors.image}</Text>}

				<Button colorScheme="blue" onClick={handleAddProduct} w="full">
					Add Product
				</Button>
			</VStack>
		</Box>
	);
};

export default ProductForm;
