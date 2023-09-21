// Скрипт з функцією рендера карток


// Функція рендера карток до галеріі
export const renderList = (arr, container) => {
    const list = arr.map((item) => `
    <a class="gallery__link" href="${item.largeImageURL}">
    <div class="gallery__item" > 
    <img src="${item.webformatURL}" alt="${item.tags}" class="gallery__image img" loading="lazy" 
    />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${item.likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${item.views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${item.comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
         <span>${item.downloads}</span>
      </p>
    </div>
   </div>
   </a>`
   )
   .join("");
   container.insertAdjacentHTML("beforeend", list);
   }