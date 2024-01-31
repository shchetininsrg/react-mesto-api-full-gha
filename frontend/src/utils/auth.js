const url = "https://api.schetininsrg.nomoredomainsmonster.ru/";
const headers = {
  "Content-Type": "application/json",
};

const checkStateServ = (res) => {
  if (!res.ok) {
    return Promise.reject(`error: ${res.status}`);
  }
  return res.json();
};

export const login = (email, password) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkStateServ(res);
  });
};

export const register = (email, password) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkStateServ(res);
  });
};

export const checkToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkStateServ(res);
  });
};
