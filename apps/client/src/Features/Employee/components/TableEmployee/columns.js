import {
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";


const getEmployee = async () => {
  try {
    const res = await fetch("http://localhost:3002/employee");
    const data = await res.json();
    setEmployee(data);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (employee) => {
  try {
    await fetch(`http://localhost:3002/employee/${employee._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    getEmployee();
  } catch (err) {
    console.error(err);
  }
};

const EditButtonWithModal = ({ employee, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ ...employee });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" size="sm" variant="outline" onClick={onOpen}>
        Editar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
        </ModalContent>
      </Modal>
    </>
  );
};

const deleteEmployee = async (employeeId) => {
  try {
    await fetch(`http://localhost:3002/employee/${employeeId}`, {
      method: "DELETE",
    });
    getEmployee();
  } catch (err) {
    console.error(err);
  }
};

const DeleteButtonWithConfirmation = ({ employeeId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = () => {
    deleteEmployee(employeeId);
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" size="sm" variant="outline" onClick={onOpen}>
        Eliminar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar Eliminación
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que quieres eliminar este empleado? Esta acción no
              se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "Edit",
    header: () => "",
    cell: (info) => (
      <EditButtonWithModal
        employee={info.row.original}
        onSave={updateEmployee}
      />
    ),
  }),

  columnHelper.display({
    id: "Delete",
    header: () => "",
    cell: (info) => (
      <DeleteButtonWithConfirmation employeeId={info.row.original._id} />
    ),
  }),

  columnHelper.display({
    id: "ID",
    header: () => "ID",
    cell: (info) => info.row.original._id,
  }),

  columnHelper.accessor("Foto", {
    cell: (info) => (
      <>
        <Avatar src={info.getValue()} size="sm" />
      </>
    ),
  }),

  columnHelper.accessor("Nombre", {
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((row) => row.Apellido, {
    id: "Apellido",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Apellido</span>,
  }),
  columnHelper.accessor("Correo", {
    header: "Correo",
  }),
  columnHelper.accessor("Cargo", {
    header: () => "Cargo",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("Salario", {
    header: () => <span>Salario</span>,
    cell: (info) => {
      const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      });
      return formatter.format(info.getValue());
    },
  }),
  columnHelper.accessor("Direccion", {
    header: "Dirección",
  }),
];
