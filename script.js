const form = document.querySelector("form");
const input = document.querySelector("input");
const result = document.querySelector("#result");

const API_KEY = "1b87c8a5737f7a4caade0dc6d056b747";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (input.value === "") {
    alert("Please Enter A City Name");

    input.focus();
  }

  const CITYNAME = input.value;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITYNAME}&APPID=${API_KEY}`;
  const response = await fetch(URL);
  const result = await response.json();
  // console.log(result);
  displayData(result);
});
input.focus();

function displayData(obj) {
    
    result.innerHTML = "";
    input.value = "";
    if (obj.cod === 200) {
        
        const cityName = document.createElement("h1");
        cityName.className = "city";
        cityName.innerHTML = `${obj.name} , ${obj.sys.country}`;
        const temp = document.createElement("p");
        temp.innerText = `Temperature : ${obj.main.temp}  F`;
        const wind = document.createElement("p");
        wind.innerText = `Wind Speed : ${obj.wind.speed} km/h`;
        const description = document.createElement("p");
        description.innerText = `Description : ${obj.weather[0].description}`;
        const status=document.createElement("img")
        status.src=`https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`

        result.append(cityName, temp, wind, description,status);
    }else {
        alert(obj.message);
    }
}
