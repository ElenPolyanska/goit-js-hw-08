// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
// Change code below this line

const galleryEl = document.querySelector('.gallery');

galleryEl.addEventListener('click', openModalHandler);

const markup = galleryItems
  .map(item => {
    return `
<a class="gallery__item" href="${item.original}">  
<img class="gallery__image" src="${item.preview}" 
alt="${item.description}"   
/>
</a>
`;
  })
  .join('');

galleryEl.insertAdjacentHTML('beforeend', markup);

function openModalHandler(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});


