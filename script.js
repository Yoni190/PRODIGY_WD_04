const apiKey = "28BL9SJW78FT75R6K4HXRCSXS";
let input = document.querySelector("input");

let search = document.querySelector(".searchButton");
let container = document.querySelector(".container");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let location_div = document.querySelector(".location");
let date_div = document.querySelector(".date");
let temp_div = document.querySelector(".temp");
let tempInfo = document.querySelector(".tempInfo");
let weatherInfo = document.querySelector(".weatherInfo");
let tempValue1 = document.querySelector(".one .value");
let tempValue2 = document.querySelector(".two .value");
let tempValue3 = document.querySelector(".three .value");
let tempName1 = document.querySelector(".humidity");
let tempName2 = document.querySelector(".sunrise");
let tempName3 = document.querySelector(".sunset");
let icon = document.querySelector(".icon");
let fDays = document.querySelector(".followingDays");
let day = document.querySelector(".day");
let fiveDaysTemp = [document.querySelector(".day1 .temp"), document.querySelector(".day2 .temp"), document.querySelector(".day3 .temp"), document.querySelector(".day4 .temp"), document.querySelector(".day5 .temp")];
let fiveDaysDate = [document.querySelector(".day1 .date"), document.querySelector(".day2 .date"), document.querySelector(".day3 .date"), document.querySelector(".day4 .date"), document.querySelector(".day5 .date")];
let fiveDaysIcon = [document.querySelector(".day1 .icon"), document.querySelector(".day2 .icon"), document.querySelector(".day3 .icon"), document.querySelector(".day4 .icon"), document.querySelector(".day5 .icon")];

let first = false;



function fetchAPI(apiURL, coor = 0){
    styleContainer();
    const weatherAPIUrl = apiURL;
    fetch(weatherAPIUrl, {
        "method": "GET",
        "headers": {

        }
    })
    .then(response => {
        if(!response.ok){
            throw response;
        }
        return response.json();
    }).then(response => {
        processData(response, coor);
    })
    .catch(err => {
        console.log(err);
    });
}



function getUserLocation(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

           const coordinateAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=us&key=${apiKey}`;
           fetchAPI(coordinateAPI, 1);

        })
    }
}




function processData(response, coor){
    console.log(response.timezone);
    let location = "";
    if(coor == 1){
        location = document.createTextNode(response.timezone);
    }
    else {
        location = document.createTextNode(response.resolvedAddress);
    }
    const days = response.days;
    const date = document.createTextNode(response.days[0].datetime);
    const temp = document.createTextNode(`${to_Celsius(response.currentConditions.temp)} C`);
    const description = document.createTextNode(response.description);
    const humidity = document.createTextNode(response.currentConditions.humidity);
    const sunrise = document.createTextNode(response.currentConditions.sunrise);
    const sunset = document.createTextNode(response.currentConditions.sunset);
    const conditionIcon = response.currentConditions.icon;
    const img = document.createElement("img");
    img.src = getImage(conditionIcon, img);
    
    img.style.height = "100px";
    img.style.width = "100px";

    location_div.appendChild(location);
    date_div.appendChild(date);
    temp_div.appendChild(temp);
    temp_div.innerHTML += "<br>";
    temp_div.appendChild(description);
    tempValue1.appendChild(humidity);
    tempValue2.appendChild(sunrise);
    tempValue3.appendChild(sunset);
    icon.appendChild(img);

    tempName1.appendChild(document.createTextNode("Humidity"));
    tempName2.appendChild(document.createTextNode("Sunrise"));
    tempName3.appendChild(document.createTextNode("Sunset"));

    for(let i = 0; i < days.length; i++){
        const nextImg = document.createElement("img");
        const nextConditionIcon = days[i].icon;
        nextImg.src = getImage(nextConditionIcon, nextImg);
        nextImg.style.height = "50px";
        nextImg.style.width = "50px";
        fiveDaysTemp[i].appendChild(document.createTextNode(to_Celsius(days[i].temp)));
        fiveDaysDate[i].appendChild(document.createTextNode(days[i].datetime));
        fiveDaysIcon[i].appendChild(nextImg);
    }

    first = true;
}

function getImage(conditionIcon, img) {
    switch(conditionIcon){
        case "snow":
            img.src = "img/snow.png";
            break;
        case "rain":
            img.src = "img/rain.png";
            break;
        case "fog":
            img.src = "img/fog.png";
            break;
        case "wind":
            img.src = "img/wind.png";
            break;
        case "cloudy":
            img.src = "img/cloudy.png";
            break;
        case "partly-cloudy-day":
            img.src = "img/partly-cloudy-day.png";
            break;
        case "partly-cloudy-night":
            img.src = "img/partly-cloudy-night.png";
            break;
        case "clear-day":
            img.src = "img/clear-day.png";
            break;
        case "clear-night":
            img.src = "img/clear-night.png";
            break;
        case "snow-showers-day":
            img.src = "img/snow-showers-day.png";
            break;
        case "snow-showers-night":
            img.src = "img/snow-showers-night.png";
            break;
        case "thunder":
            img.src = "img/thunder.png";
            break;
        case "thunder-rain":
            img.src = "img/thunder-rain.png";
            break;
        case "thunder-showers-day":
            img.src = "img/thunder-showers-day.png";
            break;
        case "thunder-showers-night":
            img.src = "img/thunder-showers-night.png";
            break;
        case "hail":
            img.src = "img/hail.png";
            break;
        case "wind":
            img.src = "img/wind.png";
            break;
    }
    return img.src;
}

function to_Celsius(fahrenheit) {
    return ((5/9) * (fahrenheit - 32)).toFixed(1);
}

function clearWeatherInfo(){
    location_div.textContent = "";
    date_div.textContent = "";
    temp_div.textContent = "";
    tempValue1.textContent = "";
    tempValue2.textContent = "";
    tempValue3.textContent = "";
    icon.textContent = "";
    tempName1.textContent = "";
    tempName2.textContent = "";
    tempName3.textContent = "";
    for(let i = 0; i < 5; i++){
        fiveDaysDate[i].textContent = "";
        fiveDaysIcon[i].textContent = "";
        fiveDaysTemp[i].textContent = "";
    }
}


search.addEventListener("click", () => {
    displayWeatherInfo();
});
input.addEventListener("keydown", (e) => {
    if (e.code == "Enter"){
        displayWeatherInfo();
    }
})

function styleContainer(){
    container.style.border = "1px solid black";
    container.style.backgroundColor = "lightblue";
    tempInfo.style.border = "2px solid black";
    weatherInfo.style.borderTop = "2px solid black";
    fDays.style.border = "2px solid black";
    tempInfo.style.borderRadius = "10px";
}

function displayWeatherInfo(){
    clearWeatherInfo();
    
    fetchAPI(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=us&key=${apiKey}&contentType=json`);
}
getUserLocation();
