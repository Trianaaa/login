import CommonModal from "@/Components/CommonModal";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Grid,
  GridItem,
  VStack,
  HStack,
  Icon,
  Text,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  FiAward,
  FiPlus
} from "react-icons/fi";
import { API_BASE_URL } from '@/config/api';
import { createProduct } from "../../services";

const CreateProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [formValues, setFormValues] = useState({
    id_Serial: "",
    Nombre: "",
    Categoria: "",
    Imagen: "",
    Modelo: "",
    Serie: "",
    Marca: "",
    Fabricante: "",
    id_Empleado: "",
  });

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const inputBg = useColorModeValue("white", "gray.700");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormValues({
      id_Serial: "",
      Nombre: "",
      Categoria: "",
      Imagen: "",
      Modelo: "",
      Serie: "",
      Marca: "",
      Fabricante: "",
      id_Empleado: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validar campos requeridos
      const requiredFields = ['Nombre', 'Categoria', 'Modelo', 'Serie', 'Marca', 'Fabricante', 'id_Empleado'];
      const missingFields = requiredFields.filter(field => !formValues[field]);
      
      if (missingFields.length > 0) {
        toast.error(`Por favor completa los campos: ${missingFields.join(', ')}`);
        return;
      }

      // Crear producto limpio sin campos vacíos
      const productToCreate = {
        id_Serial: formValues.id_Serial || "",
        Nombre: formValues.Nombre,
        Categoria: formValues.Categoria,
        Imagen: formValues.Imagen || "",
        Modelo: formValues.Modelo,
        Serie: formValues.Serie,
        Marca: formValues.Marca,
        Fabricante: formValues.Fabricante,
        id_Empleado: formValues.id_Empleado,
      };

      const response = await fetch(`${API_BASE_URL}/Products/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToCreate),
      });

      if (response.ok) {
        toast.success("¡Producto creado correctamente!");
        resetForm();
        onClose();
        // Recargar la página para mostrar el nuevo producto
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || 'Error al crear el producto');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al crear el producto");
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

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const gridColumns = useBreakpointValue({ base: 1, md: 2 });

  // Categorías predefinidas para mejor UX
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
      {/* Trigger Button */}
      <Button
        leftIcon={<FiPlus />}
        onClick={onOpen}
        colorScheme="purple"
        size="lg"
        shadow="md"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        transition="all 0.2s"
      >
        Nuevo Producto
      </Button>

      {/* Modal */}
      <CommonModal isOpen={isOpen} onClose={handleClose} size="6xl">
        <ModalHeader 
          bg={headerBg}
          borderBottom="1px solid"
          borderColor={borderColor}
          py={6}
        >
          <Center>
            <HStack spacing={3}>
              <Icon as={FiPackage} boxSize={6} color="purple.500" />
              <VStack align="start" spacing={0}>
                <Heading size="lg" color={textColor}>
                  Nuevo Producto
                </Heading>
                <Text color={placeholderColor} fontSize="sm" fontWeight="normal">
                  Registra un nuevo producto en el inventario
                </Text>
              </VStack>
            </HStack>
          </Center>
        </ModalHeader>
        
        <ModalCloseButton />
        
        <ModalBody maxH="70vh" overflowY="auto" p={8}>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6}>
              {/* Información Básica */}
              <Box width="100%">
                <HStack spacing={2} mb={4}>
                  <Icon as={FiTag} color="purple.500" />
                  <Heading size="md" color={textColor}>
                    Información Básica
                  </Heading>
                </HStack>
                
                <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4}>
                  {/* Nombre */}
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">
                        Nombre del Producto
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiPackage} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Nombre"
                          value={formValues.Nombre}
                          onChange={handleChange}
                          placeholder="Ej: Laptop Dell Inspiron"
                          focusBorderColor="purple.400"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>

                  {/* Categoría */}
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">
                        Categoría
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiLayers} color={placeholderColor} />
                        </InputLeftElement>
                        <Select
                          name="Categoria"
                          value={formValues.Categoria}
                          onChange={handleChange}
                          placeholder="Selecciona una categoría"
                          focusBorderColor="purple.400"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
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

                  {/* Marca */}
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">
                        Marca
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiAward} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Marca"
                          value={formValues.Marca}
                          onChange={handleChange}
                          placeholder="Ej: Dell"
                          focusBorderColor="purple.400"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>

                  {/* Modelo */}
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">
                        Modelo
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiTool} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Modelo"
                          value={formValues.Modelo}
                          onChange={handleChange}
                          placeholder="Ej: Inspiron 15 3000"
                          focusBorderColor="purple.400"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>

              <Divider />

              {/* Especificaciones Técnicas */}
              <Box width="100%">
                <HStack spacing={2} mb={4}>
                  <Icon as={FiSettings} color="purple.500" />
                  <Heading size="md" color={textColor}>
                    Especificaciones Técnicas
                  </Heading>
                </HStack>
                
                <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4}>
                  {/* Serie */}
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">
                        Serie
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiHash} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Serie"
                          value={formValues.Serie}
                          onChange={handleChange}
                          placeholder="Ej: 3000 Series"
                          focusBorderColor="purple.400"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>

                  {/* Fabricante */}
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">
                        Fabricante
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiTool} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="Fabricante"
                          value={formValues.Fabricante}
                          onChange={handleChange}
                          placeholder="Ej: Dell Technologies"
                          focusBorderColor="purple.400"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
                          _placeholder={{ color: placeholderColor }}
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>

                  {/* Serial */}
                  <GridItem>
                    <FormControl>
                      <FormLabel color={textColor} fontWeight="medium">
                        Serial del Equipo
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiHash} color={placeholderColor} />
                        </InputLeftElement>
                        <Input
                          name="id_Serial"
                          value={formValues.id_Serial}
                          onChange={handleChange}
                          placeholder="Ej: SN123456789"
                          focusBorderColor="purple.400"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
                          _placeholder={{ color: placeholderColor }}
                          textTransform="uppercase"
                        />
                      </InputGroup>
                    </FormControl>
                  </GridItem>

                  {/* Empleado Asignado */}
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color={textColor} fontWeight="medium">
                        Empleado Asignado
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiUser} color={placeholderColor} />
                        </InputLeftElement>
                        <Select
                          name="id_Empleado"
                          value={formValues.id_Empleado}
                          onChange={handleChange}
                          placeholder={isLoading ? "Cargando empleados..." : "Selecciona un empleado"}
                          focusBorderColor="purple.400"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
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
                          <Spinner size="sm" color="purple.500" />
                          <Text fontSize="sm" color={placeholderColor}>
                            Cargando empleados...
                          </Text>
                        </HStack>
                      )}
                      {!isLoading && employees.length === 0 && (
                        <Alert status="warning" mt={2} borderRadius="md" size="sm">
                          <AlertIcon />
                          <Text fontSize="sm">
                            No hay empleados disponibles. Crea empleados primero.
                          </Text>
                        </Alert>
                      )}
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>

              <Divider />

              {/* Imagen */}
              <FormControl>
                <HStack spacing={2} mb={2}>
                  <Icon as={FiImage} color="purple.500" />
                  <FormLabel color={textColor} fontWeight="medium" mb={0}>
                    URL de la Imagen
                  </FormLabel>
                </HStack>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiImage} color={placeholderColor} />
                  </InputLeftElement>
                  <Input
                    name="Imagen"
                    value={formValues.Imagen}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen-producto.jpg"
                    focusBorderColor="purple.400"
                    borderColor={borderColor}
                    bg={inputBg}
                    color={textColor}
                    _placeholder={{ color: placeholderColor }}
                  />
                </InputGroup>
                <Text fontSize="xs" color={placeholderColor} mt={1}>
                  Proporciona una URL válida para la imagen del producto (opcional)
                </Text>
              </FormControl>

              {employees.length === 0 && !isLoading && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">
                      No se puede crear el producto
                    </Text>
                    <Text fontSize="sm">
                      Debe haber al menos un empleado registrado para asignar el producto.
                    </Text>
                  </VStack>
                </Alert>
              )}
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter 
          borderTop="1px solid" 
          borderColor={borderColor}
          py={6}
        >
          <Center w="full" gap={4}>
            <Button
              variant="outline"
              leftIcon={<FiX />}
              onClick={handleClose}
              size="md"
              borderRadius="md"
              minW="120px"
              isDisabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              colorScheme="purple"
              leftIcon={<FiSave />}
              isLoading={isSubmitting}
              loadingText="Guardando..."
              size="md"
              borderRadius="md"
              minW="120px"
              isDisabled={employees.length === 0}
            >
              Guardar Producto
            </Button>
          </Center>
        </ModalFooter>
      </CommonModal>
    </>
  );
};

export default CreateProduct;
