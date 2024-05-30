import Table from "@/Components/Table";
import { Box } from "@chakra-ui/react";
import useStoreEmployee from "../../store";
import { columns } from "./columns";

const TableEmployee = () => {
  const { data, setData } = useStoreEmployee();
  return (
    <Box height={"100%"}>
      <Table data={data} columns={columns} />
    </Box>
  );
};

export default TableEmployee;