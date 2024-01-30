import { createCard, /*initialCards, deleteCard*/ } from "./card.js";
import { closePopup, openPopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getCards, getUser, changeUser, postCard, changeAvatar } from "./api.js";

export const placesList = document.querySelector('.places__list');
export const profileImage = document.querySelector('.profile__image');

/*button for popup*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image_edit-button');

/*popup*/
const popupList = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeAvatar = document.querySelector('.popup_type_new-avatar');
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageContentImage = document.querySelector('.popup__image');
const popupCaptionContentImage = document.querySelector('.popup__caption');

/*popupClose*/
const buttonClosePopupTypeImage = popupTypeImage.querySelector('.popup__close');
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.popup__close');
const buttonClosePopupTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const buttonClosePopupTypeAvatar = popupTypeAvatar.querySelector('.popup__close');

/*popupSubmit*/
const submitButtonTypeAvatar = popupTypeAvatar.querySelector('.popup__button');
const submitButtonTypeNewCard = popupTypeNewCard.querySelector('.popup__button');
const submitButtonTypeEdit = popupTypeEdit.querySelector('.popup__button');

/*forms*/
const newPlaceForm = document.forms.new_place;
const newAvatarForm = document.forms.new_avatar;
const formEditProfile = document.forms.edit_profile;

/*popupInput*/
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardInput = document.querySelector('.popup__input_type_card-name');
const urlCardInput = document.querySelector('.popup__input_type_url');
const avatarInput = document.querySelector('.popup__input_type_avatar');

/*inputError*/
const nameError = formEditProfile.querySelector(`.${nameInput.id}-error`);
const jobError = formEditProfile.querySelector(`.${jobInput.id}-error`);

const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');

popupList.forEach(item => {
  item.classList.add('popup_is-animated');
})

/*initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link, showCard));
});*/

Promise.all([getCards(),getUser()])
  .then(([allCards, user]) => {
    allCards.forEach((card) => {
      placesList.append(createCard(card.name, card.link, card.likes, showCard, card.owner._id, user._id, card._id))
    })
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url('${user.avatar}')`
  })
  .catch(err => console.log(`Ошибка ${err}`))

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  popupError: 'popup__error_visible',
  inputError: 'popup__input_type_error',
  inactiveButtonClass: 'popup__button_disabled',
  submitButtonSelector: '.popup__button',
}

enableValidation(validationConfig);


export function renderLoading(isLoading, button) {
  if(isLoading) { 
    button.textContent = 'Сохранение...'
  }
  if(!isLoading) {
    button.textContent = 'Сохранить'
  }
}

profileEditButton.addEventListener('click', () => {
  openPopup(popupTypeEdit);
  clearValidation(popupTypeEdit, validationConfig);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
  newPlaceForm.reset();
  clearValidation(popupTypeNewCard, validationConfig);
});

avatarEditButton.addEventListener('click', () => {
  openPopup(popupTypeAvatar);
  newAvatarForm.reset(); 
  clearValidation(popupTypeAvatar, validationConfig); 
})

buttonClosePopupTypeEdit.addEventListener('click', () => {closePopup(popupTypeEdit)});
buttonClosePopupTypeNewCard.addEventListener('click', () => {closePopup(popupTypeNewCard)});
buttonClosePopupTypeImage.addEventListener('click', () => {closePopup(popupTypeImage)});
buttonClosePopupTypeAvatar.addEventListener('click', () => (closePopup(popupTypeAvatar)));

export function showCard(name, link){
  openPopup(popupTypeImage);
  popupImageContentImage.src = link;
  popupCaptionContentImage.textContent = name;
  popupImageContentImage.alt = name;
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, submitButtonTypeEdit);
  changeUser(nameInput.value, jobInput.value)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
    })
    .then(() => closePopup(popupTypeEdit))
    .catch(err => console.log(`Ошибка ${err}`))
    .finally(() => renderLoading(false, submitButtonTypeEdit))
}
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

function error(){
  enableValidation(validationConfig);
  //clearValidation(form, validationConfig);
  /*const errorLinkInput = form.querySelector(`.${spanError}-input-error`);
  errorLinkInput.textContent = form.querySelector(`.popup__input_type_${inputType}`).dataset.errorMessage;*/
}

export function loadCard(){
  postCard(cardInput.value, urlCardInput.value)
    .then((card) => {
      placesList.prepend(createCard(card.name, card.link, card.likes, showCard, card.owner._id, card.owner._id, card._id));
    })
    .then(() => closePopup(popupTypeNewCard))
    .catch(err => console.log(`Ошибка ${err}`))
    .finally(() => renderLoading(false, submitButtonTypeNewCard))
  newPlaceForm.reset();
}

function newAvatar() {
  changeAvatar(avatarInput.value)
    .then((avatar) => {
      profileImage.style.backgroundImage = `url('${avatar.avatar}')`
    })
    .then(() => closePopup(popupTypeAvatar))
    .catch(err => console.log(`Ошибка ${err}`))
    .finally(() => renderLoading(false, submitButtonTypeAvatar))
}

function loadImage(imageUrl, loadCallback, errorCallback){
  const img = document.createElement('img');
  img.src = imageUrl;
  img.onload = loadCallback;
  img.onerror = errorCallback;
}

/*function loadAvatar(imageUrl, loadCallback, errorCallback) {
  const div = document.createElement('div');
  div.style.backgroundImage = `url('${imageUrl}')`;
  div.onload = loadCallback;
  div.onerror = errorCallback;
}*/

function handleFormNewPlaceSubmit(evt){
  evt.preventDefault();
  renderLoading(true, submitButtonTypeNewCard);
  loadImage(urlCardInput.value, loadCard, error);
};
newPlaceForm.addEventListener('submit', handleFormNewPlaceSubmit); 

function handleFormNewAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, submitButtonTypeAvatar);
  const avatar = 'avatar';
  loadImage(avatarInput.value, newAvatar, error);
  //loadAvatar(avatarInput.value, newAvatar, error(newAvatarForm, avatar, avatar));
}
newAvatarForm.addEventListener('submit', handleFormNewAvatarSubmit);