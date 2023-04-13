import axios from 'axios';
import Notiflix from 'notiflix';
import layOutListOfFilms from './layOutListOfFilms';
import { showTrendingFilms } from '../index';

const API_KEY = 'f051ac50d3bfe0c3fd75f02c1ff7b688';
const BASE_URL = 'https://api.themoviedb.org/';
const searchInput = document.querySelector('.search-field-js');
const gallery = document.querySelector('.gallery');

searchInput.addEventListener('submit', onSubmitGetAndRender);

export default async function getDataFromAPI(queryName) {
  try {
    const data = await axios
      .get(`${BASE_URL}3/search/movie?api_key=${API_KEY}&query='${queryName}'`)
      .then(response => {
        return response.data;
      });
    return data;
  } catch (error) {
    console.log(error);
  }
}

function onSubmitGetAndRender(evt) {
  evt.preventDefault();
  const keyword = evt.currentTarget.elements.query.value;
  console.log(keyword);
  getDataFromAPI(keyword).then(data => {
    if (data.results.length === 0) {
      Notiflix.Notify.failure(
        'Whoops... We did not found any movie, watch a movie from trends'
      );
      clearPage();
      showTrendingFilms();
      return;
    }
    Notiflix.Notify.success(
      `Congrats! We have found ${data.total_results} movies according to your request `
    );
    console.log(data);
    clearPage();
    layOutListOfFilms(data.results);
  });
}

function clearPage() {
  gallery.innerHTML = '';
}