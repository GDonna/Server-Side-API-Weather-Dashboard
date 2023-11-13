document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const cityInput = document.getElementById('cityInput');
    const currentWeatherDiv = document.getElementById('currentWeather');
    const forecastDiv = document.getElementById('forecast');
    const searchHistoryDiv = document.getElementById('searchHistory');
    const clearSearchHistory = document.getElementById('clearHistory');
  
    // Add event listener for clicking on the search button
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const cityName = cityInput.value.trim();
      if (cityName !== '') {
        getWeatherData(cityName);
        cityInput.value = '';
      }
    });
  
    // Add event listener for clicking on a city in the search history
    searchHistoryDiv.addEventListener('click', function (event) {
      
        console.log('City Name:', cityName);        
        const cityName = event.target.textContent; // Use textContent to get the city name
      if (cityName !== '') {
        getWeatherData(cityName);
      }
    });
  
    function getWeatherData(cityName) {

      const apiKey = '017c69d7035a544dbc62c2b4507ad154';
      const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=metric";
      const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+apiKey+"&units=metric";
  
      // Fetch current weather data
      fetch(currentWeatherUrl)  // Corrected this line
        .then(response => response.json())
        .then(data => {
          // Update currentWeatherDiv based on the fetched data
          console.log('Curent Weather Data:', data)
          const { name, main, weather, wind, dt } = data;
          const iconUrl = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
  
          const currentHtml = `
            <h2>${name} Weather</h2>
            <p>Date: ${new Date(dt * 1000).toLocaleDateString()}</p>
            <img src="${iconUrl}" alt="${weather[0].description}">
            <p>Temperature: ${main.temp} °C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
            <p>Condition: ${weather[0].description}</p>
          `;
  
          currentWeatherDiv.innerHTML = currentHtml;
        })
        .catch(error => {
          console.error('Error fetching current weather:', error);
        });
  
      // Fetch 5-day forecast data
      fetch(forecastUrl)
        .then(response => response.json())
        .then(forecastData => {
          // Update forecastDiv based on the fetched data
          const forecastItems = forecastData.list.slice(0, 5); // Get the first 5 items for a 5-day forecast
  
          const forecastHtml = forecastItems.map(item => {
            const iconUrl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
            return `
              <div class="forecast-item">
                <p>Date: ${new Date(item.dt * 1000).toLocaleDateString()}</p>
                <img src="${iconUrl}" alt="${item.weather[0].description}">
                <p>Temperature: ${item.main.temp} °C</p>
                <p>Humidity: ${item.main.humidity}%</p>
                <p>Wind Speed: ${item.wind.speed} m/s</p>
                <p>Condition: ${item.weather[0].description}</p>
              </div>
            `;
          });
  
          forecastDiv.innerHTML = forecastHtml.join('');
        })
        .catch(error => {
          console.error('Error fetching forecast:', error);
        });
  
      // Add cityName to search history
      addToSearchHistory(cityName);
    }
  
    function addToSearchHistory(cityName) {
      const searchHistoryItem = document.createElement('div');
      searchHistoryItem.innerHTML = `<p>${cityName}</p>`;
      searchHistoryItem.classList.add('search-history-item');
      searchHistoryItem.addEventListener('click', function () {
        getWeatherData(cityName);
      });
  
      searchHistoryDiv.appendChild(searchHistoryItem);
    }
    function clearSearchHistory() {
        // Clear the content of the searchHistoryDiv
        searchHistoryDiv.innerHTML = '';
    }
    clearSearchHistory.addEventListener('click', function () {
        clearSearchHistory(cityName);
      }
    );

  });