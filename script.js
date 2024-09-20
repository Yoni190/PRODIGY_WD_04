const apiKey = "28BL9SJW78FT75R6K4HXRCSXS";
//const weatherAPIUrl = new URL(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&key=${apiKey}&contentType=json`);
let input = document.querySelector("input");

let search = document.querySelector(".searchButton");
let container = document.querySelector(".container");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let location_div = document.querySelector(".location");
let date_div = document.querySelector(".date");
let temp_div = document.querySelector(".temp");
let tempValue1 = document.querySelector(".one .value");
let tempValue2 = document.querySelector(".two .value");
let tempValue3 = document.querySelector(".three .value");
let tempName1 = document.querySelector(".humidity");
let tempName2 = document.querySelector(".sunrise");
let tempName3 = document.querySelector(".sunset");
let icon = document.querySelector(".icon");


function fetchAPI(cityName){
    const weatherAPIUrl = new URL(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(cityName)}?unitGroup=us&key=${apiKey}&contentType=json`);
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
        dat(response);
    })
    .catch(err => {
        console.log(err);
    });
}

function processData(response){
    console.log(response);
    let location = response.resolvedAddress;
    let days = response.days;
    console.log(response.currentConditions.conditions)
    console.log(`Location: ${location}`);

    for(let i = 0; i < days.length; i++){
        console.log(days[i].datetime+": tempmax="+days[i].tempmax+", tempmin="+days[i].tempmin);
    }
    const loc = document.createTextNode(location);
    const conditions = document.createTextNode(response.currentConditions.conditions);
    const description = document.createTextNode(response.description);
    const temp = document.createTextNode(response.currentConditions.temp);
    const date = document.createTextNode(response.days[0].datetime);
    left.appendChild(loc);
    left.innerHTML += "<br>";
    left.appendChild(conditions);
    left.innerHTML += "<br>";
    left.appendChild(description);
    left.innerHTML += "<br>";
    left.appendChild(temp);
    left.innerHTML += "<br>";
    left.appendChild(date);

    for(let i = 0; i < days.length; i++) {
        let temp = document.createTextNode(`${days[i].datetime}: tempmax = ${days[i].tempmax}, tempmin = ${days[i].tempmin}`);
        right.appendChild(temp);
        right.innerHTML += "<br>";
    }
}

function dat(response){
    console.log(response);
    const location = document.createTextNode(response.resolvedAddress);
    const date = document.createTextNode(response.days[0].datetime);
    const temp = document.createTextNode(`${to_Celsius(response.currentConditions.temp)} C`);
    const description = document.createTextNode(response.description);
    const humidity = document.createTextNode(response.currentConditions.humidity);
    const sunrise = document.createTextNode(response.currentConditions.sunrise);
    const sunset = document.createTextNode(response.currentConditions.sunset);
    const img = document.createElement("img");
    img.src = "clear.webp";
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

}

function to_Celsius(fahrenheit) {
    return ((5/9) * (fahrenheit - 32)).toFixed(1);
}


search.addEventListener("click", () => {
    container.style.backgroundColor = "lightblue";
    fetchAPI(input.value);

});

