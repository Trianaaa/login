import React from "react";
import { HiTrash, HiExclamationTriangle } from "react-icons/hi";

const {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  IconButton,
  HStack,
  Text,
  useColorModeValue,
  Icon,
  VStack,
  Box,
  Tooltip,
} = require("@chakra-ui/react");

const DeleteConfirm = ({ onDelete, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  // Color mode values
  const bgColor = useColorModeValue("red.50", "red.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("red.200", "red.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const warningBg = useColorModeValue("orange.50", "orange.900");
  const gradientBg = useColorModeValue(
    "linear(to-r, red.400, pink.500)",
    "linear(to-r, red.600, pink.700)"
  );

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      <Tooltip label="Eliminar" placement="bottom">
        <IconButton
          icon={<HiTrash />}
          size="sm"
          colorScheme="red"
          variant="ghost"
          borderRadius="lg"
          onClick={onOpen}
          _hover={{
            bg: "red.50",
            color: "red.600",
            transform: "scale(1.05)",
            shadow: "md",
          }}
          _dark={{
            _hover: {
              bg: "red.900",
              color: "red.300",
            }
          }}
          transition="all 0.2s"
        />
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay backdropFilter="blur(4px)">
          <AlertDialogContent 
            borderRadius="2xl" 
            mx={4}
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            shadow="2xl"
            overflow="hidden"
          >
            <AlertDialogHeader 
              fontSize="xl" 
              fontWeight="bold"
              bgGradient={gradientBg}
              color="white"
              py={6}
              textAlign="center"
            >
              <VStack spacing={3}>
                <Icon as={HiExclamationTriangle} boxSize={8} />
                <Text>Confirmar Eliminación</Text>
              </VStack>
            </AlertDialogHeader>

            <AlertDialogBody py={8} px={6}>
              <VStack spacing={6} textAlign="center">
                <Box 
                  bg={warningBg}
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="orange.200"
                  w="full"
                >
                  <Icon 
                    as={HiTrash} 
                    boxSize={12} 
                    color="red.500" 
                    mb={4}
                    mx="auto"
                    display="block"
                  />
                  <Text fontSize="lg" lineHeight="1.6" color={textColor} fontWeight="medium">
                    {message}
                  </Text>
                </Box>
                
                <Box 
                  bg={useColorModeValue("yellow.50", "yellow.900")}
                  p={4}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={useColorModeValue("yellow.200", "yellow.600")}
                  w="full"
                >
                  <HStack spacing={2} justify="center">
                    <Icon as={HiExclamationTriangle} color="yellow.500" boxSize={5} />
                    <Text fontSize="sm" color={textColor} fontWeight="medium">
                      Esta acción no se puede deshacer
                    </Text>
                  </HStack>
                </Box>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter bg={useColorModeValue("gray.50", "gray.700")} p={6}>
              <HStack spacing={4} w="full" justify="center">
                <Button 
                  ref={cancelRef} 
                  onClick={onClose}
                  variant="outline"
                  borderRadius="xl"
                  size="lg"
                  px={8}
                  _hover={{
                    bg: useColorModeValue("gray.100", "gray.600"),
                    transform: "scale(1.02)",
                  }}
                  transition="all 0.2s"
                >
                  Cancelar
                </Button>
                <Button 
                  colorScheme="red" 
                  onClick={handleDelete}
                  borderRadius="xl"
                  size="lg"
                  px={8}
                  _hover={{
                    transform: "scale(1.02)",
                    shadow: "lg",
                  }}
                  transition="all 0.2s"
                  leftIcon={<HiTrash />}
                >
                  Eliminar
                </Button>
              </HStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteConfirm;
