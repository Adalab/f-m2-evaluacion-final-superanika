'use strict';

const button = document.querySelector('.button');
const results = document.querySelector('.results');
const favSeriesList = document.querySelector('.fav__series');

//obtenemos los datos de la api
function getSeries(){
  const url = 'http://api.tvmaze.com/search/shows?q=';
  const input = document.querySelector('.input');
  const inputValue = input.value;
  fetch(url + inputValue)
    .then( response => response.json())
    .then (data => {
      createList(data); //creamos la lista
      fav(); //añadimos la clase fav y creamos la lista de favoritos
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
    //si el servidor no devuelve imagen, ponemos una por defecto
    if (image === null) {
      seriePreview.src = 'https://via.placeholder.com/210x295/ffffff/6666ff/?text=TV';
    }else {
      seriePreview.src = image.medium;
    }
    listItem.appendChild(seriePreview);
  }
}
//creamos un objeto vacio para luego almacenar los datos de la serie favorita


function fav() {
  const allSeries = document.querySelectorAll('.list__item');
  const favDiv = document.querySelector('.fav__list');
  let infoFav = {
    title: '',
    image: ''
  };
  for (const item of allSeries) {
    // eslint-disable-next-line no-inner-declarations
    function favList() {
      //añade la clase favorita
      item.classList.add('fav');
      infoFav.title = item.firstChild.innerHTML;
      infoFav.image = item.lastChild.src;
      //pintamos la lista de favoritos
      if (infoFav.title !== ''){
        favDiv.classList.remove('hidden');
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

        let savedFav = JSON.parse(localStorage.getItem('savedFav'));

        if (savedFav !== null) {
          savedFav.push(infoFav);
        }else {
          savedFav = [];
          savedFav.push(infoFav);
        }
        localStorage.setItem('savedFav', JSON.stringify(savedFav));

      }else {
        favDiv.classList.add('hidden');
      }
    }
    item.addEventListener('click', favList);
  }
}


function searchSeries() {
  results.innerHTML = '';
  getSeries();

}

JSON.parse(localStorage.getItem('savedFav'));
button.addEventListener('click',searchSeries);


