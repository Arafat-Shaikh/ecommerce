export function createOrderApi(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/orders`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}



export function fetchOrderByUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/orders/user`);
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}


