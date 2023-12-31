export function signupUser(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/auth/signup`, {
        method: "POST",
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

export function loginUser(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        console.log(response);
        const error = await response.text();
        console.log(error.message);
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/auth/logout`);
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

export function verifyUserSession() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`auth/check`);

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}
