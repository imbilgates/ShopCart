import {
	Box,
	Image,
	Skeleton,
	SkeletonText,
	Heading,
	Flex,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ProductActions from "./ProductActions";
import UpdateProductModal from "./UpdateProductModal";

const ProductCard = ({ product, isLoading }) => {
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const { isOpen, onOpen, onClose } = useDisclosure();

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

						<ProductActions
							product={product}
							onEditClick={onOpen}
						/>
					</>
				)}
			</Box>

			<UpdateProductModal
				isOpen={isOpen}
				onClose={onClose}
				product={product}
				updatedProduct={updatedProduct}
				setUpdatedProduct={setUpdatedProduct}
			/>
		</Box>
	);
};

export default ProductCard;
