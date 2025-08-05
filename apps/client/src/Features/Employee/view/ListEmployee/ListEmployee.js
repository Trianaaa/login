import CommonModal from "@/Components/CommonModal";
import {
  Box,
  Button,
  VStack,
  HStack,
  Flex,
  Heading,
  Badge,
  IconButton,
  Tooltip,
  useBreakpointValue,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Text,
  Avatar,
  Divider,
  useColorModeValue,
  useColorMode,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useDisclosure,
  Collapse,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  HiRefresh, 
  HiPlus, 
  HiShoppingBag, 
  HiUsers, 
  HiSearch,
  HiFilter,
  HiViewGrid,
  HiViewList,
  HiSortAscending,
  HiSortDescending,
  HiMail,
  HiLocationMarker,
  HiBriefcase,
  HiCurrencyDollar,
  HiChevronDown,
  HiEye,
  HiPencil,
  HiTrash,
  HiSun,
  HiMoon,
} from "react-icons/hi";
import CreateEmployee from "./createEmployee";
import EditEmployee from "../../components/EditEmployee/EditEmployee";
import ViewEmployee from "../../components/ViewEmployee/ViewEmployee";
import DeleteConfirm from "@/Components/DeleteConfirm";
import useStoreEmployee from "../../store";
import { API_BASE_URL } from '@/config/api';
import { updateEmployee, deleteEmployee } from "../../services";

