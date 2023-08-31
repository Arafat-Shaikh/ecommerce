export function fetchProducts() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
