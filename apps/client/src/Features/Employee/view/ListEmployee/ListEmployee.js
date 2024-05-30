import {
  Box,
  Button,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import TableEmployee from "../../components/TableEmployee";
import useStoreEmployee from "../../store";
import EmployeeForm from "./createEmployee";

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

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={4} height="100vh" display="flex" flexDirection="column" gap={2}>
      <Heading textAlign="center">Lista de empleados</Heading>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          colorScheme="blue"
          onClick={() => {
            getEmployees();
          }}
          isLoading={isLoading}
        >
          Actualizar
        </Button>
        <Button colorScheme="green" onClick={onOpen}>
          Crear nuevo empleado
        </Button>
        <Button colorScheme="red">Ver productos</Button>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <EmployeeForm onClose={onClose} />
        </ModalContent>
      </Modal>
      <Box height={"100%"}>
        <TableEmployee />
      </Box>
    </Box>
  );
};

export default ListEmployee;
