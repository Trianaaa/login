import CommonModal from "@/Components/CommonModal";
import DeleteConfirm from "@/Components/DeleteConfirm";
import {
  Avatar,
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
  HiSun,
  HiMoon,
  HiShoppingBag,
} from "react-icons/hi";
import CreateProduct from "./createProduct";
import ViewProduct from "../../components/ViewProduct";
import EditProduct from "../../components/EditProduct";
import { deleteProduct, updateProduct } from "../../services";

import { API_BASE_URL } from '@/config/api';

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
  
  // Dark mode hook
  const { colorMode, toggleColorMode } = useColorMode();

  // Responsive values
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 });
  const spacing = useBreakpointValue({ base: 4, md: 6 });
  const cardPadding = useBreakpointValue({ base: 4, md: 6 });
  const headerSize = useBreakpointValue({ base: "lg", md: "xl" });

  // Color mode values - EXACTAMENTE IGUALES A EMPLEADOS
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const statsBg = useColorModeValue("blue.50", "blue.900");

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
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

  // Función para manejar la eliminación de productos
  const handleDeleteProduct = (productId) => {
    deleteProduct(productId, setProducts);
  };

  // Función para manejar la edición de productos
  const handleEditProduct = (updatedProduct) => {
    updateProduct(updatedProduct, setProducts);
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
        borderColor: "blue.300"
      }}
      cursor="pointer"
    >
      <CardHeader pb={2}>
        <HStack spacing={4}>
          <Avatar 
            size="lg" 
            src={product.Imagen}
            name={product.Nombre}
            bg="blue.500"
            icon={<HiCube />}
          />
          <VStack align="start" flex={1} spacing={1}>
            <Heading size="md" color="blue.600" noOfLines={1}>
              {product.Nombre}
            </Heading>
            <Text fontSize="sm" color={textColor} noOfLines={1}>
              {product.Categoria} • {product.Marca}
            </Text>
            <HStack spacing={2}>
              <Badge colorScheme="blue" variant="subtle">
                {product.Categoria}
              </Badge>
              <Badge colorScheme="purple" variant="outline">
                {product.Marca}
              </Badge>
            </HStack>
          </VStack>
        </HStack>
      </CardHeader>

      <CardBody pt={0}>
        <VStack spacing={3} align="stretch">
          <Divider />
          
          <VStack spacing={2} align="start">
            <HStack justify="space-between" w="full">
              <HStack spacing={2}>
                <HiIdentification color="gray.400" />
                <Text fontSize="sm" color={textColor}>
                  <strong>Modelo:</strong> {product.Modelo || "N/A"}
                </Text>
              </HStack>
            </HStack>
            
            <HStack justify="space-between" w="full">
              <HStack spacing={2}>
                <HiTag color="gray.400" />
                <Text fontSize="sm" color={textColor}>
                  <strong>Serie:</strong> {product.Serie || "N/A"}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <Divider />

          <HStack justify="space-between" align="center">
            <HStack spacing={1}>
              <ViewProduct product={product} />
              
              <EditProduct 
                product={product} 
                onSubmit={handleEditProduct}
              />
            </HStack>

            <Tooltip label="Eliminar">
              <Box>
                <DeleteConfirm
                  title="Eliminar Producto"
                  message={`¿Está seguro que desea eliminar ${product.Nombre}?`}
                  onDelete={() => handleDeleteProduct(product._id)}
                />
              </Box>
            </Tooltip>
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
                  <HiCube />
                  Gestión de Productos
                </Heading>
                <Text color={textColor} fontSize="lg">
                  Administra tu inventario de productos
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
                
                <CreateProduct />
                
                <Button
                  leftIcon={<HiUsers />}
                  onClick={navigateToEmployees}
                  colorScheme="purple"
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
                    <StatHelpText>Tipos únicos</StatHelpText>
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
                    <Tag size="md" colorScheme="blue" borderRadius="full">
                      <TagLabel>Búsqueda: {searchTerm}</TagLabel>
                      <TagCloseButton onClick={() => setSearchTerm("")} />
                    </Tag>
                  )}
                  {filterCategory && (
                    <Tag size="md" colorScheme="green" borderRadius="full">
                      <TagLabel>Categoría: {filterCategory}</TagLabel>
                      <TagCloseButton onClick={() => setFilterCategory("")} />
                    </Tag>
                  )}
                  {filterMarca && (
                    <Tag size="md" colorScheme="purple" borderRadius="full">
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
                <Text fontWeight="semibold" mb={3}>Filtros Avanzados</Text>
                <VStack spacing={4} align="start">
                  <Text fontWeight="semibold">Filtros por Categoría</Text>
                  <Wrap spacing={2}>
                    {uniqueCategories.map(category => (
                      <WrapItem key={category}>
                        <Button
                          size="sm"
                          variant={filterCategory === category ? "solid" : "outline"}
                          colorScheme="blue"
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
