import { API_BASE_URL } from '@/config/api';
import toast from 'react-hot-toast';

export const getEmployee = async (setData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Employee`);
    const data = await res.json();
    setData(data);
  } catch (err) {
    console.error(err);
    toast.error("Error al obtener los empleados");
  }
};

export const updateEmployee = async (employee, setData) => {
  try {
    // Filtrar solo los campos permitidos por el DTO
    const allowedFields = {
      id: employee.id,
      Nombre: employee.Nombre,
      Apellido: employee.Apellido,
      Foto: employee.Foto,
      Correo: employee.Correo,
      Direccion: employee.Direccion,
      Cargo: employee.Cargo,
      Salario: Number(employee.Salario) // Asegurar que sea un número
    };

    const response = await fetch(`${API_BASE_URL}/Employee/${employee._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allowedFields),
    });
    
    if (response.ok) {
      toast.success("¡Empleado actualizado correctamente!");
      getEmployee(setData);
    } else {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error("Error al actualizar el empleado");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error al actualizar el empleado");
  }
};

export const deleteEmployee = async (id, setData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Employee/${id}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      toast.success("¡Empleado eliminado correctamente!");
      getEmployee(setData);
    } else {
      throw new Error("Error al eliminar el empleado");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error al eliminar el empleado");
  }
};

export const createEmployee = async (employee, setData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Employee/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    
    if (response.ok) {
      toast.success("¡Empleado creado correctamente!");
      getEmployee(setData);
    } else {
      throw new Error("Error al crear el empleado");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error al crear el empleado");
  }
};
