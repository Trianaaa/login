import CommonModal from "@/Components/CommonModal";
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Divider,
  Box,
  useColorModeValue,
  IconButton,
  Tooltip,
  Flex,
  Center,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { HiEye, HiCube } from "react-icons/hi";

const ViewProduct = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Color mode values - minimalistas
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const InfoCard = ({ label, value }) => (
    <Box
      p={4}
      bg={cardBg}
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
    >
      <Text fontSize="xs" fontWeight="500" color={labelColor} mb={1}>
        {label}
      </Text>
      <Text 
        fontSize="md" 
        fontWeight="600" 
        color={textColor}
      >
        {value || "N/A"}
      </Text>
    </Box>
  );

  return (
    <>
      <Tooltip label="Ver detalles" hasArrow>
        <IconButton
          icon={<HiEye />}
          size="sm"
          variant="ghost"
          colorScheme="gray"
          borderRadius="md"
          onClick={onOpen}
          _hover={{
            bg: useColorModeValue("gray.100", "gray.600"),
          }}
          transition="all 0.2s"
        />
      </Tooltip>

      <CommonModal isOpen={isOpen} onClose={onClose} size="xl">
        {/* Header simplificado */}
        <ModalHeader 
          bg={headerBg}
          borderBottom="1px solid"
          borderColor={borderColor}
          py={6}
        >
          <Center>
            <Text fontSize="xl" fontWeight="600" color={textColor}>
              Detalles del Producto
            </Text>
          </Center>
        </ModalHeader>
        
        <ModalCloseButton />
        
        <ModalBody p={8}>
          <VStack spacing={8} align="stretch">
            {/* Información Principal Centrada */}
            <Center>
              <VStack spacing={4}>
                <Avatar 
                  size="2xl" 
                  name={product.Nombre}
                  src={product.Imagen}
                  bg="blue.500"
                  icon={<HiCube />}
                />
                <Box textAlign="center">
                  <Text fontSize="2xl" fontWeight="700" color={textColor} mb={2}>
                    {product.Nombre}
                  </Text>
                  <HStack spacing={2} justify="center">
                    <Badge 
                      variant="outline"
                      colorScheme="blue"
                      borderRadius="full"
                      px={4}
                      py={1}
                      fontSize="sm"
                      fontWeight="500"
                    >
                      {product.Categoria}
                    </Badge>
                    <Badge 
                      variant="outline"
                      colorScheme="purple"
                      borderRadius="full"
                      px={4}
                      py={1}
                      fontSize="sm"
                      fontWeight="500"
                    >
                      {product.Marca}
                    </Badge>
                  </HStack>
                </Box>
              </VStack>
            </Center>

            <Divider />

            {/* Información del Producto */}
            <Box>
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información del Producto
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <InfoCard 
                    label="Nombre" 
                    value={product.Nombre} 
                  />
                </GridItem>
                <GridItem>
                  <InfoCard 
                    label="Categoría" 
                    value={product.Categoria} 
                  />
                </GridItem>
                <GridItem>
                  <InfoCard 
                    label="Marca" 
                    value={product.Marca} 
                  />
                </GridItem>
                <GridItem>
                  <InfoCard 
                    label="Modelo" 
                    value={product.Modelo} 
                  />
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Información Técnica */}
            <Box>
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información Técnica
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <InfoCard 
                    label="Serie" 
                    value={product.Serie} 
                  />
                </GridItem>
                <GridItem>
                  <InfoCard 
                    label="Fabricante" 
                    value={product.Fabricante} 
                  />
                </GridItem>
                {product.id_Serial && (
                  <GridItem colSpan={2}>
                    <InfoCard 
                      label="Serial del Equipo" 
                      value={product.id_Serial} 
                    />
                  </GridItem>
                )}
              </Grid>
            </Box>

            <Divider />

            {/* Información del Sistema */}
            <Box>
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información del Sistema
              </Text>
              <InfoCard 
                label="ID del Sistema" 
                value={product._id} 
              />
            </Box>

            {/* Imagen del Producto */}
            {product.Imagen && (
              <>
                <Divider />
                <Box>
                  <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                    Imagen del Producto
                  </Text>
                  <Center>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      border="1px solid"
                      borderColor={borderColor}
                      maxW="300px"
                    >
                      <Image 
                        src={product.Imagen} 
                        alt={product.Nombre}
                        fallback={
                          <Center h="200px" bg={cardBg}>
                            <HiCube size="50px" color="gray" />
                          </Center>
                        }
                      />
                    </Box>
                  </Center>
                </Box>
              </>
            )}
          </VStack>
        </ModalBody>
        
        <ModalFooter 
          borderTop="1px solid" 
          borderColor={borderColor}
          py={6}
        >
          <Center w="full">
            <Button 
              onClick={onClose}
              variant="outline"
              size="md"
              borderRadius="md"
              minW="120px"
              _hover={{
                bg: useColorModeValue("gray.50", "gray.600"),
              }}
            >
              Cerrar
            </Button>
          </Center>
        </ModalFooter>
      </CommonModal>
    </>
  );
};

export default ViewProduct;