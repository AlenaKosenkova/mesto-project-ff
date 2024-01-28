/*
Токен: 2cb2188a-a25e-48c4-964b-fdf31730250e
Идентификатор группы: wff-cohort-5"
_id: "f59e98dc40b9812d248fd611"
*/


//import { createCard } from "./cards";
import { profileTitle, profileDescription, showCard, placesList } from "../scripts";

let userId;
let userName;
let userAbout;
let cardId;
let cardName;
let cardLink;
let cardLikes;
let cardOwnerId;
let allCards;
let likesAdd;
let likesRemove;
let avatarUrl;
let postCardName;
let postCardLink;
let postCardLikes;
let postCardOwner;
let postCardId;

const config = {
  URL: 'https://mesto.nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  }
}

export const getCards = async () => { 
  await fetch(`${config.URL}/cards`, {
    headers: config.headers
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then((cards) => {
      allCards = cards;
      cards.forEach((card) => {
        cardId = card._id;
        cardName = card.name;
        cardLink = card.link;
        cardLikes = card.likes;
        cardOwnerId = card.owner._id;
      })
    })
    .catch(err => console.log(`Ошибка ${err}`))
}

export const getUser = async () => {
  await fetch(`${config.URL}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
    .then((user) => {
      userId = user._id;
      userName = user.name;
      userAbout = user.about;
      avatarUrl = user.avatar;
    })
    .catch(err => console.log(`Ошибка ${err}`))
    .finally(() => renderLoading(false));
}

(() => {
  getUser()
  .then(() => {
    document.querySelector('.profile__title').textContent = userName;
    document.querySelector('.profile__description').textContent = userAbout;
    document.querySelector('.profile__image').style.backgroundImage = `url('${avatarUrl}')`
  })
  .catch(err => console.log(`Ошибка ${err}`))
})();

export function renderLoading(isLoading) {
  if(isLoading) {
    document.querySelector('.popup__button').textContent = 'Сохранение...';
  }
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
  .then((userInfo) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  .catch(err => console.log(`Ошибка ${err}`))
}

export function showAPICards(createCard, showCard, placesList) {
  getCards()
    .then(() => {
      allCards.forEach((card) => {
        placesList.append(createCard(card.name, card.link, card.likes, showCard, card.owner._id, userId, card._id))
      })
    })
    .catch(err => console.log(`Ошибка ${err}`))
}

export const changeAvatar = (profileImage, avatarUrl)  => {
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
    .then(result => avatarUrl = result.avatar)
    .then(() => profileImage.style.backgroundImage = `url('${avatarUrl}')`)
    .catch(err => console.log(`Ошибка ${err}`))
}

export const postCard = (cardName, urlName, createCard, showCard, placesList) => {
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
    .then((result) => {
      postCardName = result.name;
      postCardLink = result.link;
      postCardLikes = result.likes;
      postCardOwner = result.owner._id;
      postCardId = result._id;
    })
    .then(() => {
      placesList.append(createCard(postCardName, postCardLink, postCardLikes, showCard, postCardOwner, userId, postCardId))
    })
    .then(() => showAPICards(createCard, showCard, placesList))
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

export const addLike = (cardId, cardElement) => {
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
  .then(result => likesAdd = result.likes)
  .then(() => cardElement.querySelector('.card__like-counter').textContent = likesAdd.length)
  .catch(err => console.log(`Ошибка ${err}`))
}

export const deleteLike = (cardId, cardElement) => {
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
  .then(result => likesRemove = result.likes)
  .then(() => cardElement.querySelector('.card__like-counter').textContent = likesRemove.length)
  .catch(err => console.log(`Ошибка ${err}`))
}