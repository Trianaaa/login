export const getProduct = async (setData) => {
  try {
    const res = await fetch("http://localhost:3002/products");
    const data = await res.json();
    setData(data);
  } catch (error) {
    console.log(error);
    toast.error("Error al obtener los productos");
  }
};

export const updateProduct = async (product, setData) => {
  try {
    await fetch(`http://localhost:3002/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    getProduct(setData);
  } catch (err) {
    console.error(err);
  }
};

export const deleteProduct = (productId, setData) => async () => {
  try {
    await fetch(`http://localhost:3002/products/${productId}`, {
      method: "DELETE",
    });
    getProduct(setData);
  } catch (err) {
    console.error(err);
  }
};
