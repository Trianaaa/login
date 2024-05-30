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

const Books = () => {
  const router = useRouter();
  const goToRegister = () => {
    router.push("/");
  };

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    category: "",
  });

  const getBooks = async () => {
    try {
      const res = await fetch("http://localhost:3000/book");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await fetch(`http://localhost:3000/book/${bookId}`, {
        method: "DELETE",
      });
      getBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const editBook = (book) => {
    setSelectedBook(book);
    setIsEditing(true);
    setEditedBook({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
    });
  };

  const saveEditedBook = async () => {
    try {
      await fetch(`http://localhost:3000/book/${selectedBook._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedBook),
      });
      getBooks();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <main
      className={`flex flex-wrap gap-8 min-h-screen items-center justify-center `}
    >
      {books.map((book) => (
        <Card align="center" key={book._id}>
          <CardHeader>
            <Heading size="md"> Biblioteca de Libros</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              <strong>Libro:</strong> {book.title}
              <br />
              <strong>Autor:</strong> {book.author}
              <br />
              <strong>Descripción:</strong> {book.description}
              <br />
              <strong>Precio:</strong> {book.price}
              <br />
              <strong>Categoria:</strong> {book.category}
              <br />
            </Text>
          </CardBody>
          <CardFooter
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              colorScheme="red"
              marginRight="2"
              onClick={() => deleteBook(book._id)}
            >
              Eliminar
            </Button>
            <Button
              colorScheme="teal"
              marginRight="2"
              onClick={() => editBook(book)}
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
            <ModalHeader>Editar Libro</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Título"
                value={editedBook.title}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, title: e.target.value })
                }
              />
              <Input
                placeholder="Autor"
                value={editedBook.author}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, author: e.target.value })
                }
              />
              <Input
                placeholder="Descripción"
                value={editedBook.description}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, description: e.target.value })
                }
              />
              <Input
                placeholder="Precio"
                type="number"
                value={editedBook.price}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, price: e.target.value })
                }
              />
              <Input
                placeholder="Categoría"
                value={editedBook.category}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, category: e.target.value })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveEditedBook}>
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

export default Books;
