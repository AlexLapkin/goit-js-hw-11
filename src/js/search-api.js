// Скрипт з асінхроною функцією запиту за ключовим словом 
import axios from "axios";


// Асинхронна функція запиту на Pixabay
export async function searchImage (word, page) {
   
   const API_KEY = '39523931-0ebb3b1d8d203aea00476c616' ;
   const BASE_URL = 'https://pixabay.com/api/' ;

   const options = {
     params: { 
     key: API_KEY,
     q: word,
     image_type: 'photo',
     orientation: 'horizontal',
     safesearch: 'true',
     page: page,
     per_page: 40,
   },
 }
     return await axios.get(BASE_URL, options);
}