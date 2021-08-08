const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону
const list = document.querySelector('.js-gallery')
const modal = document.querySelector('.js-lightbox')
const modalImage = document.querySelector('.lightbox__image')
const modalCloseBtn = document.querySelector('.lightbox__button')
const modalOverlay = document.querySelector('.lightbox__overlay')
const listEl = galleryItems.map(({ preview, original, description }) => { return (`<li class="gallery__item">
  <a
    class="gallery__link"
    href='${original}'
  >
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt= '${description}'
    />
  </a>
</li>`)
}).join(" ")

list.insertAdjacentHTML('beforeend', listEl)

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. 
//Открытие модального окна по клику на элементе галереи.
//Подмена значения атрибута src элемента img.lightbox__image.
list.addEventListener('click', onClickOpenModal)
function onClickOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return
  }
  event.preventDefault(); //отмена перехода по ссылке
  modalImage.src = event.target.dataset.source
  modalImage.alt = event.target.alt
  modal.classList.add('is-open')

  window.addEventListener('keydown', onEscKeyPress)
  window.addEventListener('keydown', onArrowLeftPress)
  window.addEventListener('keydown', onArrowRightPress)
}
//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
modalCloseBtn.addEventListener('click', onCloseModal)
function onCloseModal(event) {
  modal.classList.remove('is-open')

   //Очистка значения атрибута src элемента img.lightbox__image.
  
  modalImage.src = '';
  modalImage.alt = '';

  window.removeEventListener('keydown', onEscKeyPress)
  window.removeEventListener('keydown', onArrowLeftPress)
  window.removeEventListener('keydown', onArrowRightPress)
}

modalOverlay.addEventListener('click', onOverlayClick)
function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

// Закрытие модального окна по нажатию клавиши ESC.

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal()
  }
}
 
function onArrowLeftPress(event) {
  if (event.code === 'ArrowLeft') {
    const sources = itemsDefault.map(({ original }) => original)
    let indexOfCurrentImg = sources.indexOf(modalImage.src)

    if (indexOfCurrentImg === 0) {
      indexOfCurrentImg = sources.length
    }
    modalImage.src = sources[indexOfCurrentImg - 1]
    console.log(indexOfCurrentImg)
  }
}

//ArrowRight

function onArrowRightPress(event) {
  if (event.code === 'ArrowRight') {
    const sources = itemsDefault.map(({ original }) => original)
    let indexOfCurrentImg = sources.indexOf(modalImage.src)

    if (indexOfCurrentImg + 1 > sources.length - 1) {
      indexOfCurrentImg = -1
    }
    modalImage.src = sources[indexOfCurrentImg + 1]
    console.log(indexOfCurrentImg + 1)
  }
}