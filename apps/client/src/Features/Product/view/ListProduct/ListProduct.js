import CommonModal from "@/Components/CommonModal";
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
  Spinner,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FiRefreshCw, FiPlus, FiUsers, FiPackage } from "react-icons/fi";
import TableProduct from "../../components/TableProduct";
import useStoreProduct from "../../store";
import ProductsForm from "./createProduct";

const ListProduct = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { setData, data } = useStoreProduct();

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api-service-3s0x.onrender.com/products");
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

  const router = useRouter();
  const goToEmployees = () => {
    router.push("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <FiPackage size={24} color="#805AD5" />
              <Heading 
                size={useBreakpointValue({ base: "lg", md: "xl" })} 
                color="gray.700"
                textAlign="center"
              >
                Gestión de Productos
              </Heading>
            </HStack>
            
            <HStack spacing={2}>
              <Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full">
                Total: {data?.length || 0} productos
              </Badge>
              {isLoading && (
                <HStack spacing={2}>
                  <Spinner size="sm" color="purple.500" />
                  <Badge colorScheme="gray" variant="outline">
                    Actualizando...
                  </Badge>
                </HStack>
              )}
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
                    colorScheme="purple"
                    variant="outline"
                    size={buttonSize}
                    onClick={getProduct}
                    isLoading={isLoading}
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
                  Nuevo Producto
                </Button>
              </HStack>
              <Button
                leftIcon={<FiUsers />}
                onClick={goToEmployees}
                colorScheme="blue"
                variant="outline"
                size={buttonSize}
                width="100%"
              >
                Ver Empleados
              </Button>
            </VStack>
          ) : (
            <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
              <Button
                leftIcon={<FiRefreshCw />}
                colorScheme="purple"
                variant="outline"
                size={buttonSize}
                onClick={getProduct}
                isLoading={isLoading}
                loadingText="Actualizando"
              >
                Actualizar
              </Button>
              
              <Button
                leftIcon={<FiPlus />}
                colorScheme="green"
                size={buttonSize}
                onClick={onOpen}
              >
                Crear Nuevo Producto
              </Button>
              
              <Button
                leftIcon={<FiUsers />}
                onClick={goToEmployees}
                colorScheme="blue"
                variant="outline"
                size={buttonSize}
              >
                Ver Empleados
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
              Catálogo de Productos
            </Heading>
          </Box>
          <Box p={4} height="100%">
            {isLoading ? (
              <Flex justify="center" align="center" height="200px">
                <VStack spacing={3}>
                  <Spinner size="lg" color="purple.500" />
                  <Box color="gray.500">Cargando productos...</Box>
                </VStack>
              </Flex>
            ) : data?.length === 0 ? (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                No hay productos registrados. ¡Crea el primer producto!
              </Alert>
            ) : (
              <TableProduct />
            )}
          </Box>
        </Box>

        {/* Modal */}
        <CommonModal isOpen={isOpen} onClose={onClose}>
          <ProductsForm onClose={onClose} />
        </CommonModal>
      </VStack>
    </Container>
  );
};

export default ListProduct;
