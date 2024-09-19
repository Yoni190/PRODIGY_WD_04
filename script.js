const latitude = null;
const longitude = null;
const geocodeAPIUrl = new URL("http://api.openweathermap.org/geo/1.0/direct?q=London&appid=1da716ddc231d9c7ebb364093018a628");
//const weatherAPIUrl = "https://api.openweatherapp.org/data/2.5/weather?lat=&lon=&appid=1da716ddc231d9c7ebb364093018a628";
let input = document.querySelector("input");
let search = document.querySelector(".searchButton");



async function getData() {
    try {
        const response = await fetch(geocodeAPIUrl);
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error){
        console.error(error.message);
    }
    
}

async function getCoordinates() {
    const data = await getData();
    if (data) {
        latitude = data[0].lat;
        longitude = data[0].lon;
    }
}




search.addEventListener("click", () => {

});

