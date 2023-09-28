export function createProductApi(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/products`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteProductApi(productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/product/${productId}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function updateProductApi(updatedProduct) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/product`, updatedProduct.id, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}
