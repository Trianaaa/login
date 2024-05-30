import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import toast from "react-hot-toast";
  
  const ProductsForm = ({ onClose }) => {
    const [formValues, setFormValues] = useState({
      id_Serial: "",
      Nombre: "",
      Categoria: "",
      Imagen: "",
      Modelo: "",
      Serie: "",
      Marca: "",
      Fabricante: "",
      id_Empleado: "",
    });
  
    const handleChange = (e) => {
      console.log({ [e.target.name]: e.target.value });
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await fetch("http://localhost:3002/products/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_Serial: formValues.id_Serial,
            Nombre: formValues.Nombre,
            Categoria: formValues.Categoria,
            Imagen: formValues.Imagen,
            Modelo: formValues.Modelo,
            Serie: formValues.Serie,
            Marca: formValues.Marca,
            Fabricante: formValues.Fabricante,
            id_Empleado: formValues.id_Empleado,
          }),
        });
      } catch (err) {
        console.error(err);
      } finally {
        toast.success("Producto creado correctamente");
        setFormValues({
            id_Serial: "",
            Nombre: "",
            Categoria: "",
            Imagen: "",
            Modelo: "",
            Serie: "",
            Marca: "",
            Fabricante: "",
            id_Empleado: "",
        });
        onClose();
      }
    };
  
    return (
      <Box maxW="auto" mx="auto" my={6} py={2}>
        <Heading mb={6} textAlign="center">
          Formulario de Productos
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl id="id_Serial" isRequired>
              <FormLabel>Serial del equipo</FormLabel>
              <Input
                type="text"
                name="Serial"
                value={formValues.id_Serial}
                onChange={handleChange}
              />
            </FormControl>
  
            <FormControl id="Nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                name="Nombre"
                value={formValues.Nombre}
                onChange={handleChange}
              />
            </FormControl>
  
            <FormControl id="Categoria" isRequired>
              <FormLabel>Categoria</FormLabel>
              <Input
                type="text"
                name="Categoria"
                value={formValues.Categoria}
                onChange={handleChange}
              />
            </FormControl>
  
            <FormControl id="imagen" isRequired>
              <FormLabel>Imagen</FormLabel>
              <Input
                type="text"
                name="Imagen"
                value={formValues.Imagen}
                onChange={handleChange}
              />
            </FormControl>
  
            <FormControl id="Modelo" isRequired>
              <FormLabel>Modelo</FormLabel>
              <Input
                type="text"
                name="Modelo"
                value={formValues.Modelo}
                onChange={handleChange}
              />
            </FormControl>
  
            <FormControl id="Serie" isRequired>
              <FormLabel>Serie</FormLabel>
              <Input
                type="text"
                name="Serie"
                value={formValues.Serie}
                onChange={handleChange}
              />
            </FormControl>
  
            <FormControl id="Marca" isRequired>
              <FormLabel>Marca</FormLabel>
              <Input
                type="text"
                name="marca"
                value={formValues.Marca}
                onChange={handleChange}
              />
            </FormControl>
  
            <FormControl id="fabricante" isRequired>
              <FormLabel>Fabricante</FormLabel>
              <Input
                type="text"
                name="fabricante"
                value={formValues.Fabricante}
                onChange={handleChange}
              />
            </FormControl>
  
            <Button
              type="submit"
              colorScheme="green"
              size="md"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </Stack>
        </form>
      </Box>
    );
  };
  
  export default ProductsForm;