const ListEmployee = () => {
  const router = useRouter();
  const { data, setData } = useStoreEmployee();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCargo, setFilterCargo] = useState("");
  const [sortBy, setSortBy] = useState("Nombre");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { isOpen: isFilterOpen, onToggle: onFilterToggle } = useDisclosure();
  
  // Dark mode hook
  const { colorMode, toggleColorMode } = useColorMode();

  // Responsive values
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 });
  const spacing = useBreakpointValue({ base: 4, md: 6 });
  const cardPadding = useBreakpointValue({ base: 4, md: 6 });
  const headerSize = useBreakpointValue({ base: "lg", md: "xl" });

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const statsBg = useColorModeValue("blue.50", "blue.900");

  // Función para obtener empleados
  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/employee`);
      const employeeData = await res.json();
      setData(employeeData);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los empleados");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []); // Dependencias vacías para ejecutar solo una vez al montar

  // Filter and search logic
  const filteredData = data?.filter((employee) => {
    const matchesSearch = 
      employee.Nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Cargo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !filterCargo || employee.Cargo === filterCargo;
    
    return matchesSearch && matchesFilter;
  });

  // Sort logic
  const sortedData = filteredData?.sort((a, b) => {
    let aValue = a[sortBy] || "";
    let bValue = b[sortBy] || "";
    
    if (sortBy === "Salario") {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Get unique cargos for filter
  const uniqueCargos = [...new Set(data?.map(emp => emp.Cargo).filter(Boolean))];

  // Statistics
  const totalEmployees = data?.length || 0;
  const averageSalary = data?.length ? 
    (data.reduce((sum, emp) => sum + (parseFloat(emp.Salario) || 0), 0) / data.length).toFixed(0) : 0;
  const uniquePositions = uniqueCargos.length;

  const handleRefresh = () => {
    getEmployees();
  };

  const navigateToProducts = () => {
    router.push("/products");
  };

  const addFilter = (type, value) => {
    const newFilter = { type, value };
    if (!selectedFilters.find(f => f.type === type && f.value === value)) {
      setSelectedFilters([...selectedFilters, newFilter]);
    }
  };

  const removeFilter = (filterToRemove) => {
    setSelectedFilters(selectedFilters.filter(f => 
      !(f.type === filterToRemove.type && f.value === filterToRemove.value)
    ));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSearchTerm("");
    setFilterCargo("");
  };

  // Función para manejar la eliminación de empleados
  const handleDeleteEmployee = (employeeId) => {
    deleteEmployee(employeeId, setData);
  };

  // Función para manejar la actualización de empleados
  const handleUpdateEmployee = (employee) => {
    updateEmployee(employee, setData);
  };

  const EmployeeCard = ({ employee }) => (
    <Card 
      bg={cardBg} 
      borderColor={borderColor} 
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ 
        transform: "translateY(-4px)", 
        shadow: "xl",
        borderColor: "blue.300"
      }}
      cursor="pointer"
    >
      <CardHeader pb={2}>
        <HStack spacing={4}>
          <Avatar 
            size="lg" 
            name={`${employee.Nombre} ${employee.Apellido}`}
            src={employee.Foto}
            bg="blue.500"
          />
          <VStack align="start" spacing={1} flex={1}>
            <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
              {employee.Nombre} {employee.Apellido}
            </Text>
            <Badge 
              colorScheme="blue" 
              variant="subtle" 
              borderRadius="full"
              px={3}
              py={1}
            >
              {employee.Cargo}
            </Badge>
          </VStack>
        </HStack>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack align="start" spacing={3}>
          <HStack spacing={2} w="full">
            <HiMail color="gray.500" />
            <Text fontSize="sm" color={textColor} noOfLines={1} flex={1}>
              {employee.Correo}
            </Text>
          </HStack>
          
          <HStack spacing={2} w="full">
            <HiLocationMarker color="gray.500" />
            <Text fontSize="sm" color={textColor} noOfLines={1} flex={1}>
              {employee.Direccion}
            </Text>
          </HStack>
          
          <HStack spacing={2} w="full">
            <HiCurrencyDollar color="green.500" />
            <Text fontSize="sm" fontWeight="semibold" color="green.500">
              ${parseFloat(employee.Salario || 0).toLocaleString()}
            </Text>
          </HStack>
          
          <Divider />
          
          <HStack justify="space-between" w="full">
            <Text fontSize="xs" color={textColor}>
              ID: {employee._id?.slice(-6)}
            </Text>
            <HStack spacing={2}>
              <Tooltip>
                <Box>
                  <ViewEmployee employee={employee} />
                </Box>
              </Tooltip>
              <Tooltip >
                <Box>
                  <EditEmployee employee={employee} onSave={handleUpdateEmployee} />
                </Box>
              </Tooltip>
              <Tooltip>
                <Box>
                  <DeleteConfirm
                    message={`¿Está seguro que desea eliminar a ${employee.Nombre} ${employee.Apellido}?`}
                    onDelete={() => handleDeleteEmployee(employee._id)}
                  />
                </Box>
              </Tooltip>
            </HStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  const SkeletonCard = () => (
    <Card bg={cardBg} borderRadius="xl" p={cardPadding}>
      <VStack spacing={4}>
        <HStack spacing={4} w="full">
          <SkeletonCircle size="16" />
          <VStack align="start" flex={1}>
            <Skeleton height="20px" width="60%" />
            <Skeleton height="16px" width="40%" />
          </VStack>
        </HStack>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      </VStack>
    </Card>
  );

  return (
    <Box minH="100vh" bg={bgColor} p={spacing}>
      <VStack spacing={8} maxW="7xl" mx="auto">
        {/* Header Section */}
        <Box w="full">
          <VStack spacing={6}>
            <Flex 
              justify="space-between" 
              align="center" 
              w="full"
              direction={{ base: "column", md: "row" }}
              gap={4}
            >
              <VStack align={{ base: "center", md: "start" }} spacing={2}>
                <Heading 
                  size={headerSize} 
                  color="blue.600"
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <HiUsers />
                  Gestión de Empleados
                </Heading>
                <Text color={textColor} fontSize="lg">
                  Administra tu equipo de trabajo
                </Text>
              </VStack>

              <HStack spacing={3} flexWrap="wrap">
                <Tooltip label={colorMode === 'light' ? 'Modo oscuro' : 'Modo claro'}>
                  <IconButton
                    icon={colorMode === 'light' ? <HiMoon /> : <HiSun />}
                    onClick={toggleColorMode}
                    colorScheme={colorMode === 'light' ? 'purple' : 'yellow'}
                    variant="outline"
                    size="lg"
                    transition="all 0.3s"
                    _hover={{
                      transform: "scale(1.05)",
                      shadow: "lg"
                    }}
                  />
                </Tooltip>
                
                <Tooltip label="Actualizar datos">
                  <IconButton
                    icon={<HiRefresh />}
                    onClick={handleRefresh}
                    colorScheme="blue"
                    variant="outline"
                    isLoading={isLoading}
                    size="lg"
                  />
                </Tooltip>
                
                <CreateEmployee />
                
                <Button
                  leftIcon={<HiShoppingBag />}
                  onClick={navigateToProducts}
                  colorScheme="purple"
                  variant="outline"
                  size="lg"
                >
                  Ver Productos
                </Button>
              </HStack>
            </Flex>

            {/* Statistics Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
              <Card bg={statsBg} borderRadius="xl">
                <CardBody>
                  <Stat>
                    <StatLabel>Total Empleados</StatLabel>
                    <StatNumber>{totalEmployees}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      Activos
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={statsBg} borderRadius="xl">
                <CardBody>
                  <Stat>
                    <StatLabel>Salario Promedio</StatLabel>
                    <StatNumber>${parseFloat(averageSalary).toLocaleString()}</StatNumber>
                    <StatHelpText>Por empleado</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={statsBg} borderRadius="xl">
                <CardBody>
                  <Stat>
                    <StatLabel>Cargos Únicos</StatLabel>
                    <StatNumber>{uniquePositions}</StatNumber>
                    <StatHelpText>Diferentes posiciones</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* Search and Filter Section */}
        <Card w="full" bg={cardBg} borderRadius="xl" p={6}>
          <VStack spacing={4}>
            <HStack w="full" spacing={4} flexWrap="wrap">
              <InputGroup flex={1} minW="250px">
                <InputLeftElement>
                  <HiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar empleados..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  borderRadius="lg"
                />
              </InputGroup>
              
              <Select
                placeholder="Filtrar por cargo"
                value={filterCargo}
                onChange={(e) => setFilterCargo(e.target.value)}
                maxW="200px"
                borderRadius="lg"
              >
                {uniqueCargos.map(cargo => (
                  <option key={cargo} value={cargo}>{cargo}</option>
                ))}
              </Select>
              
              <Menu>
                <MenuButton as={Button} rightIcon={<HiChevronDown />} variant="outline">
                  Ordenar por {sortBy}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setSortBy("Nombre")}>Nombre</MenuItem>
                  <MenuItem onClick={() => setSortBy("Apellido")}>Apellido</MenuItem>
                  <MenuItem onClick={() => setSortBy("Cargo")}>Cargo</MenuItem>
                  <MenuItem onClick={() => setSortBy("Salario")}>Salario</MenuItem>
                </MenuList>
              </Menu>
              
              <IconButton
                icon={sortOrder === "asc" ? <HiSortAscending /> : <HiSortDescending />}
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                variant="outline"
              />
              
              <IconButton
                icon={viewMode === "grid" ? <HiViewList /> : <HiViewGrid />}
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                variant="outline"
              />
              
              <Button
                leftIcon={<HiFilter />}
                onClick={onFilterToggle}
                variant="outline"
              >
                Filtros
              </Button>
            </HStack>

            {/* Active Filters */}
            {(searchTerm || filterCargo || selectedFilters.length > 0) && (
              <Box w="full">
                <HStack spacing={2} flexWrap="wrap">
                  <Text fontSize="sm" color={textColor}>Filtros activos:</Text>
                  {searchTerm && (
                    <Tag size="md" colorScheme="blue" borderRadius="full">
                      <TagLabel>Búsqueda: {searchTerm}</TagLabel>
                      <TagCloseButton onClick={() => setSearchTerm("")} />
                    </Tag>
                  )}
                  {filterCargo && (
                    <Tag size="md" colorScheme="green" borderRadius="full">
                      <TagLabel>Cargo: {filterCargo}</TagLabel>
                      <TagCloseButton onClick={() => setFilterCargo("")} />
                    </Tag>
                  )}
                  <Button size="sm" variant="ghost" onClick={clearAllFilters}>
                    Limpiar todo
                  </Button>
                </HStack>
              </Box>
            )}

            <Collapse in={isFilterOpen} animateOpacity>
              <Box p={4} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="lg" w="full">
                <Text fontWeight="semibold" mb={3}>Filtros Avanzados</Text>
                <Wrap spacing={2}>
                  {uniqueCargos.map(cargo => (
                    <WrapItem key={cargo}>
                      <Button
                        size="sm"
                        variant={filterCargo === cargo ? "solid" : "outline"}
                        colorScheme="blue"
                        onClick={() => setFilterCargo(filterCargo === cargo ? "" : cargo)}
                      >
                        {cargo}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </Collapse>
          </VStack>
        </Card>

        {/* Content Section */}
        <Box w="full">
          {isLoading ? (
            <SimpleGrid columns={columns} spacing={spacing}>
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </SimpleGrid>
          ) : sortedData?.length === 0 ? (
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="300px"
              borderRadius="xl"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                No se encontraron empleados
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {searchTerm || filterCargo 
                  ? "Intenta ajustar tus filtros de búsqueda"
                  : "Comienza agregando tu primer empleado"
                }
              </AlertDescription>
            </Alert>
          ) : (
            <SimpleGrid columns={columns} spacing={spacing}>
              {sortedData?.map((employee) => (
                <EmployeeCard key={employee._id} employee={employee} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </VStack>

      <CommonModal isOpen={false} onClose={() => {}}>
        {/* Modal content will be handled by individual components */}
      </CommonModal>
    </Box>
  );
};

export default ListEmployee;
