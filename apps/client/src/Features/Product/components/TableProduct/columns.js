import {
  Avatar,
  Button,
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


const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:3002/products");
    const data = await res.json();
    setProducts(data);
  } catch (err) {
    console.error(err);
  }
};

// Eliminar producto
const deleteProducts = async (productsId) => {
  try {
    await fetch(`http://localhost:3002/products/${productsId}`, {
      method: "DELETE",
    });
    getProducts();
  } catch (err) {
    console.error(err);
  }
};

// Componente para confirmar eliminación
const DeleteButtonWithConfirmation = ({ productsId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = async () => {
    await deleteProducts(productsId);;
    await getProducts
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
              ¿Estás seguro que quieres eliminar este producto? Esta acción no
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
    id: "ID",
    header: () => "Serial",
    cell: (info) => info.row.original._id,
  }),
  columnHelper.accessor("Imagen", {
    cell: (info) => (
      <>
        <Avatar src={info.getValue()} size="sm" />
      </>
    ),
  }),
  columnHelper.accessor("Nombre", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.Categoria, {
    id: "Categoria",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Categoria</span>,
  }),
  columnHelper.accessor("Modelo", {
    header: "Modelo",
  }),
  columnHelper.accessor("Serie", {
    header: () => "Serie",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("Marca", {
    header: () => <span>Marca</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("Fabricante", {
    header: "Fabricante",
  }),
  columnHelper.accessor("id_Empleado", {
    header: "id_Empleado",
  }),
  columnHelper.display({
    id: "Delete",
    header: () => "",
    cell: (info) => (
      <DeleteButtonWithConfirmation productsId={info.row.original._id} />
    ),
  }),
];
