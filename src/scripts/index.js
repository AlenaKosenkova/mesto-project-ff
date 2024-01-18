import { initialCards, createCard } from "../components/cards.js";
import { closePopup, openPopup } from "../components/modal.js";
import { enableValidation } from "../components/validation.js";
//import { nameError, jobError } from "../components/validation.js";

const placesList = document.querySelector('.places__list');

/*button for popup*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
//const cardImage = document.querySelectorAll('.card__image');

/*popup*/
const popup = document.querySelectorAll('.popup');
//const popupIsOpened = document.querySelector('.popup_is-opened');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const buttonClosePopupTypeImage = popupTypeImage.querySelector('.popup__close');
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const buttonClosePopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');

/*forms*/
const newPlaceForm = document.forms.new_place;
export const formPopupCard = document.forms.edit_profile;

/*popupInput*/
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
const cardInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

/*inputError*/
export const nameError = formPopupCard.querySelector(`.${nameInput.id}-error`);
export const jobError = formPopupCard.querySelector(`.${jobInput.id}-error`);

const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

//clearValidation(profileForm, validationConfig); 

popup.forEach(item => {
  item.classList.add('popup_is-animated');
})

initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link, showCard));
});

profileEditButton.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard)
  newPlaceForm.reset();
});

buttonClosePopupTypeEdit.addEventListener('click', () => {closePopup(popupTypeEdit)});

buttonClosePopupTypeNewCard.addEventListener('click', () => {closePopup(popupTypeNewCard)});

buttonClosePopupTypeImage.addEventListener('click', () => {closePopup(popupTypeImage)});

export function showCard(name, link){
  popupImage.src = link;
  popupCaption.textContent = name;
  popupImage.alt = name;
}

export function closeEscape(evt){
  if(evt.code === 'Escape'){
    if(document.querySelector('.popup_is-opened')){
      closePopup(document.querySelector('.popup_is-opened'));
    }
}}

export function closeOverlay(evt){
  if(evt.target.classList.contains('popup_is-opened')){
    closePopup(evt.target);
  }
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  /*if(nameInput.value.length > 12){
    nameInput.value = '';
    nameInput.placeholder = 'Не более 12 символов';
  } else *//*if(jobInput.value.length > 45) {
    jobInput.value = '';
    jobInput.placeholder = 'Не более 45 символов';
  } else */ //{
  profileDescription.textContent = jobInput.value;
  profileTitle.textContent = nameInput.value;
  closePopup(popupTypeEdit);
//}
}
formPopupCard.addEventListener('submit', handleFormEditProfileSubmit);



function error(){
    newPlaceForm.reset();
    urlInput.placeholder = 'Введите корректную ссылку';
    //urlInput.setCustomValidity(urlInput.dataset.errorMessage);
}

function load(){
  const cardElement = createCard(cardInput.value, urlInput.value, showCard);
  placesList.prepend(cardElement);
  newPlaceForm.reset();
  closePopup(popupTypeNewCard);
}

function loadImage(imageUrl, loadCallback, errorCallback){
  const img = document.createElement('img');
  img.src = imageUrl;
  img.onload = loadCallback;
  img.onerror = errorCallback;
}

function handleFormNewPlaceSubmit(evt){
  evt.preventDefault();
  loadImage(urlInput.value, load, error);
};
newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit); 