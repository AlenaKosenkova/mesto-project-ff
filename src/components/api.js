/*
Токен: 2cb2188a-a25e-48c4-964b-fdf31730250e
Идентификатор группы: wff-cohort-5"
_id: "f59e98dc40b9812d248fd611"
*/

const config = {
  URL: 'https://mesto.nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  }
}

export const getCards = () => { 
  return fetch(`${config.URL}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const getUser = () => {
  return fetch(`${config.URL}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const changeUser = (userName, userAbout) => {
  return fetch(`${config.URL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
}

export const changeAvatar = (avatarUrl)  => {
  return fetch(`${config.URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const postCard = (cardName, urlName) => {
  return fetch(`${config.URL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: urlName
    })
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const deleteAPICard = (cardId) => {
  return fetch(`${config.URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
}

export const addLike = (cardId) => {
  return fetch(`${config.URL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
}

export const deleteLike = (cardId) => {
  let likesRemove;
  return fetch(`${config.URL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
}