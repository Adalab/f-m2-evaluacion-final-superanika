'use strict';

const button = document.querySelector('.button');
const results = document.querySelector('.results');
const favSeriesList = document.querySelector('.fav__series');
const favDiv = document.querySelector('.fav__list');
const main = document.querySelector('.main');
const noResults = document.querySelector('.no__results');

//obtenemos los datos de la api
function getSeries(){
  const url = 'http://api.tvmaze.com/search/shows?q=';
  const input = document.querySelector('.input');
  const inputValue = input.value;
  fetch(url + inputValue)
    .then( response => response.json())
    .then (data => {
      noResults.innerHTML = '';
      if (data.length === 0){
        errorMsg();
      }else {
        createList(data); //creamos la lista
      }
    });
}
function errorMsg() {
  const error = document.createElement('p');
  const errorMessage = document.createTextNode('La búsqueda realizada no ha obtenido resultados');
  error.classList.add('error');
  error.appendChild(errorMessage);
  noResults.appendChild(error);
  main.appendChild(noResults);
}

function createList(data){
  for (const item of data) {
    const series =item.show;
    const name = series.name;
    const image = series.image;
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
    listItem.addEventListener('click', addFavorite);
    results.appendChild(listItem);
    const serieName = document.createElement('h2');
    serieName.classList.add('serie__title');
    const titleContent = document.createTextNode(name);
    serieName.appendChild(titleContent);
    listItem.appendChild(serieName);
    const seriePreview = document.createElement('img');
    seriePreview.classList.add('serie_img');
    //si el servidor no devuelve imagen, ponemos una por defecto
    if (image === null) {
      seriePreview.src = 'https://via.placeholder.com/210x295/ffffff/6666ff/?text=TV';
    }else {
      seriePreview.src = image.medium;
    }
    listItem.appendChild(seriePreview);
  }
}

// Pintar el listado de favoritos en pantalla
function showSavedFavorites() {
  // Recuperar los favoritos
  const savedFav = JSON.parse(localStorage.getItem('savedFav'));

  // Pintar titulo de series favoritas si hay alguna en favoritos
  if (savedFav !== null && savedFav.length > 0) {
    favDiv.classList.remove('hidden');
    // Pintamos el listado de series favoritas
    for (const item of savedFav) {
      const favItem = document.createElement('li');
      favItem.classList.add('fav__list-item');
      const favTitle = document.createElement('h3');
      favTitle.classList.add('fav__title');
      const favTitleContent = document.createTextNode(item.title);
      const favImg = document.createElement('img');
      favImg.classList.add('fav_img');
      favImg.src = item.image;
      favTitle.appendChild(favTitleContent);
      favItem.appendChild(favTitle);
      favItem.appendChild(favImg);
      favSeriesList.appendChild(favItem);
    }
  } else{
    favDiv.classList.add('hidden');
  }
}

// Pone la clase de favorito al item y añadirlo a localstorage
function addFavorite(event) {
  // Añadir la clase favorito
  event.currentTarget.classList.add('fav');

  // Recuperar informacion item
  let infoFav = {
    title: '',
    image: ''
  };

  infoFav.title = event.currentTarget.firstChild.innerHTML;
  infoFav.image = event.currentTarget.lastChild.src;

  // Recuperar favoritos que tengo guardado en localstorage
  let savedFav = JSON.parse(localStorage.getItem('savedFav'));
  if (savedFav === null) {
    savedFav = [];
  }
  if (!alreadyExist(savedFav, infoFav)) {
    savedFav.push(infoFav);
    localStorage.setItem('savedFav', JSON.stringify(savedFav));

    // Crear el favorito en pantalla
    const favItem = document.createElement('li');
    favItem.classList.add('fav__list-item');
    const favTitle = document.createElement('h3');
    favTitle.classList.add('fav__title');
    const favTitleContent = document.createTextNode(infoFav.title);
    const favImg = document.createElement('img');
    favImg.classList.add('fav_img');
    favImg.src = infoFav.image;
    favTitle.appendChild(favTitleContent);
    favItem.appendChild(favTitle);
    favItem.appendChild(favImg);
    favSeriesList.appendChild(favItem);
  }

}

function alreadyExist(savedFav, infoFav) {
  for (const item of savedFav) {
    if (item.title === infoFav.title) {
      return true;
    }
  }
  return false;
}

function searchSeries() {
  results.innerHTML = '';
  getSeries();

}

button.addEventListener('click',searchSeries);

showSavedFavorites();

