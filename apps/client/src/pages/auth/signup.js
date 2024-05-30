import React from "react";
import { PinInput, PinInputField, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [show, setShow] = React.useState(true);
  const [form, setFormValues] = React.useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    console.log(form);
    const toastID = toast.loading("Creando usuario, dame un momento");
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("Han pasado 10 segundos.");
        resolve(); // Resuelve la promesa después de 10 segundos
      }, 10000);
    });
    toast.dismiss(toastID);
    router.push("/");
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
      <div className="flex justify-center items-center flex-col gap-6">
        <h1 className="text-center text-4xl font-bold">Registro</h1>
        <div className="flex flex-col justify-center">
          <p className="text-base text-left font-bold my-2">Nombre</p>
          <Input
            variant="filled"
            placeholder="Ingresa tu nombre"
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
          <p className="text-base text-left font-bold my-2">Email</p>

          <Input
            variant="filled"
            placeholder="Ingresa tu email"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <p className="text-base text-left font-bold my-2">Contraseña</p>
          <div className="flex justify-between w-full">
            <PinInput
              type="alphanumeric"
              onChange={(value) => handleChange("password", value)}
              mask={show}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </div>
          <Button onClick={() => setShow(!show)} className="mt-2">
            {show ? "ocultar" : "ver"}
          </Button>
        </div>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Registrarme
        </Button>
        <Button colorScheme="teal" onClick={goToLogin}>
          Iniciar Sesion
        </Button>
      </div>
    </main>
  );
};

export default Register;
