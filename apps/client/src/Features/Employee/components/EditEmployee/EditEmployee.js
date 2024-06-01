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
} from "@chakra-ui/react";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import useStoreEmployee from "../../store";

const EditEmployee = ({ employee, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ ...employee });
  const { setData } = useStoreEmployee();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData, setData);
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" size="sm" variant="outline" onClick={onOpen}>
        <HiPencil />
      </Button>

      <CommonModal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Editar Información del Empleado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Apellido</FormLabel>
            <Input
              name="Apellido"
              value={formData.Apellido}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Correo</FormLabel>
            <Input
              name="Correo"
              value={formData.Correo}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Cargo</FormLabel>
            <Input
              name="Cargo"
              value={formData.Cargo}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Salario</FormLabel>
            <Input
              name="Salario"
              value={formData.Salario}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Dirección</FormLabel>
            <Input
              name="Direccion"
              value={formData.Direccion}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={handleSave}>
            Guardar
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancelar
          </Button>
        </ModalFooter>
      </CommonModal>
    </>
  );
};

export default EditEmployee;
