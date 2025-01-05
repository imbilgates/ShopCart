import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../slice/productSlice";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const [errors, setErrors] = useState({});
	const toast = useToast();
	const dispatch = useDispatch();

	const validate = () => {
		const newErrors = {};
		if (!newProduct.name.trim()) newErrors.name = "Product name is required";
		if (!newProduct.price || isNaN(newProduct.price) || newProduct.price <= 0)
			newErrors.price = "Price must be a positive number";
		if (!newProduct.image.trim()) newErrors.image = "Image URL is required";
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
			if (success) {
				setNewProduct({ name: "", price: "", image: "" });
			}
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

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					p={6}
					rounded={"lg"}
					shadow={"md"}
				>
					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={(e) =>
								setNewProduct({ ...newProduct, name: e.target.value })
							}
							isInvalid={!!errors.name}
							errorBorderColor="red.300"
						/>
						{errors.name && <Text color="red.500">{errors.name}</Text>}

						<Input
							placeholder="Price"
							name="price"
							type="number"
							value={newProduct.price}
							onChange={(e) =>
								setNewProduct({ ...newProduct, price: e.target.value })
							}
							isInvalid={!!errors.price}
							errorBorderColor="red.300"
						/>
						{errors.price && <Text color="red.500">{errors.price}</Text>}

						<Input
							placeholder="Image URL"
							name="image"
							value={newProduct.image}
							onChange={(e) =>
								setNewProduct({ ...newProduct, image: e.target.value })
							}
							isInvalid={!!errors.image}
							errorBorderColor="red.300"
						/>
						{errors.image && <Text color="red.500">{errors.image}</Text>}

						<Button colorScheme="blue" onClick={handleAddProduct} w="full">
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};

export default CreatePage;
