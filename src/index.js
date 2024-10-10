const API_KEY = '489HZWK6PPTV3GP5VUUVBVR6Z';
const form = document.getElementById('weather-form');
const loadingDiv = document.getElementById('loading');
const weatherInfoDiv = document.getElementById('weather-info');

async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Sofia/today?unitGroup=metric&key=${API_KEY}&contentType=json`;
  const response = await fetch(url);
  return await response.json();
}

function processWeatherData(data) {
  return {
    location: data.address,
    temperature: data.currentConditions.temp,
    description: data.description,
  };
}

function displayWeatherInfo(weatherData) {
  weatherInfoDiv.innerHTML = `
        <h2>Weather in ${weatherData.location}</h2>
        <p>Temperature: ${weatherData.temperature}°C</p>
        <p>Description: ${weatherData.description}</p>
        <img src="${weatherData.icon}" alt="Weather icon">
    `;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = document.getElementById('location').value;

  loadingDiv.style.display = 'block';
  weatherInfoDiv.innerHTML = '';

  try {
    const data = await getWeatherData(location);
    const processedData = processWeatherData(data);
    displayWeatherInfo(processedData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfoDiv.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
  } finally {
    loadingDiv.style.display = 'none';
  }
});
