export function addToCartApi(product) {
  console.log(product);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Corrected headers
        },
        body: JSON.stringify(product), // Corrected body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchCartByUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function updateCartItem(item) {
  return new Promise(async (resolve, reject) => {
    console.log(item.id);
    console.log(item);
    try {
      const response = await fetch(`http://localhost:8080/cart/${item.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteCartItemApi(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function emptyCart() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}
