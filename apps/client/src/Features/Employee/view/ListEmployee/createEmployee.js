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
  useColorMode,
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
import { API_BASE_URL } from '@/config/api';

const CreateEmployee = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setData, data } = useStoreEmployee();
  const { colorMode } = useColorMode();
  
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

  // Enhanced color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const labelColor = useColorModeValue("gray.700", "gray.300");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const inputBg = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("gray.400", "gray.500");
  const buttonBg = useColorModeValue("green.500", "green.600");
  const buttonHoverBg = useColorModeValue("green.600", "green.700");

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
      const response = await fetch(`${API_BASE_URL}/Employee/new`, {
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el empleado");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al crear el empleado");
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
      {/* Trigger Button with Dark Mode Support */}
      <Button
        leftIcon={<FiPlus />}
        onClick={onOpen}
        bg={buttonBg}
        color="white"
        size="lg"
        shadow="md"
        _hover={{
          bg: buttonHoverBg,
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.2s"
      >
        Nuevo Empleado
      </Button>

      {/* Modal with Dark Mode Support */}
      <CommonModal isOpen={isOpen} onClose={handleClose} size="4xl">
        <ModalHeader
          bg={headerBg}
          borderBottom="1px solid"
          borderColor={borderColor}
          borderTopRadius="md"
        >
          <HStack spacing={3}>
            <Icon as={FiUser} boxSize={6} color={buttonBg} />
            <VStack align="start" spacing={0}>
              <Heading size="lg" color={textColor}>
                Nuevo Empleado
              </Heading>
              <Text color={placeholderColor} fontSize="sm" fontWeight="normal">
                Completa la información del nuevo empleado
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        
        <ModalCloseButton color={textColor} />
        
        <ModalBody bg={bgColor} py={6}>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap={4} width="100%">
                {/* Nombre */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color={labelColor} fontWeight="medium" fontSize="sm">
                      Nombre
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiUser} color={iconColor} />
                      </InputLeftElement>
                      <Input
                        name="nombre"
                        value={formValues.nombre}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre"
                        focusBorderColor={buttonBg}
                        borderColor={borderColor}
                        bg={inputBg}
                        color={textColor}
                        _placeholder={{ color: placeholderColor }}
                        _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Apellido */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color={labelColor} fontWeight="medium" fontSize="sm">
                      Apellido
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiUser} color={iconColor} />
                      </InputLeftElement>
                      <Input
                        name="apellido"
                        value={formValues.apellido}
                        onChange={handleChange}
                        placeholder="Ingresa el apellido"
                        focusBorderColor={buttonBg}
                        borderColor={borderColor}
                        bg={inputBg}
                        color={textColor}
                        _placeholder={{ color: placeholderColor }}
                        _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Cédula */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color={labelColor} fontWeight="medium" fontSize="sm">
                      Cédula
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiCreditCard} color={iconColor} />
                      </InputLeftElement>
                      <NumberInput
                        value={formValues.id}
                        onChange={handleIdChange}
                        min={0}
                        focusBorderColor={buttonBg}
                      >
                        <NumberInputField 
                          pl={10} 
                          placeholder="Número de cédula"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
                          _placeholder={{ color: placeholderColor }}
                          _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                        />
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Correo */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color={labelColor} fontWeight="medium" fontSize="sm">
                      Correo Electrónico
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiMail} color={iconColor} />
                      </InputLeftElement>
                      <Input
                        type="email"
                        name="correo"
                        value={formValues.correo}
                        onChange={handleChange}
                        placeholder="correo@empresa.com"
                        focusBorderColor={buttonBg}
                        borderColor={borderColor}
                        bg={inputBg}
                        color={textColor}
                        _placeholder={{ color: placeholderColor }}
                        _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Cargo */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color={labelColor} fontWeight="medium" fontSize="sm">
                      Cargo
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiBriefcase} color={iconColor} />
                      </InputLeftElement>
                      <Input
                        name="cargo"
                        value={formValues.cargo}
                        onChange={handleChange}
                        placeholder="Ej: Desarrollador Frontend"
                        focusBorderColor={buttonBg}
                        borderColor={borderColor}
                        bg={inputBg}
                        color={textColor}
                        _placeholder={{ color: placeholderColor }}
                        _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                {/* Salario */}
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color={labelColor} fontWeight="medium" fontSize="sm">
                      Salario
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FiDollarSign} color={iconColor} />
                      </InputLeftElement>
                      <NumberInput
                        value={formValues.salario}
                        onChange={handleSalarioChange}
                        min={0}
                        focusBorderColor={buttonBg}
                      >
                        <NumberInputField 
                          pl={10} 
                          placeholder="0"
                          borderColor={borderColor}
                          bg={inputBg}
                          color={textColor}
                          _placeholder={{ color: placeholderColor }}
                          _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper color={textColor} />
                          <NumberDecrementStepper color={textColor} />
                        </NumberInputStepper>
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                </GridItem>
              </Grid>

              <Divider borderColor={borderColor} />

              {/* Dirección - Full width */}
              <FormControl isRequired>
                <FormLabel color={labelColor} fontWeight="medium" fontSize="sm">
                  Dirección
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiMapPin} color={iconColor} />
                  </InputLeftElement>
                  <Textarea
                    name="direccion"
                    value={formValues.direccion}
                    onChange={handleChange}
                    placeholder="Dirección completa del empleado"
                    focusBorderColor={buttonBg}
                    borderColor={borderColor}
                    bg={inputBg}
                    color={textColor}
                    _placeholder={{ color: placeholderColor }}
                    _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                    pl={10}
                    rows={2}
                    resize="vertical"
                  />
                </InputGroup>
              </FormControl>

              {/* Foto URL */}
              <FormControl>
                <FormLabel color={labelColor} fontWeight="medium" fontSize="sm">
                  URL de la Foto (Opcional)
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiImage} color={iconColor} />
                  </InputLeftElement>
                  <Input
                    name="foto"
                    value={formValues.foto}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/foto.jpg"
                    focusBorderColor={buttonBg}
                    borderColor={borderColor}
                    bg={inputBg}
                    color={textColor}
                    _placeholder={{ color: placeholderColor }}
                    _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter
          bg={headerBg}
          borderTop="1px solid"
          borderColor={borderColor}
          borderBottomRadius="md"
        >
          <HStack spacing={3} width="100%" justify="end">
            <Button
              variant="outline"
              leftIcon={<FiX />}
              onClick={handleClose}
              size="lg"
              minW="120px"
              isDisabled={isLoading}
              borderColor={borderColor}
              color={textColor}
              _hover={{
                bg: useColorModeValue("gray.50", "gray.600"),
                borderColor: useColorModeValue("gray.300", "gray.500"),
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              bg={buttonBg}
              color="white"
              leftIcon={<FiSave />}
              isLoading={isLoading}
              loadingText="Guardando..."
              size="lg"
              minW="120px"
              _hover={{
                bg: buttonHoverBg,
                transform: "translateY(-1px)",
                shadow: "lg",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
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
