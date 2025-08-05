import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { 
  FiUser, 
  FiMail, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiImage,
  FiCreditCard,
  FiSave,
  FiX
} from "react-icons/fi";

const EmployeeForm = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    foto: "",
    correo: "",
    direccion: "",
    cargo: "",
    salario: 0,
    id: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSalarioChange = (value) => {
    setFormValues({ ...formValues, salario: value });
  };

  const handleIdChange = (value) => {
    setFormValues({ ...formValues, id: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await fetch("https://api-service-3s0x.onrender.com/employee/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: formValues.nombre,
          Apellido: formValues.apellido,
          Foto: formValues.foto,
          Correo: formValues.correo,
          Direccion: formValues.direccion,
          Cargo: formValues.cargo,
          Salario: Number(formValues.salario),
          id: Number(formValues.id),
        }),
      });
      
      toast.success("¡Empleado creado correctamente!");
      setFormValues({
        nombre: "",
        apellido: "",
        foto: "",
        correo: "",
        direccion: "",
        cargo: "",
        salario: 0,
        id: 0,
      });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error al crear el empleado");
    } finally {
      setIsLoading(false);
    }
  };

  const gridColumns = useBreakpointValue({ base: 1, md: 2 });

  return (
    <Box maxW="4xl" mx="auto" p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <HStack justify="center" spacing={2} mb={2}>
            <Icon as={FiUser} boxSize={6} color="green.500" />
            <Heading size="lg" color="gray.700">
              Nuevo Empleado
            </Heading>
          </HStack>
          <Text color="gray.500" fontSize="sm">
            Completa la información del nuevo empleado
          </Text>
        </Box>

        {/* Form */}
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4} width="100%">
              {/* Nombre */}
              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="medium">
                    Nombre
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiUser} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="nombre"
                      value={formValues.nombre}
                      onChange={handleChange}
                      placeholder="Ingresa el nombre"
                      focusBorderColor="green.400"
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>

              {/* Apellido */}
              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="medium">
                    Apellido
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiUser} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="apellido"
                      value={formValues.apellido}
                      onChange={handleChange}
                      placeholder="Ingresa el apellido"
                      focusBorderColor="green.400"
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>

              {/* Cédula */}
              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="medium">
                    Cédula
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiCreditCard} color="gray.400" />
                    </InputLeftElement>
                    <NumberInput
                      value={formValues.id}
                      onChange={handleIdChange}
                      min={0}
                      focusBorderColor="green.400"
                    >
                      <NumberInputField pl={10} placeholder="Número de cédula" />
                    </NumberInput>
                  </InputGroup>
                </FormControl>
              </GridItem>

              {/* Correo */}
              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="medium">
                    Correo Electrónico
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiMail} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      name="correo"
                      value={formValues.correo}
                      onChange={handleChange}
                      placeholder="correo@empresa.com"
                      focusBorderColor="green.400"
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>

              {/* Cargo */}
              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="medium">
                    Cargo
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiBriefcase} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="cargo"
                      value={formValues.cargo}
                      onChange={handleChange}
                      placeholder="Ej: Desarrollador Frontend"
                      focusBorderColor="green.400"
                    />
                  </InputGroup>
                </FormControl>
              </GridItem>

              {/* Salario */}
              <GridItem>
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="medium">
                    Salario
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiDollarSign} color="gray.400" />
                    </InputLeftElement>
                    <NumberInput
                      value={formValues.salario}
                      onChange={handleSalarioChange}
                      min={0}
                      focusBorderColor="green.400"
                    >
                      <NumberInputField pl={10} placeholder="0" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </FormControl>
              </GridItem>
            </Grid>

            {/* Dirección - Full width */}
            <FormControl isRequired>
              <FormLabel color="gray.700" fontWeight="medium">
                Dirección
              </FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FiMapPin} color="gray.400" />
                </InputLeftElement>
                <Textarea
                  name="direccion"
                  value={formValues.direccion}
                  onChange={handleChange}
                  placeholder="Dirección completa del empleado"
                  focusBorderColor="green.400"
                  pl={10}
                  rows={2}
                />
              </InputGroup>
            </FormControl>

            {/* Foto URL */}
            <FormControl isRequired>
              <FormLabel color="gray.700" fontWeight="medium">
                URL de la Foto
              </FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FiImage} color="gray.400" />
                </InputLeftElement>
                <Input
                  name="foto"
                  value={formValues.foto}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/foto.jpg"
                  focusBorderColor="green.400"
                />
              </InputGroup>
            </FormControl>

            {/* Buttons */}
            <HStack spacing={3} width="100%" justify="center" pt={4}>
              <Button
                variant="outline"
                leftIcon={<FiX />}
                onClick={onClose}
                size="lg"
                minW="120px"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                leftIcon={<FiSave />}
                isLoading={isLoading}
                loadingText="Guardando..."
                size="lg"
                minW="120px"
              >
                Guardar
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default EmployeeForm;
