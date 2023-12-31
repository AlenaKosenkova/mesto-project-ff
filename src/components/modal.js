export function showCard(evt){
  document.querySelector('.popup_type_image').classList.add('popup_is-opened');
  document.querySelector('.popup__image').src = evt.target.src;
  document.querySelector('.popup__caption').textContent = evt.target.alt;
  document.querySelector('.popup__image').alt = evt.target.alt;
}

export function closePopup() {
  document.querySelectorAll('.popup').forEach(item => {
    item.classList.remove('popup_is-opened');
  })
}

export function closeEscape(evt){
  if(evt.code === 'Escape'){
    closePopup();
    document.removeEventListener('click', closeEscape);
  }
}

export function closeOverlay(evt){
  if(evt.target === document.querySelector('.popup_type_edit') 
    || evt.target === document.querySelector('.popup_type_new-card') 
    || evt.target === document.querySelector('.popup_type_image')) {
      closePopup();
      document.removeEventListener('click', closeOverlay);
  } 
}