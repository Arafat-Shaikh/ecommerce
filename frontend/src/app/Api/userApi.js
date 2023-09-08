export function fetchCurrentUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/users/search`);
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

export function updateUser(user) {
  return new Promise(async (resolve, reject) => {
    console.log(user);
    try {
      const response = await fetch(`http://localhost:8080/users`, {
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

export function fetchUserOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/users`);
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

export function fetchUserDetails() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/users/info`);
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
