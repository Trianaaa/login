import CommonModal from "@/Components/CommonModal/CommonModal";
import { 
  Box, 
  Button, 
  Heading, 
  useDisclosure, 
  Container,
  VStack,
  HStack,
  Flex,
  useBreakpointValue,
  IconButton,
  Tooltip,
  Badge,
  Divider
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { FiRefreshCw, FiPlus, FiPackage, FiUsers } from "react-icons/fi";
import TableEmployee from "../../components/TableEmployee";
import { getEmployee } from "../../services";
import useStoreEmployee from "../../store";
import EmployeeForm from "./createEmployee";

const ListEmployee = () => {
  const { setData, data } = useStoreEmployee();
  
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

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const spacing = useBreakpointValue({ base: 4, md: 6 });

  return (
    <Container maxW="7xl" py={spacing}>
      <VStack spacing={spacing} align="stretch" minH="90vh">
        {/* Header Section */}
        <Box 
          bg="white" 
          p={6} 
          borderRadius="xl" 
          shadow="sm" 
          border="1px" 
          borderColor="gray.100"
        >
          <VStack spacing={4}>
            <HStack spacing={2}>
              <FiUsers size={24} color="#3182CE" />
              <Heading 
                size={useBreakpointValue({ base: "lg", md: "xl" })} 
                color="gray.700"
                textAlign="center"
              >
                Gestión de Empleados
              </Heading>
            </HStack>
            
            <HStack spacing={2}>
              <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full">
                Total: {data?.length || 0} empleados
              </Badge>
            </HStack>
          </VStack>
        </Box>

        {/* Action Buttons */}
        <Box 
          bg="white" 
          p={4} 
          borderRadius="xl" 
          shadow="sm" 
          border="1px" 
          borderColor="gray.100"
        >
          {isMobile ? (
            <VStack spacing={3}>
              <HStack spacing={2} width="100%">
                <Tooltip label="Actualizar lista">
                  <IconButton
                    icon={<FiRefreshCw />}
                    colorScheme="blue"
                    variant="outline"
                    size={buttonSize}
                    onClick={() => getEmployee(setData)}
                    flex={1}
                  />
                </Tooltip>
                <Button
                  leftIcon={<FiPlus />}
                  colorScheme="green"
                  size={buttonSize}
                  onClick={onOpen}
                  flex={2}
                >
                  Nuevo Empleado
                </Button>
              </HStack>
              <Button
                leftIcon={<FiPackage />}
                onClick={goToProducts}
                colorScheme="purple"
                variant="outline"
                size={buttonSize}
                width="100%"
              >
                Ver Productos
              </Button>
            </VStack>
          ) : (
            <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
              <Button
                leftIcon={<FiRefreshCw />}
                colorScheme="blue"
                variant="outline"
                size={buttonSize}
                onClick={() => getEmployee(setData)}
              >
                Actualizar
              </Button>
              
              <Button
                leftIcon={<FiPlus />}
                colorScheme="green"
                size={buttonSize}
                onClick={onOpen}
              >
                Crear Nuevo Empleado
              </Button>
              
              <Button
                leftIcon={<FiPackage />}
                onClick={goToProducts}
                colorScheme="purple"
                variant="outline"
                size={buttonSize}
              >
                Ver Productos
              </Button>
            </Flex>
          )}
        </Box>

        {/* Table Section */}
        <Box 
          bg="white" 
          borderRadius="xl" 
          shadow="sm" 
          border="1px" 
          borderColor="gray.100"
          overflow="hidden"
          flex={1}
        >
          <Box p={4} bg="gray.50" borderBottom="1px" borderColor="gray.200">
            <Heading size="md" color="gray.700">
              Lista de Empleados
            </Heading>
          </Box>
          <Box p={4} height="100%">
            <TableEmployee />
          </Box>
        </Box>

        {/* Modal */}
        <CommonModal isOpen={isOpen} onClose={onClose}>
          <EmployeeForm onClose={onClose} />
        </CommonModal>
      </VStack>
    </Container>
  );
};

export default ListEmployee;
