import Table from "@/Components/Table";
import { Box } from "@chakra-ui/react";
import useStoreProduct from "../../store";
import { columns } from "./columns";

const TableEmployee = () => {
  const { data } = useStoreProduct();
  return (
    <Box height={"100%"}>
      <Table data={data} columns={columns} getRowCanExpand={() => true} />
    </Box>
  );
};

export default TableEmployee;
