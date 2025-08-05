import { API_BASE_URL } from '@/config/api';
import toast from 'react-hot-toast';

export const getProduct = async (setData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Products`);
    const data = await res.json();
    setData(data);
  } catch (error) {
    console.log(error);
    toast.error("Error al obtener los productos");
  }
};

export const updateProduct = async (product, setData) => {
  try {
    // Crear una copia del producto sin campos innecesarios
    const productToUpdate = {
      id_Serial: product.id_Serial || "",
      Nombre: product.Nombre || "",
      Categoria: product.Categoria || "",
      Imagen: product.Imagen || "",
      Modelo: product.Modelo || "",
      Serie: product.Serie || "",
      Marca: product.Marca || "",
      Fabricante: product.Fabricante || "",
      id_Empleado: product.id_Empleado || ""
    };

    // Remover campos vacíos para evitar problemas de validación
    Object.keys(productToUpdate).forEach(key => {
      if (productToUpdate[key] === "" || productToUpdate[key] === null || productToUpdate[key] === undefined) {
        delete productToUpdate[key];
      }
    });

    const response = await fetch(`${API_BASE_URL}/Products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToUpdate),
    });
    
    if (response.ok) {
      toast.success("¡Producto actualizado correctamente!");
      getProduct(setData);
    } else {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Error al actualizar el producto");
    }
  } catch (error) {
    console.log(error);
    toast.error("Error al actualizar el producto");
  }
};

export const deleteProduct = async (id, setData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Products/${id}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      toast.success("¡Producto eliminado correctamente!");
      getProduct(setData);
    } else {
      throw new Error("Error al eliminar el producto");
    }
  } catch (error) {
    console.log(error);
    toast.error("Error al eliminar el producto");
  }
};

export const createProduct = async (product, setData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Products/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    
    if (response.ok) {
      toast.success("¡Producto creado correctamente!");
      getProduct(setData);
    } else {
      throw new Error("Error al crear el producto");
    }
  } catch (error) {
    console.log(error);
    toast.error("Error al crear el producto");
  }
};
