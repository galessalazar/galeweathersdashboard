const searchFormEl = document.querySelector('#search-form');
const weatherForecastDiv = document.getElementById('weather-cards');
const weatherAPI = '0bf01512d291cbf28790b9de360db79a'; 

searchFormEl.addEventListener('submit', function (event) {  
    event.preventDefault(); 
     
    document.querySelector('#button').addEventListener('click',function(){
       const cityName = document.getElementById('cityInput').value; 
    getWeather(cityName)
    saveSearchedCity(cityName);
    })
});

function getWeather(cityName) { 
    const apiURL = 'https://api.openweathermap.org/data/2.5/forecast';
    const qURL = `${apiURL}?q=${cityName}&appid=${weatherAPI}&units=imperial`; 

    fetch(qURL)
        .then(response => {
            console.log(response);
            if (!response.ok) {
               
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherForecast(data);
            console.log(data);
        })
        .catch(error => {
            console.error('gale this is broke:', error);
            
        });
}

function displayWeatherForecast(data) {
    weatherForecastDiv.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) { 
        const forecastItem = data.list[i];
        const date = new Date(forecastItem.dt * 1000); 
        const temperature = forecastItem.main.temp;
        const weatherDescription = forecastItem.weather[0].description;

        const forecastItemElement = document.createElement('div');
        forecastItemElement.className = 'weather-cards';
        forecastItemElement.innerHTML = `
            <h5>Date: ${date.toLocaleDateString()}</h5>
            <p>Temperature: ${temperature}°F</p>
            <p>Weather: ${weatherDescription}</p>
        `;
        weatherForecastDiv.appendChild(forecastItemElement);
    }
}

function saveSearchedCity(cityName) {
    
    let cities = JSON.parse(localStorage.getItem('previous-cities-list')) || [];
    cities.push(cityName);
    localStorage.setItem('previous-cities-list', JSON.stringify(cities));
    displayPreviousCities();
}

function displayPreviousCities() {
    const cities = JSON.parse(localStorage.getItem('previous-cities-list')) || [];
    
    const previousCitiesList = document.getElementById('previous-cities-list');
    previousCitiesList.innerHTML = ''; 
    const removeDuplicateCities = [...new Set(cities)];

    removeDuplicateCities.forEach(cityName => {
        const listItem = document.createElement('li');
        listItem.textContent = cityName;
        previousCitiesList.appendChild(listItem);
    });
}


document.addEventListener('DOMContentLoaded', displayPreviousCities);

// const cityName = document.getElementById('cityInput').value;
// saveSearchedCity(cityName);


