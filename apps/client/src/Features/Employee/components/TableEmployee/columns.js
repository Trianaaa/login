import { Avatar, Button } from "@chakra-ui/react";
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
  columnHelper.display({
    id: "VER",
    header: () => "",
    cell: (info) => (
      <Button
        colorScheme="blue"
        size="sm"
        variant="outline"
        onClick={() => {
          console.log(info.row.original);
        }}
      >
        Ver
      </Button>
    ),
  }),
  columnHelper.accessor("ID", {
    cell: (info) => info.getValue(),
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
  columnHelper.accessor("Dirección", {
    header: "Dirección",
  }),
];
