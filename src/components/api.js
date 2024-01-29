/*
Токен: 2cb2188a-a25e-48c4-964b-fdf31730250e
Идентификатор группы: wff-cohort-5"
_id: "f59e98dc40b9812d248fd611"
*/


//import { createCard } from "./cards";
import { showCard } from "../scripts";
import { createCard } from "./cards";

const config = {
  URL: 'https://mesto.nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  }
}

export function renderLoading(isLoading) {
  if(isLoading) {
    Array.from(document.querySelectorAll('.popup__button')).forEach((button) => 
    button.textContent = 'Сохранение...'
    )}
  if(!isLoading) {
    Array.from(document.querySelectorAll('.popup__button')).forEach((button) => 
    button.textContent = 'Сохранить'
  )}
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
    .catch(err => console.log(`Ошибка ${err}`))
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
    .catch(err => console.log(`Ошибка ${err}`))
}

Promise.all([getCards(),getUser()])
  .then(([allCards, user]) => {
    allCards.forEach((card) => {
      document.querySelector('.places__list').append(createCard(card.name, card.link, card.likes, showCard, card.owner._id, user._id, card._id))
    })
    document.querySelector('.profile__title').textContent = user.name;
    document.querySelector('.profile__description').textContent = user.about;
    document.querySelector('.profile__image').style.backgroundImage = `url('${user.avatar}')`
  })
  .catch(err => console.log(`Ошибка ${err}`))

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
  .catch(err => console.log(`Ошибка ${err}`))
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
    .catch(err => console.log(`Ошибка ${err}`))
    .finally(() => renderLoading(false))
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
    .catch(err => console.log(`Ошибка ${err}`))
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
  .catch(err => console.log(`Ошибка ${err}`))
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
  .catch(err => console.log(`Ошибка ${err}`))
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
  .catch(err => console.log(`Ошибка ${err}`))
}