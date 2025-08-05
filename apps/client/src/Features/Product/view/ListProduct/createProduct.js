import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Grid,
  GridItem,
  VStack,
  HStack,
  Icon,
  Text,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  Textarea,
  Spinner,
  Alert,
  AlertIcon,
  Badge,
  Divider,
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
  FiAward
} from "react-icons/fi";

const ProductsForm = ({ onClose }) => {
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

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api-service-3s0x.onrender.com/products/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_Serial: formValues.id_Serial,
          Nombre: formValues.Nombre,
          Categoria: formValues.Categoria,
          Imagen: formValues.Imagen,
          Modelo: formValues.Modelo,
          Serie: formValues.Serie,
          Marca: formValues.Marca,
          Fabricante: formValues.Fabricante,
          id_Empleado: formValues.id_Empleado,
        }),
      });

      if (response.ok) {
        toast.success("¡Producto creado correctamente!");
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
        onClose();
      } else {
        throw new Error('Error al crear el producto');
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al crear el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api-service-3s0x.onrender.com/employee");
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
    getEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Box maxW="5xl" mx="auto" p={6} maxH="80vh" overflowY="auto">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <HStack justify="center" spacing={2} mb={2}>
            <Icon as={FiPackage} boxSize={6} color="purple.500" />
            <Heading size="lg" color="gray.700">
              Nuevo Producto
            </Heading>
          </HStack>
          <Text color="gray.500" fontSize="sm">
            Registra un nuevo producto en el inventario
          </Text>
        </Box>

        <Divider />

        {/* Form */}
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6}>
            {/* Información Básica */}
            <Box width="100%">
              <HStack spacing={2} mb={4}>
                <Icon as={FiTag} color="purple.500" />
                <Heading size="md" color="gray.700">
                  Información Básica
                </Heading>
              </HStack>
              
              <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4}>
                {/* Serial */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">
                      Serial del Equipo
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiHash} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        name="id_Serial"
                        value={formValues.id_Serial}
                        onChange={handleChange}
                        placeholder="Ej: SN123456789"
                        focusBorderColor="purple.400"
                        textTransform="uppercase"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Nombre */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">
                      Nombre del Producto
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiPackage} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        name="Nombre"
                        value={formValues.Nombre}
                        onChange={handleChange}
                        placeholder="Ej: Laptop Dell Inspiron"
                        focusBorderColor="purple.400"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Categoría */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">
                      Categoría
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiLayers} color="gray.400" />
                      </InputLeftElement>
                      <Select
                        name="Categoria"
                        value={formValues.Categoria}
                        onChange={handleChange}
                        placeholder="Selecciona una categoría"
                        focusBorderColor="purple.400"
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

                {/* Empleado Asignado */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">
                      Empleado Asignado
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiUser} color="gray.400" />
                      </InputLeftElement>
                      <Select
                        name="id_Empleado"
                        value={formValues.id_Empleado}
                        onChange={handleChange}
                        placeholder={isLoading ? "Cargando empleados..." : "Selecciona un empleado"}
                        focusBorderColor="purple.400"
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
                        <Text fontSize="sm" color="gray.500">
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

            {/* Especificaciones Técnicas */}
            <Box width="100%">
              <HStack spacing={2} mb={4}>
                <Icon as={FiSettings} color="purple.500" />
                <Heading size="md" color="gray.700">
                  Especificaciones Técnicas
                </Heading>
              </HStack>
              
              <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4}>
                {/* Modelo */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">
                      Modelo
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiTool} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        name="Modelo"
                        value={formValues.Modelo}
                        onChange={handleChange}
                        placeholder="Ej: Inspiron 15 3000"
                        focusBorderColor="purple.400"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Serie */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">
                      Serie
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiHash} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        name="Serie"
                        value={formValues.Serie}
                        onChange={handleChange}
                        placeholder="Ej: 3000 Series"
                        focusBorderColor="purple.400"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Marca */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">
                      Marca
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiAward} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        name="Marca"
                        value={formValues.Marca}
                        onChange={handleChange}
                        placeholder="Ej: Dell"
                        focusBorderColor="purple.400"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Fabricante */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">
                      Fabricante
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiTool} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        name="Fabricante"
                        value={formValues.Fabricante}
                        onChange={handleChange}
                        placeholder="Ej: Dell Technologies"
                        focusBorderColor="purple.400"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Imagen */}
            <FormControl isRequired>
              <HStack spacing={2} mb={2}>
                <Icon as={FiImage} color="purple.500" />
                <FormLabel color="gray.700" fontWeight="medium" mb={0}>
                  URL de la Imagen
                </FormLabel>
              </HStack>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FiImage} color="gray.400" />
                </InputLeftElement>
                <Input
                  name="Imagen"
                  value={formValues.Imagen}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen-producto.jpg"
                  focusBorderColor="purple.400"
                />
              </InputGroup>
              <Text fontSize="xs" color="gray.500" mt={1}>
                Proporciona una URL válida para la imagen del producto
              </Text>
            </FormControl>

            {/* Buttons */}
            <HStack spacing={3} width="100%" justify="center" pt={4}>
              <Button
                variant="outline"
                leftIcon={<FiX />}
                onClick={onClose}
                size="lg"
                minW="120px"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                colorScheme="purple"
                leftIcon={<FiSave />}
                isLoading={isSubmitting}
                loadingText="Guardando..."
                size="lg"
                minW="120px"
                disabled={employees.length === 0}
              >
                Guardar Producto
              </Button>
            </HStack>

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
      </VStack>
    </Box>
  );
};

export default ProductsForm;
