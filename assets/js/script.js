const searchFormEl = document.querySelector('#search-form');
const weatherForecastDiv = document.getElementById('weather-cards');
const weatherAPI = '0bf01512d291cbf28790b9de360db79a'; 
// const searchHistoryEl = document.getElementById('search-history');

searchFormEl.addEventListener('submit', function (event) {  
    event.preventDefault(); 
     
       const cityName = document.getElementById('cityInput').value; 
    getWeather(cityName)
    saveSearchedCity(cityName);
    });

    let searchedCities = [];

    // document.getElementById('search-form').addEventListener('submit', handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();
        const cityInput = document.getElementById('cityInput');
        const searchedCityName = cityInput.value.trim();

       searchedCities.push(searchedCityName);
    
        displaycityicons();

        cityInput.value = "";

        
    }

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

function fetchWeatherData(cityName) {
    getWeather(cityName);
}

function displayWeatherForecast(data) {
    weatherForecastDiv.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) { 
        const forecastItem = data.list[i];
        const date = new Date(forecastItem.dt * 1000); 
        const temperature = forecastItem.main.temp;
        const weatherDescription = forecastItem.weather[0].description;

        const forecastItemElement = document.createElement('div');
        forecastItemElement.className = 'weather-card';
        forecastItemElement.innerHTML = `
            <h5>Date: ${date.toLocaleDateString()}</h5>
            <p>Temperature: ${temperature}°F</p>
            <p>Weather: ${weatherDescription}</p>
        `;
        weatherForecastDiv.appendChild(forecastItemElement);
    }
}

function saveSearchedCity(cityName) {
    
    let previousCitiesList = JSON.parse(localStorage.getItem('previous-cities-list')) || [];
    previousCitiesList.push(cityName);

    previousCitiesList = [...new Set(previousCitiesList)];
    localStorage.setItem('previous-cities-list', JSON.stringify(previousCitiesList));
    displayPreviousCities();
}
//         function displaycityicons() {

function displayPreviousCities() {
    const cities = JSON.parse(localStorage.getItem('previous-cities-list')) || [];
    
    const previousCitiesList = document.getElementById('previous-cities-list');

    previousCitiesList.innerHTML = ''; 

        cities.forEach(city => {
            
            const icon = document.createElement('button');
            icon.textContent = city;
            icon.classList.add('btn', 'btn-secondary', 'm-1', 'fas', 'fa-search');

            icon.addEventListener('click', () => {
                fetchWeatherData(city);   


                

});
            previousCitiesList.appendChild(icon);



            
});

}
// const removeDuplicateCities = [...new Set(cities)];

//     removeDuplicateCities.forEach(cityName => {
//         const listItem = document.createElement('li');
//         listItem.textContent = cityName;
//         previousCitiesList.appendChild(listItem);        
  

//     });



document.addEventListener('DOMContentLoaded', displayPreviousCities);


    
       

