export function updateOrderAdmin(updatedOrder) {
  return new Promise(async (resolve, reject) => {
    console.log(updatedOrder);
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

export function fetchUserOrdersByAdmin(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/orders/admin/${userId}`);
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

export function deleteOrderApi(orderId) {
  return new Promise(async (resolve, reject) => {
    console.log(orderId);
    try {
      const response = await fetch(`/orders/${orderId}`, {
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
