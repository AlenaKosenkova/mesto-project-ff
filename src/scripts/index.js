import { initialCards, createCard } from "../components/cards.js";
import { closePopup, openPopup } from "../components/modal.js";
import { enableValidation } from "../components/validation.js";
import {} from "../components/api.js";

export const placesList = document.querySelector('.places__list');

/*button for popup*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

/*popup*/
const popup = document.querySelectorAll('.popup');
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
export const cardInput = document.querySelector('.popup__input_type_card-name');
export const urlInput = document.querySelector('.popup__input_type_url');

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

/*initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link, showCard));
});*/

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
  profileDescription.textContent = jobInput.value;
  profileTitle.textContent = nameInput.value;
  closePopup(popupTypeEdit);
}
formPopupCard.addEventListener('submit', handleFormEditProfileSubmit);



function error(){
  const errorLinkInput = newPlaceForm.querySelector('.link-input-error');
  errorLinkInput.textContent = newPlaceForm.querySelector('.popup__input_type_url').dataset.errorMessage;
  //newPlaceForm.reset();
  //urlInput.placeholder = 'Введите корректную ссылку';
}

export function load(){
  const likes = 0;
  const cardElement = createCard(cardInput.value, urlInput.value, likes, showCard);
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