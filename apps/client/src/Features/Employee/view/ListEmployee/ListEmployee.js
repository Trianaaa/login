import { Box, Heading } from "@chakra-ui/react";
import TableEmployee from "../../components/TableEmployee";

const ListEmployee = () => {
  return (
    <Box p={4} height="100vh" display="flex" flexDirection="column" gap={2}>
      <Heading textAlign="center">List Employee</Heading>
      <Box height={"100%"}>
        <TableEmployee />
      </Box>
    </Box>
  );
};

export default ListEmployee;
