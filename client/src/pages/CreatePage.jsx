import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	Text,
	Textarea,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, createBulkProducts } from "../slice/productSlice";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
	const [bulkJSON, setBulkJSON] = useState("");
	const [fileInfo, setFileInfo] = useState(null);
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

	const handleBulkUpload = async () => {
		try {
			const parsed = JSON.parse(bulkJSON);
			if (!Array.isArray(parsed)) throw new Error("Bulk input must be an array");
			await dispatch(createBulkProducts(parsed)).unwrap();
			toast({
				title: "Bulk Upload",
				description: "Products uploaded successfully",
				status: "success",
				isClosable: true,
				position: "top-right",
			});
			setBulkJSON("");
		} catch (err) {
			toast({
				title: "Bulk Upload Failed",
				description: err.message || "Invalid JSON format",
				status: "error",
				isClosable: true,
				position: "top-right",
			});
		}
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const extension = file.name.split(".").pop().toLowerCase();
		const sizeKB = (file.size / 1024).toFixed(2);

		setFileInfo({
			name: file.name,
			extension,
			size: `${sizeKB} KB`,
		});

		const confirmUpload = window.confirm(`Upload file: "${file.name}" (${sizeKB} KB)?`);
		if (!confirmUpload) {
			setFileInfo(null);
			return;
		}

		if (extension === "csv") {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: async (results) => {
					try {
						const data = results.data.map((item) => ({
							name: item.name,
							price: parseFloat(item.price),
							image: item.image,
						}));
						await dispatch(createBulkProducts(data)).unwrap();
						toast({
							title: "CSV Upload",
							description: "Products uploaded successfully",
							status: "success",
							isClosable: true,
							position: "top-right",
						});
					} catch (error) {
						toast({
							title: "Upload Failed",
							description: error.message || "Invalid CSV content",
							status: "error",
							isClosable: true,
							position: "top-right",
						});
					}
				},
				error: (error) => {
					toast({
						title: "CSV Error",
						description: error.message || "Error reading CSV",
						status: "error",
						isClosable: true,
						position: "top-right",
					});
				},
			});
		} else if (extension === "xlsx" || extension === "xls") {
			const reader = new FileReader();
			reader.onload = async (evt) => {
				try {
					const data = evt.target.result;
					const workbook = XLSX.read(data, { type: "binary" });
					const sheet = workbook.SheetNames[0];
					const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

					const formatted = json.map((item) => ({
						name: item.name,
						price: parseFloat(item.price),
						image: item.image,
					}));

					await dispatch(createBulkProducts(formatted)).unwrap();
					toast({
						title: "Excel Upload",
						description: "Products uploaded successfully",
						status: "success",
						isClosable: true,
						position: "top-right",
					});
				} catch (error) {
					toast({
						title: "Upload Failed",
						description: error.message || "Invalid Excel content",
						status: "error",
						isClosable: true,
						position: "top-right",
					});
				}
			};
			reader.readAsBinaryString(file);
		} else {
			toast({
				title: "Unsupported File",
				description: "Only CSV and Excel files are supported",
				status: "warning",
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

								{/* CSV / Excel Upload */}
				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
						{fileInfo && (
							<Box fontSize="sm" color="gray.600" w="full" p={2} bg="gray.50" rounded="md" shadow="inner">
								<Text><b>File:</b> {fileInfo.name}</Text>
								<Text><b>Extension:</b> {fileInfo.extension}</Text>
								<Text><b>Size:</b> {fileInfo.size}</Text>
							</Box>
						)}
						<Text fontSize="sm" color="gray.500">
							Upload CSV or Excel file with columns: <b>name, price, image</b>
						</Text>
					</VStack>
				</Box>

				{/* Bulk Upload via JSON */}
				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Textarea
							placeholder='Paste products JSON array (e.g. [{"name":"Shirt","price":100,"image":"url"}])'
							value={bulkJSON}
							onChange={(e) => setBulkJSON(e.target.value)}
							rows={8}
							isInvalid={false}
							errorBorderColor="red.300"
						/>
						<Button colorScheme="green" onClick={handleBulkUpload} w="full">
							Add Bulk Products (JSON)
						</Button>
					</VStack>
				</Box>

								{/* Single Product Upload */}
				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
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

						<Input
							placeholder="Image URL"
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
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
