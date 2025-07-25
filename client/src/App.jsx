import { Box, useColorModeValue } from "@chakra-ui/react";
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import CreatePage from "./components/CreatePage/index"

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Box>
  )
}

export default App
