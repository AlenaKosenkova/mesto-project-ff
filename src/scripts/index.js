import { createCard, /*initialCards, deleteCard*/ } from "../components/cards.js";
import { closePopup, openPopup } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { changeUser, showAPICards, postCard, changeAvatar, renderLoading } from "../components/api.js";

export const placesList = document.querySelector('.places__list');
export const profileImage = document.querySelector('.profile__image');

/*button for popup*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image_edit-button');

/*popup*/
const popup = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeAvatar = document.querySelector('.popup_type_new-avatar');
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

/*popupClose*/
const buttonClosePopupTypeImage = popupTypeImage.querySelector('.popup__close');
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const buttonClosePopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const buttonClosePopupTypeAvatar = popupTypeAvatar.querySelector('.popup__close');

/*forms*/
const newPlaceForm = document.forms.new_place;
const newAvatarForm = document.forms.new_avatar;
export const formPopupCard = document.forms.edit_profile;

/*popupInput*/
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const cardInput = document.querySelector('.popup__input_type_card-name');
export const urlInput = document.querySelector('.popup__input_type_url');
const avatarInput = document.querySelector('.popup__input_type_avatar');

/*inputError*/
export const nameError = formPopupCard.querySelector(`.${nameInput.id}-error`);
export const jobError = formPopupCard.querySelector(`.${jobInput.id}-error`);

export const profileDescription = document.querySelector('.profile__description');
export const profileTitle = document.querySelector('.profile__title');

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

popup.forEach(item => {
  item.classList.add('popup_is-animated');
})

showAPICards(createCard, showCard, placesList);

/*initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link, showCard));
});*/

const validationConfig = {
  spanSelector: '.popup__span',
  inputSelector: '.popup__input',
  popupError: 'popup__error_visible',
  inputError: 'popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
  submitButtonSelector: '.popup__button',
}

profileEditButton.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  clearValidation(popupTypeEdit, validationConfig);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
  clearValidation(popupTypeNewCard, validationConfig);
  newPlaceForm.reset();
});

avatarEditButton.addEventListener('click', () => {
  openPopup(popupTypeAvatar);
  clearValidation(popupTypeAvatar, validationConfig);
  newAvatarForm.reset();  
})

buttonClosePopupTypeEdit.addEventListener('click', () => {closePopup(popupTypeEdit)});
buttonClosePopupTypeNewCard.addEventListener('click', () => {closePopup(popupTypeNewCard)});
buttonClosePopupTypeImage.addEventListener('click', () => {closePopup(popupTypeImage)});
buttonClosePopupTypeAvatar.addEventListener('click', () => (closePopup(popupTypeAvatar)));

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
  renderLoading(true);
  changeUser(nameInput.value, jobInput.value);
  closePopup(popupTypeEdit);
}
formPopupCard.addEventListener('submit', handleFormEditProfileSubmit);

function error(form, spanError, inputType){
  const errorLinkInput = form.querySelector(`.${spanError}-input-error`);
  errorLinkInput.textContent = form.querySelector(`.popup__input_type_${inputType}`).dataset.errorMessage;
}

export function loadCard(){
  //showAPICards(createCard, showCard, placesList);
  //const cardElement = postCard(cardInput.value, urlInput.value, createCard, showCard, placesList);
  placesList.prepend(postCard(cardInput.value, urlInput.value, createCard, showCard, placesList));
  newPlaceForm.reset();
  closePopup(popupTypeNewCard);
  //showAPICards(createCard, showCard, placesList);
}

function newAvatar() {
  changeAvatar(profileImage, avatarInput.value);
  closePopup(popupTypeAvatar);
}

function loadImage(imageUrl, loadCallback, errorCallback){
  const img = document.createElement('img');
  img.src = imageUrl;
  img.onload = loadCallback;
  img.onerror = errorCallback;
}

/*function loadAvatar(imageUrl, loadCallback, errorCallback) {
  const div = document.querySelector('.profile__image');
  div.style.backgroundImage = `url('${imageUrl}')`;
  div.onload = loadCallback;
  div.onerror = errorCallback;
}*/

function handleFormNewPlaceSubmit(evt){
  evt.preventDefault();
  renderLoading(true);
  const link = 'link';
  const url = 'url';
  loadImage(urlInput.value, loadCard, error(newPlaceForm, link, url));
};
newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit); 

function handleFormNewAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  const avatar = 'avatar';
  loadImage(avatarInput.value, newAvatar, error(newAvatarForm, avatar, avatar));
  //loadAvatar(avatarInput.value, newAvatar, error(newAvatarForm, avatar, avatar));
}
newAvatarForm.addEventListener('submit', handleFormNewAvatarSubmit);