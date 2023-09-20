// Главный скрипт обработки всех функций

import { searchImage } from "./js/search-api";
import { renderList } from "./js/renderList";
import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const contGallery = document.querySelector('.gallery');

let page = 1;
let per_page = 40;
let galleryLightBox = new SimpleLightbox('.gallery a');


// Функция прослушивания при отправке формы
   function onSubmit (event) {
   event.preventDefault();
   contGallery.innerHTML = '';
   const { searchQuery } = event.currentTarget.elements;
   searchImage(searchQuery.value, page)
   .then(function (resp) {
    
     const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = resp.data;
     const { totalHits } = resp.data;
            
      if ((resp.data.hits).length > 0) {
      renderList(resp.data.hits, contGallery);
      
       // SimpleLightbox
      galleryLightBox.refresh();

      Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
      softScroll();
  }
    else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.', {
          position: 'center-center',
          timeout: 3000,
          })
    }
   })
    .catch(error => console.error(error))
    //.finally(searchForm.reset());
}


// Функция прослушивания кнопки Load more
function onLoadMore() {
  
  page += 1;
  let totalImages = per_page * page;
  //galleryLightBox.destroy();
    
  const { searchQuery } = searchForm.elements;
  
  searchImage(searchQuery.value, page)
  .then(function (resp) {
   const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = resp.data;
   const { totalHits } = resp.data;
         
   renderList(resp.data.hits, contGallery);
   softScroll();
  
    // SimpleLightbox
   galleryLightBox.refresh();

   if ( totalImages > totalHits ) {
       Notiflix.Notify.info(`We are sorry, but you have reached the end of search results`);
    }
    }
   )
   .catch(error => console.error(error)) ; 
  }


// Функция плавного скролла  
function softScroll() {
  const { height: cardHeight } = contGallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
  top: cardHeight * 1,
  behavior: "smooth",
  });
  }
  

// Функция определения низа страницы
function endOfPage() {
   if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        onLoadMore();
      }
  }
  
// Прослушиватели событий
searchForm.addEventListener("submit", onSubmit);
window.addEventListener("scroll", endOfPage);