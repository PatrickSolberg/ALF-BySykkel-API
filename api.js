const urlStations = 'https://gbfs.urbansharing.com/bergenbysykkel.no/station_information.json';
const urlStatus = 'https://gbfs.urbansharing.com/bergenbysykkel.no/station_status.json';

const clientIdentifier = {
    method: "GET",
    headers: {"Client-Identifier": "ALF/AS-UtviklingTest"}
  };


const getStations = async () => {

    try {
        const response = await fetch(urlStations, clientIdentifier)

        if(response.ok) {
            const jsonResponse = await response.json();
            const stations = jsonResponse.data.stations.map(item => item);
            return stations;
        }
    }
    catch(error){
        console.log(error)
    }
}

const getStatus = async () => {
    try {
        const response = await fetch(urlStatus, clientIdentifier)

        if(response.ok){
            const jsonResponse = await response.json();
            const stationStatus = jsonResponse.data.stations.map(item => item)
            return stationStatus;
        }
    }
    catch(error){
        console.log(error)
    }
}

export {  getStations, getStatus  };