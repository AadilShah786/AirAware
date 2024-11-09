export default function apidata (){
      // Sample key
 // const api="579b464db66ec23bdd0000011c4b6fb8f22e4da36019aceed9576683"; //2nd api    
  const api = "579b464db66ec23bdd00000139aeb6041bfa4c7263cda886ed404225";
  const criteria = { 'city': ["Greater Noida","Delhi"], 'pollutant_id': ["PM10", "PM2.5"] };
  //let data1,data2,data3,data4;
    var offset=0;
     var limit=1000;
  
  const promises = [];

  for (let i = 0; i < 4; i++) {
    promises.push(
      getData(api, criteria, offset + i * 1000, limit)
        .then(data => {
         console.log(data);
          return data;
        })
        .catch(error => {
          console.error("Error:", error);
          return []; // Return an empty array in case of an error to avoid breaking Promise.all
        })
    );
  }

  function combineAndSortData() {
    return Promise.all(promises)
      .then(arrayOfData => {
      //  console.log(arrayOfData);
        let combined = combineUniqueById(...arrayOfData.flat());
       // console.log("combined data" ,combined);
       
       // console.log("combined");
        return combined; // Returning the combined and sorted data
      })
      .catch(error => {
        console.error("Error:", error);
        return []; // Return an empty array in case of an error
      });
  }

  return combineAndSortData(); 
}


function getData(api, filters, offset, limit) {
    const baseUrl = "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69";
    const apiKey = api;
    const criteriaAll = Object.keys(filters).map(key => `${key}=${filters[key].map(value => encodeURIComponent(value)).join(",")}`);
    const url1 = `${baseUrl}?api-key=${apiKey}&format=json&offset=${offset}&limit=${limit}`;//${criteriaAll.join("&")
   // console.log(`${criteriaAll.join("&")}`);
    return fetch(url1)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const pollutionData = data.records;
            return pollutionData;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            return [];
        });
  }
  

 


function combineUniqueById(...arrays) {
   
   // console.log(arrays);
    
// To store unique and repeated IDs
const uniqueIds = new Set();
const repeatedIds = new Set();
const allIds = {}; // Optional: Use an object to count occurrences of each ID

// Iterate through the array
arrays.forEach(item => {
  const id = item.id;

  // Check if the ID has been encountered before
  if (uniqueIds.has(id)) {
    repeatedIds.add(id); // Add to repeated IDs set
  } else {
    uniqueIds.add(id); // Add to unique IDs set
  }

  // Optionally, count occurrences of each ID
  allIds[id] = allIds[id] ? allIds[id] + 1 : 1;
});

//console.log("Unique IDs:", Array.from(uniqueIds));
console.log("Repeated IDs:", Array.from(repeatedIds));
//console.log("Occurrences of all IDs:", allIds);

  
// Organizing the data by station and including constant fields
const stationData = {};

arrays.forEach(item => {
  const station = item.station;

  // Check if station exists in the 'stationData' object
  if (!stationData[station]) {
    // Create an entry for the station including constant fields
    stationData[station] = {
      country: item.country,
      state: item.state,
      city: item.city,
      station:item.station,
      latitude:parseFloat(item.latitude),
      longitude:parseFloat(item.longitude),
      last_update: item.last_update,
      aqi:0,
      max:0,
      maxele:"none",
      // Add other constant fields...
      pollutants: {} // Initialize pollutants object to store pollutant data
    };
  }

  // Store pollutant data under the station
  const pollutantId = item.pollutant_id;
  
  stationData[station].pollutants[pollutantId] = {
    pollutant_avg: parseFloat(item.pollutant_avg),
    pollutant_max: parseFloat(item.pollutant_max),
    pollutant_min: parseFloat(item.pollutant_min),
   
    // Add other properties as needed
  };
  //console.log(station);
  stationData[station].aqi=calmax(stationData[station].pollutants);
  stationData[station].max=calmax(stationData[station].pollutants);
  stationData[station].maxele=maxele(stationData[station].pollutants ,stationData[station].max);
});
// Sort stations alphabetically based on state, city, and station
const sortedStations = Object.values(stationData).sort((a, b) => {
    if (a.state && b.state && a.state !== b.state) {
      return a.state.localeCompare(b.state);
    } else if (a.city && b.city && a.city !== b.city) {
      return a.city.localeCompare(b.city);
    } else if (a.station && b.station) {
      return a.station.localeCompare(b.station);
    }
    return 0; // Return 0 if properties are undefined or equal
  });

// Assign IDs to the sorted stations
const stationsWithIds = sortedStations.map((station, index) => {
  return {
    id: index + 1, // Assigning IDs starting from 1
    ...station
  };
});

//console.log("station with id: ",stationsWithIds);

const uniquecitys = new Set();
const repeatedcitys = new Set();
const allcitys = {}; // Optional: Use an object to count occurrences of each ID

// Iterate through the array
stationsWithIds.forEach(item => {
  const city = item.city;

  // Check if the ID has been encountered before
  if (uniquecitys.has(city)) {
    repeatedcitys.add(city); // Add to repeated IDs set
  } else {
    uniquecitys.add(city); // Add to unique IDs set
  }

  // Optionally, count occurrences of each ID
  allcitys[city] = allcitys[city] ? allcitys[city] + 1 : 1;
});

//console.log("Unique cities:", Array.from(uniquecitys));
//console.log("Repeated cities:", Array.from(repeatedcitys));
//console.log("Occurrences of all cities:", allcitys);

    return stationsWithIds;
    //return Object.values(combinedData);
  }
 
function calmax(pollutants){
  const AQICO = pollutants.CO?.pollutant_max/1000 || 0;
  const AQINH3 = pollutants.NH3?.pollutant_avg || 0;
  const AQINO2 = pollutants.NO2?.pollutant_avg || 0;
  const AQIO3 = pollutants.OZONE?.pollutant_max || 0;
  const AQIPM10 = pollutants.PM10?.pollutant_avg || 0;
  const AQIPM25 = pollutants["PM2.5"]?.pollutant_avg || 0;
  const AQISO2 = pollutants.SO2?.pollutant_avg || 0;
  if(!(AQIPM10||AQIPM25)){
    return -1;
  }
  return Math.max(AQICO, AQINH3, AQINO2, AQIO3, AQIPM10, AQIPM25, AQISO2);
}

function maxele(pollutants, max){
  const AQICO = pollutants.CO?.pollutant_max/1000 || 0;
  const AQINH3 = pollutants.NH3?.pollutant_avg || 0;
  const AQINO2 = pollutants.NO2?.pollutant_avg || 0;
  const AQIO3 = pollutants.OZONE?.pollutant_max || 0;
  const AQIPM10 = pollutants.PM10?.pollutant_avg || 0;
  const AQIPM25 = pollutants["PM2.5"]?.pollutant_avg || 0;
  const AQISO2 = pollutants.SO2?.pollutant_avg || 0;

 
    if (max == AQICO ){
      return "co";
    }if (max == AQINH3 ){
      return "nh3";
    }if (max == AQINO2 ){
      return "no2";
    }if (max == AQIO3 ){
      return "o3";
    }if (max == AQIPM10 ){
      return "pm10";
    }if (max == AQIPM25 ){
      return "pm25";
    }if (max == AQISO2 ){
      return "so2";
    }

}