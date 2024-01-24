/*
Токен: 2cb2188a-a25e-48c4-964b-fdf31730250e
Идентификатор группы: wff-cohort-5"
_id: "f59e98dc40b9812d248fd611"
*/

//import { initialCards, createCard } from "../components/cards.js";
//import { /*showCard,*/ /*placesList,*/ nameInput, jobInput, load, cardInput, urlInput } from "../scripts";

const config = {
  URL: 'https://mesto.nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  }
}

function getCards() {
  return fetch(`${config.URL}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

function getUser() {
  return fetch(`${config.URL}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export function showAPICards(createCard, showCard, placesList) {
  getCards()
    .then((addCard) => {
      addCard.forEach((card) => {
        placesList.append(createCard(card.name, card.link, card.likes.length, showCard));
      })
    })
    .catch(err => console.log(`Ошибка ${err}`))
}

export function changeUser(userName, userAbout) {
  return fetch(`${config.URL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
}

export function showUser(profileTitle, profileDescription) {
  getUser()
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
    })
    .catch(err => console.log(`Ошибка ${err}`))
}

export function postCard(cardName, urlName/*, deleteButton*/) {
  //deleteButton.classList.remove('card__delete-button_is_hidden');
  return fetch(`${config.URL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: urlName
    })
  })
}

//let obj = {};
function getObject() {
  const likeButton = document.querySelectorAll('.card__like-button');
  //console.log(likeButton);
  getCards()
    .then((card) => {
      card.forEach((item, i) => {
        let obj = {};
        const cardId = item._id;
        obj[cardId] = Array.from(document.querySelectorAll('.card__like-button'))[i];
        console.log(obj);
        return obj;
        //const likeButton = Array.from(document.querySelectorAll('.card__like-button'));
        /*likeButton.forEach((like, i) => {
          //console.log(likeButton);
            obj[like] = cardId[i];
            console.log('obj2: ' + obj);
            })*/
          })
      });
      //console.log(obj);
    }
      /*document.addEventListener('click', function(evt){
        card.forEach((item) => {
          console.log(item._id);
        })
      })*/
      /*card.forEach((item) => {
        document.addEventListener('click', function(evt){
          //console.log(evt);
          console.log(item._id);
        })
        //console.log(item.likes.length);
      })*/
      //console.log(result)

getObject();

/*function putCard(cardId) {
  return fetch(`${config.URL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res=>res.json())
  .then((result) => {
      console.log(result._id)
  })
}

document.addEventListener('click', function(evt){
  putCard(evt);
})*/

//getInfo();

/*function likeCount(card) {
  let like = 0;
  putCard(card._id)
    .then(res=>res.json())
    .then((data) => {
      data.forEach((item) => {
        like = item.likes
      })
    })
  const likeButton = document.querySelectorAll('.card__like-button');
  likeButton.forEach((item) => {
  }) 
}*/

/*function getCardId() {
  getCards()
    .then(res=>res.json())
    .then((result) => {
      result.forEach((item) => {
        return item._id;
      })
    })
}*/

//getCardId();

/*function likeCount() {
  putCard('65ac35fb5c71cd66435449ec')
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    })
}

likeCount();*/

//likeCount('65ac35fb5c71cd66435449ec');

//document.addEventListener('click', likeCard);

//likeCard();

//document.addEventListener('click', likeCard);

/*fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-5/cards/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  }
})*/

/*fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/likes/${cardId}`,{
  method: 'PUT',
  headers: {
    authorization: '2cb2188a-a25e-48c4-964b-fdf31730250e',
    'Content-Type': 'application/json'
  },
})
  .then(res => res.json())
  .then((result) => {console.log(result)})*/