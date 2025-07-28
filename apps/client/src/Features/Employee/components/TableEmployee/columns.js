/* eslint-disable react-hooks/rules-of-hooks */
import DeleteConfirm from "@/Components/DeleteConfirm";
import { Avatar } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { deleteEmployee, updateEmployee } from "../../services";
import useStoreEmployee from "../../store";
import EditEmployee from "../EditEmployee";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "id",
    header: () => "id",
    cell: (info) => info.row.original.id,
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
  columnHelper.display({
    id: "Edit",
    header: () => "",
    cell: (info) => {
      return (
        <EditEmployee employee={info.row.original} onSave={updateEmployee} />
      );
    },
  }),
  columnHelper.display({
    id: "Delete",
    header: () => "",
    cell: (info) => {
      const { setData } = useStoreEmployee();
      return (
        <DeleteConfirm
          message="¿Está seguro que desea eliminar este empleado?"
          onDelete={deleteEmployee(info.row.original._id, setData)}
        />
      );
    },
  }),
];
