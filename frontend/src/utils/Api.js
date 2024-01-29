import { configApi } from "./configApi";
class Api {
  constructor(configApi) {
    this._url = configApi.url;
  }

  _checkStateServ(res) {
    if (!res.ok) {
      return Promise.reject(`error: ${res.status}`);
    }
    return res.json();
  }

  getDefaultCard() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    }).then((res) => this._checkStateServ(res));
  }

  createNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkStateServ(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    }).then((res) => this._checkStateServ(res));
  }

  setAvatar(item) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
      body: JSON.stringify({
        avatar: item.link,
      }),
    }).then((res) => this._checkStateServ(res));
  }

  setInfoUser(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkStateServ(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    }).then((res) => this._checkStateServ(res));
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    }).then((res) => this._checkStateServ(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    }).then((res) => this._checkStateServ(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return api.deleteLike(cardId);
    } else {
      return api.addLike(cardId);
    }
  }
}

export const api = new Api(configApi);
