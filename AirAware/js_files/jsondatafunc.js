import { showsuggonmap, updateMapWithData ,updatetabledata } from './script.js';
import coordata from './data.js';
import dummycoordata from './dummydata.js';

var jsongovdataarray = [
];

function updateGovData(data) {

  data.forEach(element => {
    if (!(element.latitude && element.longitude)) {
      try {
        var lat = coordata.find(temp => temp.properties.station === element.station);

        element.latitude = lat.geometry.coordinates[0];
        // var lon=coordata.find(temp => temp.properties.station === element.station);
        element.longitude = lat.geometry.coordinates[1];
      } catch (error) {
        console.log(error);
        console.log(element)
        console.log(coordata.find(temp => temp.properties.station === element.station));
      }
    }
    jsongovdataarray.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [element.latitude, element.longitude]
      },
      "properties": {
        "id": element.id,
        "station": element.station,
        "city": element.city,
        "state": element.state,
        "last_update":element.last_update,
        "aqi": element.aqi,
        "So2": element.pollutants.SO2?.pollutant_avg ?? NaN,
        "Nh3": element.pollutants.NH3?.pollutant_avg ?? NaN,
        "Ozone": element.pollutants.OZONE?.pollutant_max ?? NaN,
        "No2": element.pollutants.NO2?.pollutant_avg ?? NaN,
        "Co": element.pollutants.CO?.pollutant_max ?? NaN,
        "Pm25": element.pollutants["PM2.5"]?.pollutant_avg ?? NaN,
        "Pm10": element.pollutants.PM10?.pollutant_avg ?? NaN,
        "max": element.max,
        "maxele": element.maxele,
        "pollutants":element.pollutants,
      }
    });

  });
  jsongovdataarray=dummycoordata;
  updatetabledata(jsongovdataarray);
  updateMapWithData();
  showsuggonmap(jsongovdataarray,"mumbai");

  //currently there is some error in api , so we are using static saved data (2/11/2024)

  // updatetabledata(coordata);
  // updateMapWithData();
  // showsuggonmap(coordata,"mumbai");
}

export { jsongovdataarray, updateGovData };

//NH3    Green:
//CO     Blue:
//SO2    Yellow:
//Ozone  Orange:
//NO2    Red:
//PM10   Purple:
//PM2.5  Black:
// NH3
// CO
// SO2
// Ozone
// NO2
// PM10
// PM2.5