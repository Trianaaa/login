import CommonModal from "@/Components/CommonModal";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Select,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPencil } from "react-icons/hi";

const EditProduct = ({ values, onSubmit }) => {
  const [formValues, setFormValues] = useState(values ?? {});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formValues);
    onClose();
  };

  // EMpleados
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3002/employee");
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

  return (
    <>
      <Button colorScheme="blue" size="sm" variant="outline" onClick={onOpen}>
        <HiPencil />
      </Button>

      <CommonModal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>Editar Información del Empleado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl id="id_Serial" isRequired>
                <FormLabel>Serial del equipo</FormLabel>
                <Input
                  type="text"
                  name="id_Serial"
                  value={formValues.id_Serial}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Nombre" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="Nombre"
                  value={formValues.Nombre}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Categoria" isRequired>
                <FormLabel>Categoria</FormLabel>
                <Input
                  type="text"
                  name="Categoria"
                  value={formValues.Categoria}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="imagen" isRequired>
                <FormLabel>Imagen</FormLabel>
                <Input
                  type="text"
                  name="Imagen"
                  value={formValues.Imagen}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Modelo" isRequired>
                <FormLabel>Modelo</FormLabel>
                <Input
                  type="text"
                  name="Modelo"
                  value={formValues.Modelo}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Serie" isRequired>
                <FormLabel>Serie</FormLabel>
                <Input
                  type="text"
                  name="Serie"
                  value={formValues.Serie}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Marca" isRequired>
                <FormLabel>Marca</FormLabel>
                <Input
                  type="text"
                  name="Marca"
                  value={formValues.Marca}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="fabricante" isRequired>
                <FormLabel>Fabricante</FormLabel>
                <Input
                  type="text"
                  name="Fabricante"
                  value={formValues.Fabricante}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="id_Empleado" isRequired>
                <FormLabel>Empleado</FormLabel>
                <Select
                  name="id_Empleado"
                  value={formValues.id_Empleado}
                  onChange={handleChange}
                  placeholder="Selecciona un empleado" // Añadir un placeholder
                >
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.Nombre} {employee.Apellido}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                colorScheme="green"
                size="md"
                onClick={handleSubmit}
              >
                Editar
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </CommonModal>
    </>
  );
};

export default EditProduct;
