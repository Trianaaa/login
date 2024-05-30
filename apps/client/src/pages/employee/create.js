import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
      Nombre: "",
      Apellido: "",
      Foto: "",
      Correo: "",
      Direccion: "",
      Cargo: "",
      Salario: 0,
  });

    const handleChange = (e) => {
        console.log({[e.target.name]: e.target.value})
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3000/employee`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            alert("Empleado creado correctamente");
          } catch (err) {
            console.error(err);
            alert("Error al crear empleado");
          }finally{
            setFormData({
              Nombre: "",
              Apellido: "",
              Foto: "",
              Correo: "",
              Direccion: "",
              Cargo: "",
              Salario: 0,
            });
          }
    };

    return <main className="flex flex-wrap gap-8 min-h-screen items-center justify-center ">
        <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex flex-col">
                    <h1> Crear Empleado</h1>
                <Input
                placeholder="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
                name="Nombre"
              />
              <Input
                placeholder="Apellido"
                value={formData.Apellido}
                onChange={handleChange}
                name="Apellido"
              />
              <Input
                placeholder="Foto"
                value={formData.Foto}
                onChange={handleChange}
                name="Foto"
              />
              <Input
                placeholder="Correo"
                type='email'
                value={formData.Correo}
                onChange={handleChange}
                name="Correo"
              />
              <Input
                placeholder="Direccion"
                value={formData.Direccion}
                onChange={handleChange}
                name="Direccion"
              />
              <Input
                placeholder="Cargo"
                value={formData.Cargo}
                onChange={handleChange}
                name="Cargo"
              />
              <Input
                placeholder="Salario"
                type="number"
                value={formData.Salario}
                onChange={handleChange}
                name="Salario"
                    />
                    <Button onClick={handleSubmit}>Crear</Button>
                    </div></div></div></main>
}

export default CreateEmployee