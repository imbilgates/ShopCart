import { Container, Heading, VStack } from "@chakra-ui/react";
import FileUploadSection from "./FileUploadSection";
import BulkUploadSection from "./BulkUploadSection";
import ProductForm from "./ProductForm";

const CreatePage = () => {
	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as="h1" size="2xl" textAlign="center" mb={8}>
					Create New Product
				</Heading>
				<FileUploadSection />
				<BulkUploadSection />
				<ProductForm />
			</VStack>
		</Container>
	);
};

export default CreatePage;
