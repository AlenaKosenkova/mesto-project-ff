import { openPopup } from "./modal.js";
import { popupTypeImage } from "../scripts/index.js";
import { deleteAPICard, addLike, deleteLike } from "./api.js";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

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
    //console.log(cardId);
    likeCard(evt, cardElement, cardId, likes, userId);
  })
  cardElement.querySelector('.card__image').addEventListener('click', function(evt){
    openPopup(popupTypeImage);
    showCard(evt.target.alt, evt.target.src);
  });
  return cardElement;
};

export function deleteCard(evt, cardId){
  deleteAPICard(cardId);
  const card = evt.target.closest('.card');
  card.remove();
}

function likeCard(evt, cardElement, cardId, likes){
  //console.log(likes);
  //addLike(cardId);
  //deleteLike(cardId);
  if(evt.target.classList.contains('card__like-button')){ 
    //console.log(likes.length)
    evt.target.classList.toggle('card__like-button_is-active');
    addLike(cardId);
  }
  if(evt.target.classList.contains('card__like-button_is-active')) {
    console.log(likes);
    deleteLike(cardId, likes);
    console.log(likes);
    //evt.target.classList.toggle('card__like-button'); 
  }


  cardElement.querySelector('.card__like-counter').textContent = likes.length;
  //likeCount(evt);
}