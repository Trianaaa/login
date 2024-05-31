/* eslint-disable react-hooks/rules-of-hooks */
import DeleteConfirm from "@/Components/DeleteConfirm";
import { Avatar } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { deleteProduct, updateProduct } from "../../services";
import useStoreProduct from "../../store";
import EditProduct from "../EditProduct";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "id_Serial",
    header: () => "Serial",
    cell: (info) => info.row.original.id_Serial,
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
    id: "Edit",
    header: () => "",
    cell: (info) => {
      const { setData } = useStoreProduct();
      return (
        <EditProduct
          values={info.row.original}
          onSubmit={(values) => {
            updateProduct(
              {
                ...info.row.original,
                ...values,
              },
              setData
            );
          }}
        />
      );
    },
  }),
  columnHelper.display({
    id: "Delete",
    header: () => "",
    cell: (info) => {
      const { setData } = useStoreProduct();
      return (
        <DeleteConfirm
          message="¿Está seguro que desea eliminar este producto?"
          onDelete={deleteProduct(info.row.original._id, setData)}
        />
      );
    },
  }),
];
