import React from "react";
import { PinInput, PinInputField, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });
const Inicio = () => {
  const router = useRouter();
  const [show, setShow] = React.useState(true);
  const [form, setFormValues] = React.useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    precio: "",
    autor: "",
  });

  const goToBooks = async () => {
    const toastID = toast.loading("Agregando libro, dame un momento");
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          title: form.titulo,
          description: form.descripcion,
          price: Number(form.precio),
          author: form.autor,
          category: form.categoria,
        }),
        redirect: "follow",
      };
      const res = await fetch("http://localhost:3080/book/new", requestOptions);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastID);
      router.push("/auth/books");
    }
  };
  const goToLogin = () => {
    router.push("/auth/login");
  };

  const handleChange = (name, value) => {
    const copyForm = form;
    copyForm[name] = value;
    setFormValues(copyForm);
  };
  return (
    <main className={`flex min-h-screen items-center justify-center `}>
      <Card className="w-1/2">
        {" "}
        <div className="flex justify-center items-center flex-col gap-6">
          <h1 className="text-center text-4xl font-bold">Registros de equipos</h1>

          <div className="flex flex-col justify-center">
            <p className="text-base text-left font-bold my-2"></p>
            <p className="text-base text-left font-bold my-2">titulo</p>
            <Input
              variant="filled"
              placeholder="Ingresa el titulo"
              onChange={(e) => handleChange("titulo", e.target.value)}
            />
            <p className="text-base text-left font-bold my-2"></p>
            <p className="text-base text-left font-bold my-2">descripcion</p>
            <Input
              variant="filled"
              placeholder="Ingresa la descripcion"
              onChange={(e) => handleChange("descripcion", e.target.value)}
            />
            <p className="text-base text-left font-bold my-2"></p>
            <p className="text-base text-left font-bold my-2">categoria</p>
            <Input
              variant="filled"
              placeholder="Ingresa la categoria"
              onChange={(e) => handleChange("categoria", e.target.value)}
            />
            <p className="text-base text-left font-bold my-2"></p>
            <p className="text-base text-left font-bold my-2">precio</p>
            <Input
              variant="filled"
              placeholder="Ingresa el precio"
              onChange={(e) => handleChange("precio", e.target.value)}
            />
            <p className="text-base text-left font-bold my-2"></p>
            <p className="text-base text-left font-bold my-2">autor</p>
            <Input
              variant="filled"
              placeholder="Ingresa el autor"
              onChange={(e) => handleChange("autor", e.target.value)}
            />
          </div>
          <Button colorScheme="teal" onClick={goToBooks}>
            Agregar
          </Button>
          <Button colorScheme="teal" onClick={goToLogin}>
            Cerrar Sesion
          </Button>
        </div>
      </Card>{" "}
      {/* Fin de la tarjeta */}
    </main>
  );
};

export default Inicio;
