import { initialCards, deleteCard, likeCard } from "../components/cards.js";
import { showCard, closePopup, closeEscape, closeOverlay } from "../components/modal.js";

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popup = document.querySelectorAll('.popup');
const cardInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');


/*const form = document.forms[1];
function addCard(evt) {
  evt.preventDefault();
  let newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__title').textContent = cardInput.value;
  newCard.querySelector('.card__image').src = urlInput.value;
  newCard.querySelector('.card__image').src = cardInput.value;
  placesList.before(newCard);
  closePopup();
  return newCard;
}
form.addEventListener('submit', addCard);*/

popup.forEach(item => {
  item.classList.add('popup_is-animated');
})

function createCard(name, link, deleteCard) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);  
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

initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link, deleteCard, likeCard, showCard));
});



document.addEventListener('click', function(evt){
  if(evt.target.classList.contains('profile__edit-button')){
    document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
  }
  if(evt.target.classList.contains('profile__add-button')){
    document.querySelector('.popup_type_new-card').classList.add('popup_is-opened');
  }
  document.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeEscape);
  document.addEventListener('click', function(evt){
    if(evt.target.classList.contains('popup__close')){
      closePopup();
    }
  })
})

const formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description');//Воспользуйтесь инструментом .querySelector()

const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');

jobInput.value = profileDescription.textContent;
nameInput.value = profileTitle.textContent;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    //const profileDescription = document.querySelector('.profile__description');
    //const profileTitle = document.querySelector('.profile__title');

    // Вставьте новые значения с помощью textContent
    profileDescription.textContent = jobInput.value;
    profileTitle.textContent = nameInput.value;
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);