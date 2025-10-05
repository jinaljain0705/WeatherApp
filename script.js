const apiKey = "85a9b0ab3eeb1a15ef334e4068e39ed9";
// const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);

  if (response.status == 404) {
    document.getElementById("error-message").style.display = "block";
    document.getElementById("weather-info").style.display = "none";
  } else {
    const data = await response.json();

    document.getElementById("city-name").innerHTML = data.name;
    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

    // Weather image
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "image/clouds.jpg";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "image/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "image/rain-img.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "image/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "image/mist.png";
    }

    document.getElementById("weather-info").style.display = "block";
    document.getElementById("error-message").style.display = "none";
  }
}

function handleSearch() {
  const city = searchBox.value.trim();
  if (city === "") {
    alert("Please Enter a City Name");
    return;
  }
  checkWeather(city);
}

// Button click
searchBtn.addEventListener("click", handleSearch);

// Press Enter key
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
// checkWeather();
