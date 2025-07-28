export const getProduct = async (setData) => {
  try {
    const res = await fetch("https://api-service-3s0x.onrender.com/products");
    const data = await res.json();
    setData(data);
  } catch (error) {
    console.log(error);
    toast.error("Error al obtener los productos");
  }
};

export const updateProduct = async (product, setData) => {
  try {
    await fetch(`https://api-service-3s0x.onrender.com/products/${product._id}`, {
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
    await fetch(`https://api-service-3s0x.onrender.com/products/${productId}`, {
      method: "DELETE",
    });
    getProduct(setData);
  } catch (err) {
    console.error(err);
  }
};
