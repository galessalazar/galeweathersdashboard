const weatherAPI = '0bf01512d291cbf28790b9de360db79a'
// i copied the url directly from the current weather page, not sure if i should change to the : http://api.openweathermap.org/data/2.5/weather
const apiURL = 'https://api.openweathermap.org/data/2.5/weather'

//  you'll want to create variables that can hold this input after the user has submitted it.

let cityName = 'san-antonio';

const qURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPI}`



fetch(qURL)

const searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    const searchInputVal = document.querySelector('#search-input')

    if(!searchInputVal) {
        console.error('needs input!');
        return;
    }
}

searchFormEl.addEventListener('submit',handleSearchFormSubmit);
