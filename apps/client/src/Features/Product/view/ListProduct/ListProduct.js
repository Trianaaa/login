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
  Image,
  Divider,
  useColorModeValue,
  Skeleton,
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
  AspectRatio,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  HiRefresh, 
  HiPlus, 
  HiUsers, 
  HiCube, 
  HiSearch,
  HiFilter,
  HiViewGrid,
  HiViewList,
  HiSortAscending,
  HiSortDescending,
  HiTag,
  HiIdentification,
  HiOfficeBuilding,
  HiChevronDown,
  HiEye,
  HiPencil,
  HiTrash,
  HiPhotograph,
} from "react-icons/hi";
import CreateProduct from "./createProduct";

const ListProduct = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMarca, setFilterMarca] = useState("");
  const [sortBy, setSortBy] = useState("Nombre");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { isOpen: isFilterOpen, onToggle: onFilterToggle } = useDisclosure();

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
  const statsBg = useColorModeValue("purple.50", "purple.900");

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api-service-3s0x.onrender.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los productos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter and search logic
  const filteredData = products?.filter((product) => {
    const matchesSearch = 
      product.Nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Categoria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Serie?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filterCategory || product.Categoria === filterCategory;
    const matchesMarca = !filterMarca || product.Marca === filterMarca;
    
    return matchesSearch && matchesCategory && matchesMarca;
  });

  // Sort logic
  const sortedData = filteredData?.sort((a, b) => {
    let aValue = a[sortBy] || "";
    let bValue = b[sortBy] || "";
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Get unique values for filters
  const uniqueCategories = [...new Set(products?.map(prod => prod.Categoria).filter(Boolean))];
  const uniqueMarcas = [...new Set(products?.map(prod => prod.Marca).filter(Boolean))];

  // Statistics
  const totalProducts = products?.length || 0;
  const totalCategories = uniqueCategories.length;
  const totalMarcas = uniqueMarcas.length;

  const handleRefresh = () => {
    getProducts();
  };

  const navigateToEmployees = () => {
    router.push("/");
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSearchTerm("");
    setFilterCategory("");
    setFilterMarca("");
  };

  const ProductCard = ({ product }) => (
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
        borderColor: "purple.300"
      }}
      cursor="pointer"
    >
      <CardHeader pb={2}>
        <VStack spacing={3}>
          <AspectRatio ratio={16/9} w="full">
            <Image 
              src={product.Imagen || "/placeholder-product.jpg"}
              alt={product.Nombre}
              borderRadius="lg"
              objectFit="cover"
              fallback={
                <Flex 
                  align="center" 
                  justify="center" 
                  bg="gray.100" 
                  borderRadius="lg"
                  h="full"
                >
                  <HiPhotograph size="40px" color="gray.400" />
                </Flex>
              }
            />
          </AspectRatio>
          
          <HStack justify="space-between" w="full">
            <VStack align="start" spacing={1} flex={1}>
              <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                {product.Nombre}
              </Text>
              <HStack spacing={2}>
                <Badge 
                  colorScheme="purple" 
                  variant="subtle" 
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {product.Categoria}
                </Badge>
                <Badge 
                  colorScheme="blue" 
                  variant="outline" 
                  borderRadius="full"
                  px={2}
                  py={1}
                  fontSize="xs"
                >
                  {product.Marca}
                </Badge>
              </HStack>
            </VStack>
            
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiChevronDown />}
                variant="ghost"
                size="sm"
              />
              <MenuList>
                <MenuItem icon={<HiEye />}>Ver Detalles</MenuItem>
                <MenuItem icon={<HiPencil />}>Editar</MenuItem>
                <MenuDivider />
                <MenuItem icon={<HiTrash />} color="red.500">Eliminar</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </VStack>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack align="start" spacing={3}>
          <HStack spacing={2} w="full">
            <HiIdentification color="gray.500" />
            <Text fontSize="sm" color={textColor} noOfLines={1} flex={1}>
              Modelo: {product.Modelo}
            </Text>
          </HStack>
          
          <HStack spacing={2} w="full">
            <HiTag color="gray.500" />
            <Text fontSize="sm" color={textColor} noOfLines={1} flex={1}>
              Serie: {product.Serie}
            </Text>
          </HStack>
          
          <HStack spacing={2} w="full">
            <HiOfficeBuilding color="gray.500" />
            <Text fontSize="sm" color={textColor} noOfLines={1} flex={1}>
              {product.Fabricante}
            </Text>
          </HStack>
          
          <Divider />
          
          <HStack justify="space-between" w="full">
            <Text fontSize="xs" color={textColor}>
              Serial: {product.id_Serial?.slice(-6)}
            </Text>
            <HStack spacing={1}>
              <Tooltip label="Ver detalles">
                <IconButton
                  icon={<HiEye />}
                  size="xs"
                  variant="ghost"
                  colorScheme="purple"
                />
              </Tooltip>
              <Tooltip label="Editar">
                <IconButton
                  icon={<HiPencil />}
                  size="xs"
                  variant="ghost"
                  colorScheme="green"
                />
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
        <Skeleton height="150px" borderRadius="lg" />
        <VStack align="start" w="full" spacing={2}>
          <Skeleton height="20px" width="80%" />
          <Skeleton height="16px" width="60%" />
          <Skeleton height="16px" width="40%" />
        </VStack>
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
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
                  color="purple.600"
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <HiCube />
                  Gestión de Productos
                </Heading>
                <Text color={textColor} fontSize="lg">
                  Administra tu inventario de equipos
                </Text>
              </VStack>

              <HStack spacing={3} flexWrap="wrap">
                <Tooltip label="Actualizar datos">
                  <IconButton
                    icon={<HiRefresh />}
                    onClick={handleRefresh}
                    colorScheme="purple"
                    variant="outline"
                    isLoading={isLoading}
                    size="lg"
                  />
                </Tooltip>
                
                <CreateProduct />
                
                <Button
                  leftIcon={<HiUsers />}
                  onClick={navigateToEmployees}
                  colorScheme="blue"
                  variant="outline"
                  size="lg"
                >
                  Ver Empleados
                </Button>
              </HStack>
            </Flex>

            {/* Statistics Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
              <Card bg={statsBg} borderRadius="xl">
                <CardBody>
                  <Stat>
                    <StatLabel>Total Productos</StatLabel>
                    <StatNumber>{totalProducts}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      En inventario
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={statsBg} borderRadius="xl">
                <CardBody>
                  <Stat>
                    <StatLabel>Categorías</StatLabel>
                    <StatNumber>{totalCategories}</StatNumber>
                    <StatHelpText>Diferentes tipos</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={statsBg} borderRadius="xl">
                <CardBody>
                  <Stat>
                    <StatLabel>Marcas</StatLabel>
                    <StatNumber>{totalMarcas}</StatNumber>
                    <StatHelpText>Fabricantes únicos</StatHelpText>
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
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  borderRadius="lg"
                />
              </InputGroup>
              
              <Select
                placeholder="Filtrar por categoría"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                maxW="200px"
                borderRadius="lg"
              >
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>
              
              <Select
                placeholder="Filtrar por marca"
                value={filterMarca}
                onChange={(e) => setFilterMarca(e.target.value)}
                maxW="200px"
                borderRadius="lg"
              >
                {uniqueMarcas.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </Select>
              
              <Menu>
                <MenuButton as={Button} rightIcon={<HiChevronDown />} variant="outline">
                  Ordenar por {sortBy}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setSortBy("Nombre")}>Nombre</MenuItem>
                  <MenuItem onClick={() => setSortBy("Categoria")}>Categoría</MenuItem>
                  <MenuItem onClick={() => setSortBy("Marca")}>Marca</MenuItem>
                  <MenuItem onClick={() => setSortBy("Modelo")}>Modelo</MenuItem>
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
            {(searchTerm || filterCategory || filterMarca || selectedFilters.length > 0) && (
              <Box w="full">
                <HStack spacing={2} flexWrap="wrap">
                  <Text fontSize="sm" color={textColor}>Filtros activos:</Text>
                  {searchTerm && (
                    <Tag size="md" colorScheme="purple" borderRadius="full">
                      <TagLabel>Búsqueda: {searchTerm}</TagLabel>
                      <TagCloseButton onClick={() => setSearchTerm("")} />
                    </Tag>
                  )}
                  {filterCategory && (
                    <Tag size="md" colorScheme="blue" borderRadius="full">
                      <TagLabel>Categoría: {filterCategory}</TagLabel>
                      <TagCloseButton onClick={() => setFilterCategory("")} />
                    </Tag>
                  )}
                  {filterMarca && (
                    <Tag size="md" colorScheme="green" borderRadius="full">
                      <TagLabel>Marca: {filterMarca}</TagLabel>
                      <TagCloseButton onClick={() => setFilterMarca("")} />
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
                <VStack spacing={4} align="start">
                  <Text fontWeight="semibold">Filtros por Categoría</Text>
                  <Wrap spacing={2}>
                    {uniqueCategories.map(category => (
                      <WrapItem key={category}>
                        <Button
                          size="sm"
                          variant={filterCategory === category ? "solid" : "outline"}
                          colorScheme="purple"
                          onClick={() => setFilterCategory(filterCategory === category ? "" : category)}
                        >
                          {category}
                        </Button>
                      </WrapItem>
                    ))}
                  </Wrap>
                  
                  <Text fontWeight="semibold">Filtros por Marca</Text>
                  <Wrap spacing={2}>
                    {uniqueMarcas.map(marca => (
                      <WrapItem key={marca}>
                        <Button
                          size="sm"
                          variant={filterMarca === marca ? "solid" : "outline"}
                          colorScheme="blue"
                          onClick={() => setFilterMarca(filterMarca === marca ? "" : marca)}
                        >
                          {marca}
                        </Button>
                      </WrapItem>
                    ))}
                  </Wrap>
                </VStack>
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
                No se encontraron productos
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {searchTerm || filterCategory || filterMarca
                  ? "Intenta ajustar tus filtros de búsqueda"
                  : "Comienza agregando tu primer producto"
                }
              </AlertDescription>
            </Alert>
          ) : (
            <SimpleGrid columns={columns} spacing={spacing}>
              {sortedData?.map((product) => (
                <ProductCard key={product._id} product={product} />
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

export default ListProduct;
