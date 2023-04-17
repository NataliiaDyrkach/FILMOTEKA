import { clearPage } from "./fetch_by_keyword";
export default async function layOutListOfMyLib(arrayFilms) {

  const gallery = document.querySelector('.gallery');
  arrayFilms.map(item => {
    const {
      genres,
      poster_path,
      backdrop_path,
      id,
      title,
      name,
      release_date,
    } = item;

    let genresArray = [];
    let date = release_date.substring(0, 4);

    genres.map(genre => {
      genresArray.push(genre.name);
    });
    let genresString = genresArray.join(', ');

    const dataCard = `
      <div class="film-card" >
      <a href="#">
        <div class="thumb">
          <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="film1" loading="lazy" data-id="${id}" />
        </div>
      </a>
      <div class="info">
        <div class="info-container"> 
        <p class="film-name">${title}</p>
        <p class="film-info">${genresString} | ${date}</p>
        </div>
      </div>
    </div>`;
    gallery.insertAdjacentHTML('beforeend', dataCard);

  });
}
