export function deleteProductApi(productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/products/${productId}`, {
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
