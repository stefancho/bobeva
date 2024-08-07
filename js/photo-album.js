function createImage(src) {
  const image = document.createElement('img');
  image.src = src;
  return image;
}

function createHyperLink(href) {
  const a = document.createElement('a');
  a.href = href;
  return a;
}

function createArrow(nextArrow){
  const img = document.createElement('img');
  img.classList.add('pointer');
  if(nextArrow) {
    img.src = "./images/icons/arrow_forward.svg";
  }
  else {
    img.src = "./images/icons/arrow_back.svg";
  }
  return img;
}
// Appends image with imgSrc along with forward and backward arrows
function appendImage(container, imgSrc) {

  const image = createImage(imgSrc);
  container.appendChild(prevArrow)
  container.appendChild(image);
  container.appendChild(nextArrow);
  return image;
}

function onThumbnailClick(event) {
  event.preventDefault();
  currentIndex = event.currentTarget.dataset.index;
  appendImage(modalView, event.currentTarget.src);

  document.body.classList.add('no-scroll');
  modalView.style.top = (window.scrollY || window.pageYOffSet) + (NAV_HEIGHT/2) + 'px';
  modalView.classList.remove('hidden');

  document.addEventListener('keydown', nextPhoto);
}

function onModalClick() {
  hideModal();
}

function onNextImgClick(event) {
  nextPhoto({key:"ArrowRight"})
  event.stopPropagation();
}

function onPrevImgClick(event) {
  nextPhoto({key:"ArrowLeft"})
  event.stopPropagation();
}


function hideModal() {
  document.body.classList.remove('no-scroll');
  modalView.classList.add('hidden');
  modalView.innerHTML = '';
  document.removeEventListener('keydown', nextPhoto);
}

function nextPhoto(event) {
  if (event.key === 'Escape') {
    hideModal();
    return;
  }

  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return;
  }

  let nextIndex = currentIndex;
  const previous = event.key === 'ArrowLeft';
  if (previous) {
    if(nextIndex-- === 0){
      nextIndex = PHOTO_LIST.length - 1;
    }
  } else {
    if(nextIndex++ === PHOTO_LIST.length -1){
      nextIndex = 0;
    }
  }

  if (nextIndex < 0 || nextIndex == PHOTO_LIST.length) {
    return;
  }
  const photoSrc = PHOTO_LIST[nextIndex];
  modalView.innerHTML = '';
  const img = appendImage(modalView, photoSrc);
  if (previous) {
    img.classList.add('animate-next');
  } else {
    img.classList.add('animate-prev');
  }
  currentIndex = nextIndex;
}

function galleryTimer()
{
  const hyperLinks = albumView.querySelectorAll('a');
  for (const a of hyperLinks) {
    if(!a.checkVisibility()){//rotate elents
      const firstLink = hyperLinks[0];
      firstLink.remove();
      albumView.append(firstLink);
      break;
    }
  }

  setTimeout(galleryTimer, 4000);
}


setTimeout(galleryTimer, 4000);

let currentIndex = null;
const albumView = document.querySelector('#images');
for (let i = 0; i < PHOTO_LIST.length; i++) {
  const photoSrc = PHOTO_LIST[i];
  const image = createImage(photoSrc);
  const containerLink = createHyperLink('#');
  containerLink.appendChild(image);
  image.dataset.index = i;
  image.addEventListener('click', onThumbnailClick);
  albumView.appendChild(containerLink);
}

const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);

const nextArrow = createArrow(true);
const prevArrow = createArrow(false);
nextArrow.addEventListener('click', onNextImgClick);
prevArrow.addEventListener('click', onPrevImgClick);

