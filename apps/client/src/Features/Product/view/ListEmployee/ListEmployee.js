import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import TableProduct from "../../components/TableProduct";
import useStoreProduct from "../../store";

const ListProduct = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { setData } = useStoreProduct();

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3002/product");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los productos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p={4} height="100vh" display="flex" flexDirection="column" gap={2}>
      <Heading textAlign="center">Lista de productos de la empresa</Heading>
      <Box height={"100%"}>
        <TableProduct />
      </Box>
    </Box>
  );
};

export default ListProduct;
