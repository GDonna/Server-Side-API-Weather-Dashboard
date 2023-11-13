document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const cityInput = document.getElementById('cityInput');
    const searchHistoryDiv = document.getElementById('searchHistory');


    // Add event listener for clicking on the search button
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
      getWeatherData(cityName);
      cityInput.value = '';
    }
  });
    // Add event listener for clicking on a city in the search history
    searchHistoryDiv.addEventListener('click', function(event) {
        const cityName = event.target.dataset.city;
        if (cityName !== undefined) {
          getWeatherData(cityName);
        }
      });
    });
    