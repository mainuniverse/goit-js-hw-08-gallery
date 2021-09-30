import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const creatingGallery =  galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      id="modal-content"
    />
  </a>
</li>`;
}).join('');
galleryContainer.insertAdjacentHTML('beforeend', creatingGallery);

//modal


const openModalImage = document.querySelector('.js-lightbox');
const lightboxImage = openModalImage.querySelector('.lightbox__image');
const closeModalImage = document.querySelector('[data-action="close-lightbox"]'); 

galleryContainer.addEventListener('click', onOpenModal);

function onOpenModal(event) {
    window.addEventListener('keydown', onEscClick); //close by ESС 
    event.preventDefault();

    const isGallerySwatch = event.target.classList.contains('gallery__image');
    
    if(!isGallerySwatch){
        return;
    }
    if (event) {
        openModalImage.classList.add('is-open');
        lightboxImage.src = event.target.dataset.source; 
        lightboxImage.alt = event.target.alt;
    }
}
//close by icon x
closeModalImage.addEventListener('click', onCloseModal);

function onCloseModal() {
    window.removeEventListener('keydown', onEscClick); 
    openModalImage.classList.remove('is-open');
     
    lightboxImage.src = '';
    lightboxImage.alt = '';
}

//close by backdrop
const backdropClick = document.querySelector('.lightbox__overlay');

backdropClick.addEventListener('click', onBackdropClick);

function onBackdropClick() {
    onCloseModal();

    console.log('кликнули по backdrop');
}
//close by esc
function onEscClick(event) {
    const ESC_KEY_CODE = 'Escape';
    console.log(event.code);

    if (event.code === ESC_KEY_CODE) {
        onCloseModal();
    }
}

//button <- and ->
const modalContent = document.getElementById('modal-content');
const dataSources = [];

modalContent.addEventListener('keydown', e => {
  const currentIndex = dataSources.indexOf(modalContent.src);
  if (e.key === 'ArrowLeft') {
    leftClick(currentIndex);
  } else if (e.key === 'ArrowRight') {
    rightClick(currentIndex);
  }
});

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = dataSources.length - 1;
  }
 modalContent.src = dataSources[nextIndex];
}

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === dataSources.length) {
    nextIndex = 0;
  }
  galleryContainer.src = dataSources[nextIndex];
}


// const imagesRef = document.querySelectorAll('.promo-image');
// const modalRef = document.getElementById('modal-window');
//const modalContentRef = document.getElementById('modal-content');
// imagesRef.forEach(element => {
//   dataSources.push(element.dataset.source);
//   element.addEventListener('click', function (e) {
//     modalRef.style.display = 'block';
//     modalContentRef.src = element.dataset.source;
//   });
// });

// modalRef.querySelector('.close').addEventListener('click', () => {
//   modalRef.style.display = 'none';
// });
/**
 * Crete page with images in modal window
 * User can change image with button <- and ->
 */