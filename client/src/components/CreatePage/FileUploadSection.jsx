import {
	Box,
	Input,
	Text,
	useColorModeValue,
	useToast,
	VStack
} from "@chakra-ui/react";
import { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { createBulkProducts } from "../../slice/productSlice";

const FileUploadSection = () => {
	const [fileInfo, setFileInfo] = useState(null);
	const toast = useToast();
	const dispatch = useDispatch();

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const extension = file.name.split(".").pop().toLowerCase();
		const sizeKB = (file.size / 1024).toFixed(2);

		setFileInfo({ name: file.name, extension, size: `${sizeKB} KB` });

		const confirmUpload = window.confirm(`Upload file: "${file.name}" (${sizeKB} KB)?`);
		if (!confirmUpload) return;

		if (extension === "csv") {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: async (results) => {
					const data = results.data.map((item) => ({
						name: item.name,
						price: parseFloat(item.price),
						image: item.image,
					}));
					try {
						await dispatch(createBulkProducts(data)).unwrap();
						toast({ title: "CSV Upload", description: "Products uploaded successfully", status: "success", isClosable: true, position: "top-right" });
					} catch (err) {
						toast({ title: "Upload Failed", description: err.message || "Invalid CSV content", status: "error", isClosable: true, position: "top-right" });
					}
				},
				error: (error) => {
					toast({ title: "CSV Error", description: error.message, status: "error", isClosable: true, position: "top-right" });
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
					toast({ title: "Excel Upload", description: "Products uploaded successfully", status: "success", isClosable: true, position: "top-right" });
				} catch (error) {
					toast({ title: "Upload Failed", description: error.message || "Invalid Excel content", status: "error", isClosable: true, position: "top-right" });
				}
			};
			reader.readAsBinaryString(file);
		} else {
			toast({ title: "Unsupported File", description: "Only CSV and Excel files are supported", status: "warning", isClosable: true, position: "top-right" });
		}
	};

	return (
		<Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded="lg" shadow="md">
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
					Upload CSV or Excel file with <b>name, price, image</b>
				</Text>
			</VStack>
		</Box>
	);
};

export default FileUploadSection;
