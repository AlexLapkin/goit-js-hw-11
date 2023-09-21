// Головний скрипт обробки усіх функцій

import { searchImage } from "./js/search-api";
import { renderList } from "./js/renderList";
import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const contGallery = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');

let page;
let per_page = 40;
let galleryLightBox = new SimpleLightbox('.gallery a');


// Функція прослуховування форми
   async function onSubmit (event) {
   event.preventDefault();
   btnLoad.classList.add("is-hidden");
   page = 1;
   contGallery.innerHTML = '';
   const { searchQuery } = event.currentTarget.elements;
      
   try {
   const resp = await searchImage(searchQuery.value, page)
     
     const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = resp.data;
      const { totalHits } = resp.data;
      
      if ((resp.data.hits).length > 0) {
      renderList(resp.data.hits, contGallery);
      galleryLightBox.refresh();

      Notiflix.Notify.success(`Hooray! We found ${totalHits} images`, {
        position: 'right-top',
        timeout: 3000,
      });
      btnLoad.classList.remove("is-hidden");
      btnLoad.textContent = "Load more" ;
      softScroll();
     
    }
    else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.', {
          position: 'center-center',
          timeout: 3000,
          } 
        )
    }
   }
    catch (error){ (console.log(error));
   }
  }

// Функція прослуховування кнопки для подальшого завантаження зображень
async function onClickLoadMore () {
  galleryLightBox.refresh();
  page += 1;
  let totalImages = per_page * page;
  const { searchQuery } = searchForm.elements;
    
  try {
  const resp = await searchImage(searchQuery.value, page)
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = resp.data;
  const { totalHits } = resp.data;
          
     if ( totalImages > totalHits ) {
       Notiflix.Notify.info(`We are sorry, but you have reached the end of search results`);
       btnLoad.classList.add("is-hidden");
      }
     
     renderList(resp.data.hits, contGallery);
     softScroll();
     galleryLightBox.refresh();
    }
    catch (error) { (console.log(error));
  }
}

searchForm.addEventListener("submit", onSubmit);
btnLoad.addEventListener ("click", onClickLoadMore);

// Функція плавного скролу
function softScroll() {
const { height: cardHeight } = contGallery.firstElementChild.getBoundingClientRect();

window.scrollBy({
top: cardHeight * 2,
behavior: "smooth",
});
}

/*--
// Функція визначення низу сторінки 
function endOfPage() {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
       onLoadMore();
     }
 }
 
// Прослуховувач подіі
window.addEventListener("scroll", endOfPage);
--*/