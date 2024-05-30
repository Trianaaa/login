import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from '@chakra-ui/react';

const EmployeeForm = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    foto: '',
    correo: '',
    direccion: '',
    cargo: '',
    salario: 0,
  });

  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3002/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      alert('Empleado creado correctamente');
    } catch (err) {
      console.error(err);
      alert('Error al crear empleado');
    } finally {
      setFormValues({
        nombre: '',
        apellido: '',
        foto: '',
        correo: '',
        direccion: '',
        cargo: '',
        salario: 0,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Heading mb={6} textAlign="center">Formulario de Empleado</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="nombre" isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="apellido" isRequired>
            <FormLabel>Apellido</FormLabel>
            <Input
              type="text"
              name="apellido"
              value={formValues.apellido}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="foto">
            <FormLabel>Foto</FormLabel>
            <Input
              type="text"
              name="foto"
              value={formValues.foto}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="correo" isRequired>
            <FormLabel>Correo</FormLabel>
            <Input
              type="email"
              name="correo"
              value={formValues.correo}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="direccion">
            <FormLabel>Dirección</FormLabel>
            <Input
              type="text"
              name="direccion"
              value={formValues.direccion}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="cargo" isRequired>
            <FormLabel>Cargo</FormLabel>
            <Input
              type="text"
              name="cargo"
              value={formValues.cargo}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="salario" isRequired>
            <FormLabel>Salario</FormLabel>
            <Input
              type="number"
              name="salario"
              value={formValues.salario}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" size="md" onClick={handleSubmit}>
            Enviar
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EmployeeForm;
