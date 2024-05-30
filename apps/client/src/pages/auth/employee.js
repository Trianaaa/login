import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  PinInput,
  PinInputField,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "@chakra-ui/react";

const Employee = () => {
  const router = useRouter();
  const goToRegister = () => {
    router.push("/");
  };

  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({
    Nombre: "",
    Apellido: "",
    Foto: "",
    Correo: "",
    Direccion: "",
    Cargo: "",
    Salario: 0,
  });

  const getEmployee = async () => {
    try {
      const res = await fetch("http://localhost:3000/employee");
      const data = await res.json();
      setEmployee(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await fetch(`http://localhost:3000/employee/${employeeId}`, {
        method: "DELETE",
      });
      getEmployee();
    } catch (err) {
      console.error(err);
    }
  };

  const editEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
    setEditedEmployee({
      ...employee
    });
  };

  const saveEditedEmployee = async () => {
    try {
      await fetch(`http://localhost:3000/employee/${selectedEmployee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEmployee),
      });
      getEmployee();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <main
      className={`flex flex-wrap gap-8 min-h-screen items-center justify-center `}
    >
      {employee.map((employee) => (
        <Card align="center" key={employee._id}>
          <CardHeader>
            <Heading size="md"> Listado de empleados</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              <strong>Nombre:</strong> {employee.Nombre}
              <br />
              <strong>Apellido:</strong> {employee.Apellido}
              <br />
              <strong>Foto:</strong> {employee.Foto}
              <br />
              <strong>Correo:</strong> {employee.Correo}
              <br />
              <strong>Direccion:</strong> {employee.Direccion}
              <br />
              <strong>Cargo:</strong> {employee.Cargo}
              <br />
              <strong>Salario:</strong> {employee.Salario}
              <br />
            </Text>
          </CardBody>
          <CardFooter
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              colorScheme="red"
              marginRight="2"
              onClick={() => deleteEmployee(employee._id)}
            >
              Eliminar
            </Button>
            <Button
              colorScheme="teal"
              marginRight="2"
              onClick={() => editEmployee(employee)}
            >
              Editar
            </Button>
            <Button colorScheme="blue" onClick={goToRegister}>
              Volver
            </Button>
          </CardFooter>
        </Card>
      ))}

      {isEditing && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Empleado</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Nombre"
                value={editedEmployee.Nombre}
                onChange={(e) =>
                  setEditedEmployee({ ...editedEmployee, Nombre: e.target.value })
                }
              />
              <Input
                placeholder="Apellido"
                value={editedEmployee.Apellido}
                onChange={(e) =>
                  setEditedEmployee({ ...editedEmployee, Apellido: e.target.value })
                }
              />
              <Input
                placeholder="Foto"
                value={editedEmployee.Foto}
                onChange={(e) =>
                  setEditedEmployee({ ...editedEmployee, Foto: e.target.value })
                }
              />
              <Input
                placeholder="Correo"
                type="number"
                value={editedEmployee.Correo}
                onChange={(e) =>
                  setEditedEmployee({ ...editedEmployee, Correo: e.target.value })
                }
              />
              <Input
                placeholder="Direccion"
                value={editedEmployee.Direccion}
                onChange={(e) =>
                  setEditedEmployee({ ...editedEmployee, Direccion: e.target.value })
                }
              />
              <Input
                placeholder="Cargo"
                value={editedEmployee.Cargo}
                onChange={(e) =>
                  setEditedEmployee({ ...editedEmployee, Cargo: e.target.value })
                }
              />
              <Input
                placeholder="Salario"
                type="number"
                value={editedEmployee.Salario}
                onChange={(e) =>
                  setEditedEmployee({ ...editedEmployee, Salario: e.target.value })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveEditedEmployee}>
                Guardar
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </main>
  );
};

export default Employee;