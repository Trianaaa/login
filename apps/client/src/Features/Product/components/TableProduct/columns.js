import { Avatar } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

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
];
