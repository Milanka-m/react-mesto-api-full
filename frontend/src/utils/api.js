class Api {
  constructor({ address }) {
    this._address = address;
  }

  // приватный метод, который получает ответ с сервера и возвращает данные или ошибку
  _checkResponse(res) {
    if (res.ok) {
      // если ответ сервера 200, возвращаются данные
      return res.json();
    }
    // иначе возвращаем промис с ошибкой
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //публичный метод, который получает информацию о пользователе с сервера
  getUsers() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  // метод, который отправляет запрос на сервер для загрузки карточек
  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  // метод, который отправляет запрос на сервер для редактирования данных профиля
  editUser(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)
  }

  // метод добавления карточки на сервер
  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  // метод удаления карточки
  removeCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this._checkResponse)

  } 

  addLikeCard(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  removeLikeCard(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  editAvatar(data) { 
    return fetch(`${this._address}/users/me/avatar`, { 
      method: 'PATCH', 
      headers: { 
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json' 
      }, 
      body: JSON.stringify({ 
        avatar: data.avatar, 
      }) 
    }) 
      .then(this._checkResponse)
  } 
}

const api = new Api({
  address: 'https://api.projectmesto.milana.nomoredomains.monster',
}); 

export default api;