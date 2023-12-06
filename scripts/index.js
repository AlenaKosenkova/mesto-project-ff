// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(name, link) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(event){
    deleteCard(event);
  });
  return cardElement;
}

function deleteCard(event){
  let card = event.target.closest('.card');
  card.remove();
}

initialCards.forEach(item => {
  placesList.append(createCard(item.name, item.link));
});

