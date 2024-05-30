import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import TableEmployee from "../../components/TableEmployee";
import useStoreEmployee from "../../store";

const ListEmployee = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { setData } = useStoreEmployee();

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3002/employee");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los empleados");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p={4} height="100vh" display="flex" flexDirection="column" gap={2}>
      <Heading textAlign="center">Lista de empleados</Heading>
      <Box height={"100%"}>
        <TableEmployee />
      </Box>
    </Box>
  );
};

export default ListEmployee;
