import CommonModal from "@/Components/CommonModal";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Select,
  VStack,
  useDisclosure,
  useColorModeValue,
  IconButton,
  Tooltip,
  Center,
  Text,
  Grid,
  GridItem,
  Divider,
  HStack,
  Icon,
  InputGroup,
  InputLeftElement,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPencil } from "react-icons/hi";
import { 
  FiPackage, 
  FiTag, 
  FiImage, 
  FiSettings, 
  FiHash,
  FiUser,
  FiSave,
  FiX,
  FiLayers,
  FiTool,
  FiAward
} from "react-icons/fi";
import { API_BASE_URL } from '@/config/api';

const EditProduct = ({ product, onSubmit }) => {
  const [formValues, setFormValues] = useState(product ?? {});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Color mode values
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "gray.700");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validar campos requeridos
      const requiredFields = ['Nombre', 'Categoria', 'Modelo', 'Serie', 'Marca', 'Fabricante'];
      const missingFields = requiredFields.filter(field => !formValues[field]);
      
      if (missingFields.length > 0) {
        toast.error(`Por favor completa los campos: ${missingFields.join(', ')}`);
        return;
      }

      if (onSubmit) {
        onSubmit(formValues);
      }
      onClose();
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error("Error al actualizar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/employee`);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los empleados");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getEmployees();
    }
  }, [isOpen]);

  useEffect(() => {
    setFormValues(product ?? {});
  }, [product]);

  // Categorías predefinidas
  const categorias = [
    "Computadoras",
    "Laptops",
    "Monitores",
    "Impresoras",
    "Teléfonos",
    "Tablets",
    "Accesorios",
    "Servidores",
    "Networking",
    "Otros"
  ];

  return (
    <>
      <Tooltip label="Editar producto" hasArrow>
        <IconButton
          icon={<HiPencil />}
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

      <CommonModal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalHeader 
          bg={headerBg}
          borderBottom="1px solid"
          borderColor={borderColor}
          py={6}
        >
          <Center>
            <HStack spacing={3}>
              <Icon as={FiPackage} boxSize={6} color="blue.500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="xl" fontWeight="600" color={textColor}>
                  Editar Producto
                </Text>
                <Text color={placeholderColor} fontSize="sm" fontWeight="normal">
                  Modifica la información del producto
                </Text>
              </VStack>
            </HStack>
          </Center>
        </ModalHeader>
        
        <ModalCloseButton />
        
        <ModalBody p={8} maxH="70vh" overflowY="auto">
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* Información Básica */}
              <Box width="100%">
                <HStack spacing={2} mb={4}>
                  <Icon as={FiTag} color="blue.500" />
                  <Text fontSize="md" fontWeight="600" color={textColor}>
                    Información Básica
                  </Text>
                </HStack>
                
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">Nombre</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiPackage} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Nombre"
                          value={formValues.Nombre || ""}
                          onChange={handleChange}
                          borderRadius="md"
                          bg={inputBg}
                          color={textColor}
                          borderColor={borderColor}
                          focusBorderColor="blue.400"
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">Categoría</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiLayers} color={placeholderColor} />
                        </InputLeftElement>
                        <Select
                          name="Categoria"
                          value={formValues.Categoria || ""}
                          onChange={handleChange}
                          borderRadius="md"
                          bg={inputBg}
                          color={textColor}
                          borderColor={borderColor}
                          focusBorderColor="blue.400"
                          pl={10}
                        >
                          {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                              {categoria}
                            </option>
                          ))}
                        </Select>
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">Marca</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiAward} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Marca"
                          value={formValues.Marca || ""}
                          onChange={handleChange}
                          borderRadius="md"
                          bg={inputBg}
                          color={textColor}
                          borderColor={borderColor}
                          focusBorderColor="blue.400"
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">Modelo</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiTool} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Modelo"
                          value={formValues.Modelo || ""}
                          onChange={handleChange}
                          borderRadius="md"
                          bg={inputBg}
                          color={textColor}
                          borderColor={borderColor}
                          focusBorderColor="blue.400"
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>

              <Divider />

              {/* Información Técnica */}
              <Box width="100%">
                <HStack spacing={2} mb={4}>
                  <Icon as={FiSettings} color="blue.500" />
                  <Text fontSize="md" fontWeight="600" color={textColor}>
                    Información Técnica
                  </Text>
                </HStack>
                
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">Serie</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiHash} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Serie"
                          value={formValues.Serie || ""}
                          onChange={handleChange}
                          borderRadius="md"
                          bg={inputBg}
                          color={textColor}
                          borderColor={borderColor}
                          focusBorderColor="blue.400"
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">Fabricante</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiTool} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Fabricante"
                          value={formValues.Fabricante || ""}
                          onChange={handleChange}
                          borderRadius="md"
                          bg={inputBg}
                          color={textColor}
                          borderColor={borderColor}
                          focusBorderColor="blue.400"
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                  
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel color={textColor} fontWeight="medium">Serial del Equipo</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiHash} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="id_Serial"
                          value={formValues.id_Serial || ""}
                          onChange={handleChange}
                          borderRadius="md"
                          bg={inputBg}
                          color={textColor}
                          borderColor={borderColor}
                          focusBorderColor="blue.400"
                          _placeholder={{ color: placeholderColor }}
                          textTransform="uppercase"
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>

              <Divider />

              {/* Información Adicional */}
              <Box width="100%">
                <HStack spacing={2} mb={4}>
                  <Icon as={FiImage} color="blue.500" />
                  <Text fontSize="md" fontWeight="600" color={textColor}>
                    Información Adicional
                  </Text>
                </HStack>
                
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel color={textColor} fontWeight="medium">URL de Imagen</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiImage} color={placeholderColor} />
                      </InputLeftElement>
                      <Input
                        name="Imagen"
                        value={formValues.Imagen || ""}
                        onChange={handleChange}
                        borderRadius="md"
                        bg={inputBg}
                        color={textColor}
                        borderColor={borderColor}
                        focusBorderColor="blue.400"
                        _placeholder={{ color: placeholderColor }}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel color={textColor} fontWeight="medium">Empleado Asignado</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiUser} color={placeholderColor} />
                      </InputLeftElement>
                      <Select
                        name="id_Empleado"
                        value={formValues.id_Empleado || ""}
                        onChange={handleChange}
                        placeholder={isLoading ? "Cargando empleados..." : "Selecciona un empleado"}
                        borderRadius="md"
                        bg={inputBg}
                        color={textColor}
                        borderColor={borderColor}
                        focusBorderColor="blue.400"
                        pl={10}
                        disabled={isLoading}
                      >
                        {employees.map((employee) => (
                          <option key={employee._id} value={employee._id}>
                            {employee.Nombre} {employee.Apellido} - {employee.Cargo}
                          </option>
                        ))}
                      </Select>
                    </InputGroup>
                    {isLoading && (
                      <HStack spacing={2} mt={2}>
                        <Spinner size="sm" color="blue.500" />
                        <Text fontSize="sm" color={placeholderColor}>
                          Cargando empleados...
                        </Text>
                      </HStack>
                    )}
                  </FormControl>
                </VStack>
              </Box>
            </VStack>
          </form>
        </ModalBody>
        
        <ModalFooter 
          borderTop="1px solid" 
          borderColor={borderColor}
          py={6}
        >
          <Center w="full" gap={4}>
            <Button 
              onClick={onClose}
              variant="outline"
              size="md"
              borderRadius="md"
              minW="120px"
              isDisabled={isSubmitting}
              leftIcon={<FiX />}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              colorScheme="blue"
              size="md"
              borderRadius="md"
              minW="120px"
              isLoading={isSubmitting}
              loadingText="Guardando..."
              leftIcon={<FiSave />}
            >
              Guardar Cambios
            </Button>
          </Center>
        </ModalFooter>
      </CommonModal>
    </>
  );
};

export default EditProduct;
