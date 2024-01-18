import { closeEscape, closeOverlay } from "../scripts/index.js";

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