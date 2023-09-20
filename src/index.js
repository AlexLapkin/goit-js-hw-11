// Главный скрипт обработки всех функций

import { searchImage } from "./js/search-api";
import { renderList } from "./js/renderList";
import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const contGallery = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');

let page = 1;
let per_page = 40;
let galleryLightBox = new SimpleLightbox('.gallery a');


// Функция прослушивания при отправке формы
   function onSubmit (event) {
   event.preventDefault();
   btnLoad.classList.add("is-hidden");
   contGallery.innerHTML = '';
   const { searchQuery } = event.currentTarget.elements;
   searchImage(searchQuery.value, page)
   .then(function (resp) {
    
     const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = resp.data;
      console.log(resp.data.hits);
      const { totalHits } = resp.data;
            
      if ((resp.data.hits).length > 0) {
      renderList(resp.data.hits, contGallery);
      
      galleryLightBox.refresh();

      Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
      
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
   })
    .catch (console.error (error));
   }


// Функция прослушивания кнопки Load more
function onClickLoadMore () {
   galleryLightBox.refresh();
  page += 1;
  let totalImages = per_page * page;
   
  const { searchQuery } = searchForm.elements;
  
  searchImage(searchQuery.value, page)
  .then(function (resp) {
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
   )
   .catch(console.error (error));
}


searchForm.addEventListener("submit", onSubmit);
btnLoad.addEventListener ("click", onClickLoadMore);


// Функция плавного скролла  
function softScroll() {
const { height: cardHeight } = contGallery.firstElementChild.getBoundingClientRect();

window.scrollBy({
top: cardHeight * 2,
behavior: "smooth",
});
}