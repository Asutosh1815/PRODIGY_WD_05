const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');

document.getElementById('search-btn').addEventListener('click', () => {
  const location = document.getElementById('location-input').value;
  if (location) {
    fetchWeatherByCity(location);
  }
});

document.getElementById('current-location-btn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      error => alert('Unable to fetch location')
    );
  } else {
    alert('Geolocation is not supported by your browser');
  }
});

function fetchWeatherByCity(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => updateWeatherDisplay(data))
    .catch(error => alert(error.message));
}

function fetchWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => updateWeatherDisplay(data))
    .catch(error => alert('Unable to fetch weather data'));
}

function updateWeatherDisplay(data) {
  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  condition.textContent = `Condition: ${data.weather[0].description}`;
  wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  weatherDisplay.classList.remove('hidden');
}
