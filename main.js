import { getStations, getStatus } from './api.js';

// google maps
let map;

const initMap = (lat, lon) => {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lon },
        zoom: 17,
    });
}

// google maps coordinates
// default ALF coordinates
// lat = 60.37872786889175;
// lon = 5.3434458482425695;

let lat;
let lon;

// get User Geo loacation
const getUserGeoLoacation = () => {
    const success = position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        initMap(lat, lon)
    }
    const error = err => {
        lat = 60.37872786889175;
        lon = 5.3434458482425695;
        initMap(lat, lon)
    }
    navigator.geolocation.getCurrentPosition(success, error);
}


// Load Google map onload.
const initializeLocationMap = () => {
    getUserGeoLoacation()
}

// Generate Random Number for selecting Array index
const getRandomStation = () => {
    const stationNumber = Math.floor(Math.random() * 99)
    return stationNumber;
}

const getStationAvailability = async () => {
    const stationNumber = await getRandomStation();
    const stations = await getStations();
    const stationsStatus = await getStatus();
    // console.log(stations)

    const StationName = stations[stationNumber].name;
    const stationStatusTotal = stationsStatus[stationNumber].num_docks_available;
    const stationStatusCurrentavailable = stationsStatus[stationNumber].num_bikes_available;
    lat = stations[stationNumber].lat;
    lon = stations[stationNumber].lon;


    return [StationName, stationStatusTotal, stationStatusCurrentavailable];
}

const renderStationAvailability = async () => {
    const render = await getStationAvailability();
    const renderName = render[0];
    const renderStatusTotal = render[1];
    const renderStatusCurrentAvailable = render[2];
    const renderLocation = render[3];
    // console.log()

    initMap(lat, lon)
    document.getElementById("stations_selected").innerHTML = `Name: ${renderName}`;
    document.getElementById("stations_status").innerHTML = `Docks avalible: ${renderStatusTotal}`;
    document.getElementById("stationsCurrent").innerHTML = `Bikes Avalible: ${renderStatusCurrentAvailable}`;
}

document.getElementById('status').addEventListener('click', renderStationAvailability);
// document.getElementById('getMap').addEventListener('click', initMap);
initializeLocationMap();