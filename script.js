const apiKey ="85a9b0ab3eeb1a15ef334e4068e39ed9";
// const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);

    if(response.status == 400){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "image/clouds.jpg";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "image/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "image/rain-img.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "image/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "image/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click",  () =>{
    const city = searchBox.value.trim();
    if(city === ""){
        alert("Please Enter a City Name");
        return;
    }
    checkWeather(city);
});
// checkWeather();
