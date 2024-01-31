export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscape);
  document.addEventListener('click', closeOverlay);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscape);
  document.removeEventListener('click', closeOverlay);
}

function closeEscape(evt){
  if(evt.code === 'Escape'){
    if(document.querySelector('.popup_is-opened')){
      closePopup(document.querySelector('.popup_is-opened'));
    }
}}

function closeOverlay(evt){
  if(evt.target.classList.contains('popup_is-opened')){
    closePopup(evt.target);
  }
}