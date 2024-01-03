import { initialCards, createCard, deleteCard, likeCard } from "../components/cards.js";
import { closePopup, openPopup } from "../components/modal.js";

const placesList = document.querySelector('.places__list');

/*button for popup*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const cardImage = document.querySelectorAll('.card__image');

/*popup*/
const popup = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

/*forms*/
const newPlaceForm = document.forms.new_place;
const editProfileForm = document.forms.edit_profile;

/*popupInput*/
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');

popup.forEach(item => {
  item.classList.add('popup_is-animated');
})

initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link));
});

profileEditButton.addEventListener('click', function(){
  openPopup(popupTypeEdit);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
  popupTypeEdit.querySelector('.popup__close').addEventListener('click', function(){
      closePopup(popupTypeEdit);
    })
});

profileAddButton.addEventListener('click', function(){
  openPopup(popupTypeNewCard);
  popupTypeNewCard.querySelector('.popup__close').addEventListener('click', function(){
    closePopup(popupTypeNewCard);
  })
});

document.addEventListener('click', function(evt){
  if(evt.target.classList.contains('card__image')){
    openPopup(popupTypeImage);
    showCard(evt);
    popupTypeImage.querySelector('.popup__close').addEventListener('click', function(){
      closePopup(popupTypeImage);
    })
  }
})

/*cardImage.forEach(item => {
  item.addEventListener('click', function(evt){
    openPopup(popupTypeImage);
    showCard(evt);
    popupTypeImage.querySelector('.popup__close').addEventListener('click', function(){
      closePopup(popupTypeImage);
    })
  })
})*/

function showCard(evt){
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  popupImage.alt = evt.target.alt;
}

function closeEscape(evt){
  if(evt.code === 'Escape'){
    popup.forEach(item => {
      if(item.classList.contains('popup_is-opened')){
        closePopup(item);
      }
    })
}}
function closeOverlay(evt){
  closePopup(evt.target);
}

document.addEventListener('keydown', closeEscape);
document.addEventListener('click', closeOverlay);

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  profileDescription.textContent = jobInput.value;
  profileTitle.textContent = nameInput.value;
  closePopup(popupTypeEdit);
}

nameInput.addEventListener('input', function(){
  if(nameInput.value.length > 12){
    nameInput.value = '';
    nameInput.placeholder = 'Не более 12 символов';
  } else {
    editProfileForm.addEventListener('submit', handleFormEditProfileSubmit);
  }
})

jobInput.addEventListener('input', function(){
  if(jobInput.value.length > 45) {
    jobInput.value = '';
    jobInput.placeholder = 'Не более 45 символов';
  } else {
    editProfileForm.addEventListener('submit', handleFormEditProfileSubmit);
  }
})

function error(){
    newPlaceForm.reset();
    urlInput.placeholder = 'Введите корректную ссылку';
}

function load(){
  const cardElement = createCard(cardInput.value, urlInput.value);
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