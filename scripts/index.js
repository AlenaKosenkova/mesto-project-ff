// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardDeleteButton = cardTemplate.querySelector('.card__delete-button');
const placesList = document.querySelector('.places__list');
const cardImage = cardTemplate.querySelector('.card__image');
const cardTitle = cardTemplate.querySelector('.card__title');

initialCards.forEach(item => {
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  
  placesList.append(card);

  card.querySelector('.card__delete-button').addEventListener('click', () => card.style = 'display: none;');
});

