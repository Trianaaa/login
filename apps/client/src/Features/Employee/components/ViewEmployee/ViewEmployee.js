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
} from "@chakra-ui/react";
import { HiEye } from "react-icons/hi";

const ViewEmployee = ({ employee }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Color mode values - minimalistas
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const InfoCard = ({ label, value, isMonetary = false }) => (
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
        fontSize={isMonetary ? "lg" : "md"} 
        fontWeight="600" 
        color={textColor}
        fontFamily={isMonetary ? "mono" : "inherit"}
      >
        {isMonetary ? `$${parseFloat(value || 0).toLocaleString()}` : value}
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
              Detalles del Empleado
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
                  name={`${employee.Nombre} ${employee.Apellido}`}
                  src={employee.Foto}
                  bg="gray.300"
                />
                <Box textAlign="center">
                  <Text fontSize="2xl" fontWeight="700" color={textColor} mb={2}>
                    {employee.Nombre} {employee.Apellido}
                  </Text>
                  <Badge 
                    variant="outline"
                    colorScheme="gray"
                    borderRadius="full"
                    px={4}
                    py={1}
                    fontSize="sm"
                    fontWeight="500"
                  >
                    {employee.Cargo}
                  </Badge>
                </Box>
              </VStack>
            </Center>

            <Divider />

            {/* Información Personal */}
            <Box>
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información Personal
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <InfoCard 
                    label="Nombre Completo" 
                    value={`${employee.Nombre} ${employee.Apellido}`} 
                  />
                </GridItem>
                <GridItem>
                  <InfoCard 
                    label="Correo Electrónico" 
                    value={employee.Correo} 
                  />
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Información de Contacto */}
            <Box>
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información de Contacto
              </Text>
              <InfoCard 
                label="Dirección" 
                value={employee.Direccion} 
              />
            </Box>

            <Divider />

            {/* Información Laboral */}
            <Box>
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información Laboral
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <InfoCard 
                    label="Cargo" 
                    value={employee.Cargo} 
                  />
                </GridItem>
                <GridItem>
                  <InfoCard 
                    label="Salario" 
                    value={employee.Salario}
                    isMonetary={true}
                  />
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Información del Sistema */}
            <Box>
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información del Sistema
              </Text>
              <VStack spacing={4}>
                <InfoCard 
                  label="ID del Sistema" 
                  value={employee._id} 
                />
                {employee.id && (
                  <InfoCard 
                    label="ID de Empleado" 
                    value={employee.id} 
                  />
                )}
              </VStack>
            </Box>
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

export default ViewEmployee;