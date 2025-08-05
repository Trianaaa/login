import CommonModal from "@/Components/CommonModal";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  useColorModeValue,
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
  FiX,
  FiPlus
} from "react-icons/fi";
import useStoreEmployee from "../../store";

const CreateEmployee = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setData, data } = useStoreEmployee();
  
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

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSalarioChange = (value) => {
    setFormValues({ ...formValues, salario: value });
  };

  const handleIdChange = (value) => {
    setFormValues({ ...formValues, id: value });
  };

  const resetForm = () => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("https://api-service-3s0x.onrender.com/employee/new", {
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
      
      if (response.ok) {
        const newEmployee = await response.json();
        // Actualizar el store con el nuevo empleado
        setData([...data, newEmployee]);
        toast.success("¡Empleado creado correctamente!");
        resetForm();
        onClose();
      } else {
        throw new Error("Error al crear el empleado");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al crear el empleado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const gridColumns = useBreakpointValue({ base: 1, md: 2 });

  return (
    <>
      {/* Trigger Button */}
      <Button
        leftIcon={<FiPlus />}
        onClick={onOpen}
        colorScheme="green"
        size="lg"
        shadow="md"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        transition="all 0.2s"
      >
        Nuevo Empleado
      </Button>

      {/* Modal */}
      <CommonModal isOpen={isOpen} onClose={handleClose} size="4xl">
        <ModalHeader>
          <HStack spacing={3}>
            <Icon as={FiUser} boxSize={6} color="green.500" />
            <VStack align="start" spacing={0}>
              <Heading size="lg" color="gray.700">
                Nuevo Empleado
              </Heading>
              <Text color="gray.500" fontSize="sm" fontWeight="normal">
                Completa la información del nuevo empleado
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        
        <ModalCloseButton />
        
        <ModalBody>
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
                        borderColor={borderColor}
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
                        borderColor={borderColor}
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
                        <NumberInputField 
                          pl={10} 
                          placeholder="Número de cédula"
                          borderColor={borderColor}
                        />
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
                        borderColor={borderColor}
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
                        borderColor={borderColor}
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
                        <NumberInputField 
                          pl={10} 
                          placeholder="0"
                          borderColor={borderColor}
                        />
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
                    borderColor={borderColor}
                    pl={10}
                    rows={2}
                    resize="vertical"
                  />
                </InputGroup>
              </FormControl>

              {/* Foto URL */}
              <FormControl>
                <FormLabel color="gray.700" fontWeight="medium">
                  URL de la Foto (Opcional)
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
                    borderColor={borderColor}
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3} width="100%" justify="end">
            <Button
              variant="outline"
              leftIcon={<FiX />}
              onClick={handleClose}
              size="lg"
              minW="120px"
              isDisabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              colorScheme="green"
              leftIcon={<FiSave />}
              isLoading={isLoading}
              loadingText="Guardando..."
              size="lg"
              minW="120px"
            >
              Guardar Empleado
            </Button>
          </HStack>
        </ModalFooter>
      </CommonModal>
    </>
  );
};

export default CreateEmployee;
