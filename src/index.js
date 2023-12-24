const addIconImage = new URL('./images/add-icon.svg', import.meta.url);
const card1Image = new URL('./images/card_1.jpg', import.meta.url);
const card2Image = new URL('./images/card_2.jpg', import.meta.url);
const card3Image = new URL('./images/card_3.jpg', import.meta.url);
const closeImage = new URL('./images/close.svg', import.meta.url);
const deleteIconImage = new URL('./images/delete-icon.svg', import.meta.url);
const editIconImage = new URL('./images/edit-icon.svg', import.meta.url);
const likeActiveImage = new URL('./images/like-active.svg', import.meta.url);
const likeinActiveImage = new URL('./images/like-inactive.svg', import.meta.url);

import './pages/index.css';//импорт главного файла стилей

const imagesMesto = [
  { name: 'addIcon', link: addIconImage },
  { name: 'card1', link: card1Image },
  { name: 'card2', link: card2Image },
  { name: 'card3', link: card3Image },
  { name: 'close', link: closeImage },
  { name: 'deleteIcon', link: deleteIconImage },
  { name: 'editIcon', link: editIconImage },
  { name: 'likeActive', link: likeActiveImage },
  { name: 'likeInactive', link: likeinActiveImage },
  { name: 'interBlackFont', link: interBlackFont },
  { name: 'interMediumFont', link: interMediumFont },
  { name: 'interRegularFont', link: interRegularFont },
]; 