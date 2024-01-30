import { openPopup } from "./modal.js";
import { popupTypeImage, showCard } from "./index.js";
import { deleteAPICard, addLike, deleteLike } from "./api.js";

export function createCard(name, link, likes, showCard, cardOwnerId, userId, cardId) {
  const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__like-counter').textContent = likes.length;
  if(userId === cardOwnerId) {
    cardElement.querySelector('.card__delete-button').classList.remove('card__delete-button_is_hidden');
    cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt){
      deleteCard(evt, cardId);
    })
  } else {
    cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_is_hidden');
  }
  likes.forEach((likeId) => {
    if(likeId._id === userId){
      cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active')
    }
  });
  cardElement.addEventListener('click', function(evt){
    likeCard(evt, cardId, cardElement);
  })
  cardElement.querySelector('.card__image').addEventListener('click', function(evt){
    showCard(evt.target.alt, evt.target.src);
  });
  return cardElement;
};

export function deleteCard(evt, cardId){
  deleteAPICard(cardId)
    .then(() => {
      const card = evt.target.closest('.card');
      card.remove();
    })
    .catch(err => console.log(`Ошибка ${err}`))
  
}

function likeCard(evt, cardId, cardElement){
  deleteLike(cardId)
    .then((likes) => cardElement.querySelector('.card__like-counter').textContent = likes.likes.length)
    .then(() => {
        evt.target.classList.remove('card__like-button_is-active')
    })
    .catch(err => console.log(`Ошибка ${err}`))

  addLike(cardId)
    .then((likes) => cardElement.querySelector('.card__like-counter').textContent = likes.likes.length)
    .then(() => {
      evt.target.classList.add('card__like-button_is-active')
    })
    .catch(err => console.log(`Ошибка ${err}`))
}