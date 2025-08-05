import CommonModal from "@/Components/CommonModal";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  IconButton,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  useColorModeValue,
  Box,
  Text,
  Avatar,
  Flex,
  Tooltip,
  useToast,
  Divider,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiPencil, HiCheck, HiX } from "react-icons/hi";
import useStoreEmployee from "../../store";

const EditEmployee = ({ employee, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ ...employee });
  const [isLoading, setIsLoading] = useState(false);
  const { setData } = useStoreEmployee();
  const toast = useToast();

  // Color mode values - más sutiles
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const inputBg = useColorModeValue("white", "gray.700");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalarioChange = (value) => {
    setFormData((prev) => ({ ...prev, Salario: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(formData, setData);
      onClose();
      toast({
        title: "Empleado actualizado",
        description: "Los datos se han guardado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error saving employee:", error);
      toast({
        title: "Error al guardar",
        description: "No se pudieron guardar los cambios",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Tooltip label="Editar" hasArrow>
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

      <CommonModal isOpen={isOpen} onClose={onClose} size="xl">
        {/* Header simplificado */}
        <ModalHeader 
          bg={headerBg}
          borderBottom="1px solid"
          borderColor={borderColor}
          py={6}
        >
          <Center>
            <VStack spacing={3}>
              <Avatar 
                size="lg" 
                src={formData.Foto} 
                name={`${formData.Nombre} ${formData.Apellido}`}
                bg="gray.300"
              />
              <Box textAlign="center">
                <Text fontSize="xl" fontWeight="600" color={textColor}>
                  Editar Empleado
                </Text>
                <Text fontSize="sm" color={labelColor}>
                  {formData.Nombre} {formData.Apellido}
                </Text>
              </Box>
            </VStack>
          </Center>
        </ModalHeader>
        
        <ModalCloseButton />
        
        <ModalBody py={8} px={8}>
          <VStack spacing={6}>
            {/* Información Personal */}
            <Box w="full">
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información Personal
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
                      Nombre
                    </FormLabel>
                    <Input
                      name="Nombre"
                      value={formData.Nombre || ""}
                      onChange={handleChange}
                      size="md"
                      borderRadius="md"
                      bg={inputBg}
                      focusBorderColor="gray.400"
                      _hover={{ borderColor: "gray.300" }}
                    />
                  </FormControl>
                </GridItem>
                
                <GridItem>
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
                      Apellido
                    </FormLabel>
                    <Input
                      name="Apellido"
                      value={formData.Apellido || ""}
                      onChange={handleChange}
                      size="md"
                      borderRadius="md"
                      bg={inputBg}
                      focusBorderColor="gray.400"
                      _hover={{ borderColor: "gray.300" }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Información de Contacto */}
            <Box w="full">
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información de Contacto
              </Text>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
                    Correo Electrónico
                  </FormLabel>
                  <Input
                    name="Correo"
                    type="email"
                    value={formData.Correo || ""}
                    onChange={handleChange}
                    size="md"
                    borderRadius="md"
                    bg={inputBg}
                    focusBorderColor="gray.400"
                    _hover={{ borderColor: "gray.300" }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
                    Dirección
                  </FormLabel>
                  <Textarea
                    name="Direccion"
                    value={formData.Direccion || ""}
                    onChange={handleChange}
                    size="md"
                    borderRadius="md"
                    bg={inputBg}
                    focusBorderColor="gray.400"
                    _hover={{ borderColor: "gray.300" }}
                    resize="vertical"
                    rows={3}
                  />
                </FormControl>
              </VStack>
            </Box>

            <Divider />

            {/* Información Laboral */}
            <Box w="full">
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Información Laboral
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
                      Cargo
                    </FormLabel>
                    <Input
                      name="Cargo"
                      value={formData.Cargo || ""}
                      onChange={handleChange}
                      size="md"
                      borderRadius="md"
                      bg={inputBg}
                      focusBorderColor="gray.400"
                      _hover={{ borderColor: "gray.300" }}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
                      Salario
                    </FormLabel>
                    <NumberInput
                      value={formData.Salario || 0}
                      onChange={handleSalarioChange}
                      min={0}
                      precision={2}
                      size="md"
                    >
                      <NumberInputField
                        borderRadius="md"
                        bg={inputBg}
                        focusBorderColor="gray.400"
                        _hover={{ borderColor: "gray.300" }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Foto */}
            <Box w="full">
              <Text fontSize="md" fontWeight="600" color={textColor} mb={4}>
                Foto de Perfil
              </Text>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
                  URL de Foto
                </FormLabel>
                <Input
                  name="Foto"
                  value={formData.Foto || ""}
                  onChange={handleChange}
                  size="md"
                  borderRadius="md"
                  bg={inputBg}
                  focusBorderColor="gray.400"
                  _hover={{ borderColor: "gray.300" }}
                  placeholder="https://ejemplo.com/foto.jpg"
                />
                {formData.Foto && (
                  <Center mt={4}>
                    <Avatar 
                      size="md" 
                      src={formData.Foto} 
                      name={`${formData.Nombre} ${formData.Apellido}`}
                    />
                  </Center>
                )}
              </FormControl>
            </Box>
          </VStack>
        </ModalBody>
        
        <ModalFooter 
          borderTop="1px solid" 
          borderColor={borderColor}
          py={6}
        >
          <Center w="full">
            <HStack spacing={4}>
              <Button 
                variant="outline" 
                onClick={onClose}
                leftIcon={<HiX />}
                size="md"
                borderRadius="md"
                minW="120px"
              >
                Cancelar
              </Button>
              <Button 
                colorScheme="gray"
                bg={textColor}
                color={bgColor}
                onClick={handleSave}
                leftIcon={<HiCheck />}
                isLoading={isLoading}
                loadingText="Guardando..."
                size="md"
                borderRadius="md"
                minW="120px"
                _hover={{
                  bg: useColorModeValue("gray.600", "gray.300"),
                }}
              >
                Guardar
              </Button>
            </HStack>
          </Center>
        </ModalFooter>
      </CommonModal>
    </>
  );
};

export default EditEmployee;
