import { Container, SimpleGrid, Text, VStack, Skeleton, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slice/productSlice";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
    const dispatch = useDispatch();
    const { products, isFetching } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    Current Products 🚀
                </Text>

                {isFetching ? (
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3,
                        }}
                        spacing={10}
                        w={"full"}
                    >
                        {Array.from({ length: products?.length || 6 }).map((_, index) => (
                            <Box key={index} shadow='lg' rounded='lg' overflow='hidden'>
                                <Skeleton height='200px' />
                                <Box p={4}>
                                    <Skeleton height='20px' width='70%' mb={2} />
                                    <Skeleton height='20px' width='50%' mb={4} />
                                    <Skeleton height='30px' width='100%' />
                                </Box>
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3,
                        }}
                        spacing={10}
                        w={"full"}
                    >
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </SimpleGrid>
                )}

                {!isFetching && products?.length === 0 && (
                    <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                        No products found 😢{" "}
                        <Link to={"/create"}>
                            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;
