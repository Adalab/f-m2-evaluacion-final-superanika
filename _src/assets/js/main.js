'use strict';

const button = document.querySelector('.button');
const results = document.querySelector('.results');

function getSeries(){
  const url = 'http://api.tvmaze.com/search/shows?q=';
  const input = document.querySelector('.input');
  const inputValue = input.value;
  fetch(url + inputValue)
    .then( response => response.json())
    .then (data => {
      createList(data);
      favorite();
    });
}

function createList(data){
  for (const item of data) {
    const series =item.show;
    const name = series.name;
    const image = series.image;
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
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
function favorite() {
  const allSeries = document.querySelectorAll('.list__item');
  for (const item of allSeries) {
    item.addEventListener('click', function(){item.classList.toggle('fav');});
  }
}

function searchSeries() {
  results.innerHTML = '';
  getSeries();
 
}

button.addEventListener('click',searchSeries);

