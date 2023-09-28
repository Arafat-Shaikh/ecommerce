import { deleteOrderAsync } from "../slices/adminOrderSlice";

export function fetchAllUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/users`);
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

export function adminDeleteUser(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/users/admin/" + userId, {
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

export function adminUpdateUser(user) {
  return new Promise(async (resolve, reject) => {
    console.log(user);
    try {
      const response = await fetch("/users/admin", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
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
