export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handlePromise);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handlePromise);
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.title,
        about: userData.description,
      }),
    }).then(this._handlePromise);
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(link),
    }).then(this._handlePromise);
  }

  addLike(Id) {
    return fetch(`${this._baseUrl}/cards/${Id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handlePromise);
  }

  removeLike(Id) {
    return fetch(`${this._baseUrl}/cards/${Id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handlePromise);
  }

  addCard({ name, link, _id }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link, _id }),
    }).then(this._handlePromise);
  }

  deleteCard(Id) {
    return fetch(`${this._baseUrl}/cards/${Id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handlePromise);
  }
}
