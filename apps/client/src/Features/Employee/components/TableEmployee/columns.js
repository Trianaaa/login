import { createColumnHelper } from "@tanstack/react-table";

export const DEFAULT_DATA = [
  {
    ID: 1,
    Foto: "https://i.imgur.com/w4g1y0a.png",
    Nombre: "Tanner",
    Apellido: "Linsley",
    Correo: "tanner@linsley.com",
    Cargo: "Director",
    Salario: 100000,
    Dirección: "Calle de la Paz, 12",
  },
  {
    ID: 2,
    Foto: "https://i.imgur.com/w4g1y0a.png",
    Nombre: "Tanner",
    Apellido: "Linsley",
    Correo: "tanner@linsley.com",
    Cargo: "Director",
    Salario: 100000,
    Dirección: "Calle de la Paz, 12",
  },
  {
    ID: 3,
    Foto: "https://i.imgur.com/w4g1y0a.png",
    Nombre: "Tanner",
    Apellido: "Linsley",
    Correo: "tanner@linsley.com",
    Cargo: "Director",
    Salario: 100000,
    Dirección: "Calle de la Paz, 12",
  },
];

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("ID", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Foto", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Nombre", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.Apellido, {
    id: "Apellido",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Apellido</span>,
  }),
  columnHelper.accessor("progress", {
    header: "Correo",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Cargo", {
    header: () => "Cargo",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("Salario", {
    header: () => <span>Salario</span>,
  }),
  columnHelper.accessor("Dirección", {
    header: "Dirección",
  }),
];
