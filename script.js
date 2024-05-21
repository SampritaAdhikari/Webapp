const channelID = '2555630';
const readAPIKey = 'B1XRRDRXCFNW2DL3'; // Optional if your channel is public
const fieldTemperature = 3; // Change these values based on your ThingSpeak channel
const fieldHumidity = 4;
const fieldPM25 = 2;
const fieldAQI = 1;

async function fetchData() {
    const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?results=1&api_key=${readAPIKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const latestData = data.feeds[0];
        const temperature = latestData[`field${fieldTemperature}`];
        const humidity = latestData[`field${fieldHumidity}`];
        const pm25 = latestData[`field${fieldPM25}`];
        const aqi = latestData[`field${fieldAQI}`];

        document.getElementById('temperature').innerText = temperature + ' °C';
        document.getElementById('humidity').innerText = humidity + ' %';
        document.getElementById('pm25').innerText = pm25 + ' µg/m³';
        document.getElementById('aqi').innerText = aqi;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

setInterval(fetchData, 2000);
fetchData();
