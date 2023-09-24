export function fetchFilteredProducts({ pagination, sorting, selectFilters }) {
  let combinedQueries = { ...pagination, ...sorting, ...selectFilters };
  let queries = "";
  for (let key in combinedQueries) {
    queries += `${key}=${combinedQueries[key]}&`;
  }
  console.log(queries);

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`/products?${queries}`);
    var header = response.headers.get("X-DOCUMENT-COUNT");
    const data = await response.json();
    resolve({ data: data, totalCount: header });
  });
}

export function fetchProductFilters() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`/products/filter`);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`/products/detail/${id}`);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function createProductApi(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
        console.log(product[key]);
      }
      const response = await fetch("/products", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

// export function createProductApi(product) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`/products`, {
//         method: "POST",
//         headers: { "content-type": "multipart/form-data" },
//         body: JSON.stringify(product),
//       });
//       const data = await response.json();
//       resolve({ data });
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

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
