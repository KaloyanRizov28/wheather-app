import "./styles.css"

const API_KEY = '489HZWK6PPTV3GP5VUUVBVR6Z';
const form = document.getElementById('weather-form');
const loadingDiv = document.getElementById('loading');
const weatherInfoDiv = document.getElementById('weather-info');

async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslikemax%2Cfeelslikemin%2Cfeelslike%2Chumidity%2Cprecipprob%2Csunrise%2Csunset%2Cmoonphase%2Cdescription%2Cicon&include=days&key=${API_KEY}&contentType=json`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch(error) {
    throw error;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function formatTime(timeString) {
  // Split the time string to get hours and minutes
  const [hours, minutes] = timeString.split(':');
  
  // Convert to 12-hour format
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // Convert 0 to 12
  
  // Add leading zero to minutes if needed
  const mins = minutes.padStart(2, '0');
  
  return `${hour}:${mins} ${ampm}`;
}

function createWeatherCard(dayData) {
  return `
    <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-6">
      <!-- Date and Time -->
      <div class="flex justify-between items-center border-b pb-4">
        <div>
          <p class="text-lg font-bold text-gray-700">Date</p>
          <p class="text-sm text-gray-500">${formatDate(dayData.datetime)}</p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-700">Day</p>
          <p class="text-sm text-gray-500">${new Date(dayData.datetime).toLocaleDateString('en-US', { weekday: 'long' })}</p>
        </div>
      </div>
      
      <!-- Temperature and Icon -->
      <div class="flex items-center space-x-4">
        <div class="text-center">
          <p class="text-5xl font-bold text-gray-800">${Math.round(dayData.temp)}°C</p>
          <p class="text-sm text-gray-500">${dayData.description}</p>
        </div>
        <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${dayData.icon}.svg" 
             alt="Weather Icon" 
             class="w-16 h-16 object-contain">
      </div>
      
      <!-- Max, Min, and Feels Like Temperatures -->
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <p class="text-lg font-bold text-gray-700">Max Temp</p>
          <p class="text-sm text-gray-500">${Math.round(dayData.tempmax)}°C</p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-700">Min Temp</p>
          <p class="text-sm text-gray-500">${Math.round(dayData.tempmin)}°C</p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-700">Feels Like Max</p>
          <p class="text-sm text-gray-500">${Math.round(dayData.feelslikemax)}°C</p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-700">Feels Like Min</p>
          <p class="text-sm text-gray-500">${Math.round(dayData.feelslikemin)}°C</p>
        </div>
      </div>
      
      <!-- Sunrise and Sunset -->
      <div class="grid grid-cols-2 gap-4 text-center border-t pt-4">
        <div>
          <p class="text-lg font-bold text-gray-700">Sunrise</p>
          <p class="text-sm text-gray-500">${formatTime(dayData.sunrise)}</p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-700">Sunset</p>
          <p class="text-sm text-gray-500">${formatTime(dayData.sunset)}</p>
        </div>
      </div>
    </div>
  `;
}

function displayWeatherInfo(weatherData) {
  const main = document.getElementById('main');
  main.innerHTML = `
    <h2 class="text-3xl font-bold text-center mb-8">Weather Forecast for ${weatherData.resolvedAddress}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      ${weatherData.days.map(day => createWeatherCard(day)).join('')}
    </div>
  `;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = document.getElementById('city-name').value;
  loadingDiv.style.display = 'block';
  weatherInfoDiv.innerHTML = '';

  try {
    const data = await getWeatherData(location);
    displayWeatherInfo(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfoDiv.innerHTML = '<p class="text-red-500 text-center">Error fetching weather data. Please make sure there are no typos in the city name.</p>';
  } finally {
    loadingDiv.style.display = 'none';
  }
});

// Wind animation code remains unchanged
const container = document.getElementById('wind-container');

function createLine() {
    const line = document.createElement('div');
    line.className = 'line';
    line.style.top = `${Math.random() * 100}vh`;
    line.style.left = '0';
    line.style.width = `${Math.random() * 50 + 30}px`;
    line.style.animationDuration = `${Math.random() * 2 + 3}s`;
    
    container.appendChild(line);
    
    setTimeout(() => {
        line.remove();
    }, 5000);
}

setInterval(createLine, 2000);