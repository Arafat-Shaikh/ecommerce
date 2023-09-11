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

export function fetchAllOrdersAdmin() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/orders`);
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

export function updateOrderAdmin(updatedOrder) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/orders/${updatedOrder.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteOrderApi(orderId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/order/${orderId}`, {
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
