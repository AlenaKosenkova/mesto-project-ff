/*
Токен: 2cb2188a-a25e-48c4-964b-fdf31730250e
Идентификатор группы: wff-cohort-5"
_id: "f59e98dc40b9812d248fd611"
*/

import { initialCards, createCard } from "../components/cards.js";
import { showCard, placesList, load, cardInput, urlInput } from "../scripts";

fetch('https://mesto.nomoreparties.co/v1/wff-cohort-5/cards', {
  method: 'GET',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e'
  }
})
  .then(res => res.json())
  .then((addCard) => {
    addCard.forEach((card) => {
      placesList.append(createCard(card.name, card.link, card.likes.length, showCard));
    })
  })

fetch('https://nomoreparties.co/v1/wff-cohort-5/users/me', {
  method: 'GET',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e'
  }
})
  .then(res => res.json())
  /*.then((result) => {
    console.log('результат пользователь: ' + result._id);
  });*/

fetch('https://nomoreparties.co/v1/wff-cohort-5/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Alena Kosenkova',
    about: 'fullstack-developer'
  })
}); 

/*fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/likes/${cardId}`,{
  method: 'PUT',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  },
})
  .then(res => res.json())
  .then((result) => {console.log(result)})*/

/*fetch('https://mesto.nomoreparties.co/v1/wff-cohort-5/cards', {
  method: 'POST',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: cardInput.value,
    link: urlInput.value,
  })
})*/