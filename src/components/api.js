/*
Токен: 2cb2188a-a25e-48c4-964b-fdf31730250e
Идентификатор группы: wff-cohort-5"
_id: "f59e98dc40b9812d248fd611"
*/


import { createCard } from "./cards";
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
let likes;

const config = {
  URL: 'https://mesto.nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  }
}

export function getCards() {
  return fetch(`${config.URL}/cards`, {
    method: 'GET',
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
}

export async function getUser() {
  return fetch(`${config.URL}/users/me`, {
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
    })
    .catch(err => console.log(`Ошибка ${err}`))
}

/*Promise.all(getUser())
  .then(() => {
    document.querySelector('.profile__title').textContent = userName;
    document.querySelector('.profile__description').textContent = userAbout;
  })
  .catch(err => console.log(`Ошибка ${err}`))*/

export async function showUser() {
  await getUser()
    .then(() => {
      document.querySelector('.profile__title').textContent = userName;
      document.querySelector('.profile__description').textContent = userAbout;
    })
    .catch(err => console.log(`Ошибка ${err}`))
}

showUser();

export function changeUser(userName, userAbout) {
  return fetch(`${config.URL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
  .then(res => res.json())
  .then((userInfo) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  .catch(err => console.log(`Ошибка ${err}`))
}

export async function showAPICards(createCard, showCard, placesList) {
  await getCards()
    .then(() => {
      allCards.forEach((card) => {
        placesList.append(createCard(card.name, card.link, card.likes, showCard, card.owner._id, userId, card._id))
      })
    })
    .catch(err => console.log(`Ошибка ${err}`))
}

/*export function changeAvatar() {
  return fetch(`${config.URL}/users/me/avatar`, {

  })
}*/

export function postCard(cardName, urlName) {
  return fetch(`${config.URL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: urlName
    })
  })
    .then(res => res.json())
    .catch(err => console.log(`Ошибка ${err}`))
}

export function deleteAPICard(cardId) {
  return fetch(`${config.URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res=>res.json())
  .catch(err => console.log(`Ошибка ${err}`))
}

export function addLike(cardId) {
  return fetch(`${config.URL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    //body: JSON.stringify({
    //  likes: likes
    //})
  })
  .then(res=>res.json())
  //.then(result => console.log(result._id))
}

export function deleteLike(cardId, likes) {
  return fetch(`${config.URL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      likes: likes
    })
  })
  .then(res=>res.json())
  .then(result => likes = result)
}

/*function likeCount(card) {
  let like = 0;
  putCard(card._id)
    .then(res=>res.json())
    .then((data) => {
      data.forEach((item) => {
        like = item.likes
      })
    })
  const likeButton = document.querySelectorAll('.card__like-button');
  likeButton.forEach((item) => {
  }) 
}*/

/*function likeCount() {
  putCard('65ac35fb5c71cd66435449ec')
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    })
}

likeCount();*/

//likeCount('65ac35fb5c71cd66435449ec');

//document.addEventListener('click', likeCard);

//likeCard();

//document.addEventListener('click', likeCard);

/*fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/likes/${cardId}`,{
  method: 'PUT',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  },
})
  .then(res => res.json())
  .then((result) => {console.log(result)})*/