import { showCard, closePopup } from "./modal.js";

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

export function createCard(name, link, deleteCard, likeCard, showCard) {
  const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);  
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(event){
    deleteCard(event);
  });
  cardElement.addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', showCard);
  return cardElement;
};

export function addCard(evt) {
  const cardInput = document.querySelector('.popup__input_type_card-name');
  const urlInput = document.querySelector('.popup__input_type_url');
  evt.preventDefault();
  const cardElement = createCard(cardInput.value, urlInput.value, deleteCard, likeCard, showCard);
  document.querySelector('.places__item').before(cardElement);
  cardInput.value = '';
  urlInput.value = '';
  closePopup();
}

export function deleteCard(event){
  const card = event.target.closest('.card');
  card.remove();
}

export function likeCard(evt){
  if(evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
  }
}