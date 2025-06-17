import { Box, Button, Textarea, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBulkProducts } from "../../slice/productSlice";

const BulkUploadSection = () => {
	const [bulkJSON, setBulkJSON] = useState("");
	const toast = useToast();
	const dispatch = useDispatch();

	const handleBulkUpload = async () => {
		try {
			const parsed = JSON.parse(bulkJSON);
			if (!Array.isArray(parsed)) throw new Error("Bulk input must be an array");
			await dispatch(createBulkProducts(parsed)).unwrap();
			toast({ title: "Bulk Upload", description: "Products uploaded successfully", status: "success", isClosable: true, position: "top-right" });
			setBulkJSON("");
		} catch (err) {
			toast({ title: "Bulk Upload Failed", description: err.message || "Invalid JSON format", status: "error", isClosable: true, position: "top-right" });
		}
	};

	return (
		<Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded="lg" shadow="md">
			<VStack spacing={4}>
				<Textarea
					placeholder='Paste JSON array like [{"name":"T-Shirt","price":150,"image":"url"}]'
					value={bulkJSON}
					onChange={(e) => setBulkJSON(e.target.value)}
					rows={6}
				/>
				<Button colorScheme="green" w="full" onClick={handleBulkUpload}>
					Add Bulk Products (JSON)
				</Button>
			</VStack>
		</Box>
	);
};

export default BulkUploadSection;
