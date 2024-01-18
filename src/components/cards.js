import { openPopup } from "./modal.js";
import { popupTypeImage } from "../scripts/index.js";

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

export function createCard(name, link, showCard) {
  const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);  
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt){
    deleteCard(evt);
  });
  cardElement.addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', function(evt){
    openPopup(popupTypeImage);
    showCard(evt.target.alt, evt.target.src);
  });
  return cardElement;
};

function deleteCard(evt){
  const card = evt.target.closest('.card');
  card.remove();
}

function likeCard(evt){
  if(evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
  }
}