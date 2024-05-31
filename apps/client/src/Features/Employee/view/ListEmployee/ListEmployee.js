import CommonModal from "@/Components/CommonModal/CommonModal";
import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import TableEmployee from "../../components/TableEmployee";
import { getEmployee } from "../../services";
import useStoreEmployee from "../../store";
import EmployeeForm from "./createEmployee";

const ListEmployee = () => {
  const { setData } = useStoreEmployee();
  useEffect(() => {
    getEmployee(setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const goToProducts = () => {
    router.push("/products");
  };

  return (
    <Box p={4} height="100vh" display="flex" flexDirection="column" gap={2}>
      <Heading textAlign="center">Lista de empleados</Heading>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button colorScheme="blue" onClick={() => getEmployee(setData)}>
          Actualizar
        </Button>
        <Button colorScheme="green" onClick={onOpen}>
          Crear nuevo empleado
        </Button>
        <Button onClick={goToProducts} colorScheme="red">
          Ver productos
        </Button>
      </Box>
      <CommonModal isOpen={isOpen} onClose={onClose}>
        <EmployeeForm onClose={onClose} />
      </CommonModal>
      <Box height={"100%"}>
        <TableEmployee />
      </Box>
    </Box>
  );
};

export default ListEmployee;
