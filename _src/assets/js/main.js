'use strict';

const url = 'http://api.tvmaze.com/search/shows?q=';
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const results = document.querySelector('.results');

function getFilms(){
  const inputValue = input.value;
  fetch(url + inputValue)
    .then( response => response.json())
    .then (data => {
      createList(data);
    });
}

function createList(data){
  for (const item of data) {
    const films =item.show;
    const name = films.name;
    const image = films.image.medium;
    const listItem =document.createElement('li');
    listItem.classList.add('list__item');
    results.appendChild(listItem);
    const filmName = document.createElement('h2');
    filmName.classList.add('film__title');
    const titleContent = document.createTextNode(name);
    filmName.appendChild(titleContent);
    listItem.appendChild(filmName);
    const filmPreview = document.createElement('img');
    filmPreview.classList.add('film_img');
    filmPreview.src = image;
    listItem.appendChild(filmPreview);
  }
}



function searchFilms() {
  results.innerHTML = '';
  getFilms();
}

button.addEventListener('click',searchFilms);

