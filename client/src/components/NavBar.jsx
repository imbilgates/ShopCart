import { Button, Container, Flex, HStack, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuPlus, LuSun } from "react-icons/lu";
import Cart from "./Cart";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import CartButton from "./UI/CartButton";

const NavBar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const items = useSelector((state) => state.cart.items);


	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<LuPlus fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>

					<CartButton />
				</HStack>
			</Flex>
		</Container>
	);
};
export default NavBar;