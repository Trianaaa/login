import Table from "@/Components/Table";
import { Box } from "@chakra-ui/react";
import React from "react";
import { DEFAULT_DATA, columns } from "./columns";

const TableEmployee = () => {
  const [data, setData] = React.useState(() => [...DEFAULT_DATA]);
  return (
    <Box height={"100%"}>
      <Table data={data} columns={columns} />
    </Box>
  );
};

export default TableEmployee;
