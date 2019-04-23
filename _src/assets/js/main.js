'use strict';

const button = document.querySelector('.button');
const results = document.querySelector('.results');
const favSeriesList = document.querySelector('.fav__series');
const favDiv = document.querySelector('.fav__list');
const main = document.querySelector('.main');
const noResults = document.querySelector('.no__results');

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
        createList(data);
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
    if (image === null) {
      seriePreview.src = 'https://via.placeholder.com/210x295/ffffff/6666ff/?text=TV';
    }else {
      seriePreview.src = image.medium;
    }
    listItem.appendChild(seriePreview);
  }
}

function createFavs(array) {
  const favItem = document.createElement('li');
  favItem.classList.add('fav__list-item');
  const icon = document.createElement('i');
  icon.classList.add('fas');
  icon.classList.add('fa-times-circle');
  const favTitle = document.createElement('h3');
  favTitle.classList.add('fav__series-title');
  const favTitleContent = document.createTextNode(array.title);
  const favImg = document.createElement('img');
  favImg.classList.add('fav_img');
  favImg.src = array.image;
  favTitle.appendChild(favTitleContent);
  favItem.appendChild(icon);
  favItem.appendChild(favTitle);
  favItem.appendChild(favImg);
  favSeriesList.appendChild(favItem);
}

function showSavedFavorites() {
  const savedFav = JSON.parse(localStorage.getItem('savedFav'));

  if (savedFav !== null && savedFav.length > 0) {
    favDiv.classList.remove('hidden');
    for (const item of savedFav) {
      createFavs(item);
    }
  } else{
    favDiv.classList.add('hidden');
  }
}

function addFavorite(event) {
  event.currentTarget.classList.add('fav');

  let infoFav = {
    title: '',
    image: ''
  };

  infoFav.title = event.currentTarget.firstChild.innerHTML;
  infoFav.image = event.currentTarget.lastChild.src;

  let savedFav = JSON.parse(localStorage.getItem('savedFav'));
  if (savedFav === null) {
    savedFav = [];
  }
  if (!alreadyExist(savedFav, infoFav)) {
    savedFav.push(infoFav);
    localStorage.setItem('savedFav', JSON.stringify(savedFav));

    createFavs(infoFav);
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

