import { initialCards, createCard, addCard, deleteCard, likeCard } from "../components/cards.js";
import { showCard, closePopup, closeEscape, closeOverlay } from "../components/modal.js";

const placesList = document.querySelector('.places__list');
const popup = document.querySelectorAll('.popup');

const newPlaceForm = document.forms.new_place;
newPlaceForm.addEventListener('submit', addCard);

popup.forEach(item => {
  item.classList.add('popup_is-animated');
})

initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link, deleteCard, likeCard, showCard));
});

document.addEventListener('click', function(evt){
  if(evt.target.classList.contains('profile__edit-button')){
    document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
    jobInput.value = document.querySelector('.profile__description').textContent;
    nameInput.value = document.querySelector('.profile__title').textContent;
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

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileDescription = document.querySelector('.profile__description');
    const profileTitle = document.querySelector('.profile__title');
    // Вставьте новые значения с помощью textContent
    profileDescription.textContent = jobValue;
    profileTitle.textContent = nameValue;
    closePopup();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);