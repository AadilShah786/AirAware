import { updateGovData, jsongovdataarray } from './jsondatafunc.js';
import apidata from './apidata.js';
import { fetchGovDataForCity } from './display.js';
import coordata from './data.js';
import med_data from './med_data.js';
import animation from './animation.js';


apidata()
  .then(function (response) {
    return response;
  })
  .then(function (data) {
    console.log("data received", data);
    // imp
    updateGovData(data);
  })

async () => {
  try {
    const response = await fetch('YOUR_FIREBASE_FUNCTION_ENDPOINT');
    const data = await response.json();
    console.log(data.message); // This will log the response from the function
  } catch (error) {
    console.error("Error:", error);
  }
}

var search = document.getElementById("search-button");

var cityin = document.getElementById("cityInput");

search.addEventListener("click", () => {
  event.preventDefault();
  // searchit();
  var inputValue = cityin.value;
  if (inputValue.length > 0) {
    var capitalizedText = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    cityin.value = capitalizedText;
  }
  // console.log(cityin.value);
  fetchGovDataForCity(cityin.value);

  cityin.value = '';
  console.log("search button clicked " + cityin.value);

});


// var i =1;
// var customIcon = L.divIcon({
//   className: 'custom-icon',
//   html: `<div class="marker-label">98</div>`,
//   iconSize: [40, 40], // Adjust the size as needed
// });
// var marker = L.marker(jsondataarray.coordinates, { icon: customIcon }).addTo(map);


// Call the fetchDataForAllCities function every minute (60,000 milliseconds)
// setInterval(fetchDataForAllCities, 60000);

//////////////////////////////////////////////mapping part //////////////////////////////////////////

// Initialize the map

const southWest = L.latLng(6.7, 68.2); // Southwest corner
const northEast = L.latLng(37.3, 97.4);  // Northeast corner
const bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
  center: [23.7, 82.8], // Centered on India
  zoom: 5, // Adjust the initial zoom level
  maxBounds: bounds, // Restrict the map to India's bounds
  maxBoundsViscosity: 1.0, // Controls how strong the bounds are enforced (1.0 means full bounds restriction)
});

map.setMaxZoom(12); // Set the maximum zoom level
map.setMinZoom(4.2);

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

//const rectangle = L.rectangle(bounds, { color: 'red', weight: 0, fillOpacity: 0.1, blur:0.5 }).addTo(map);
//legend.addTo(map);

var geojsonLayer = L.geoJSON().addTo(map);


var note = L.control({ position: 'bottomright' });

note.onAdd = function () {
  var noteDiv = L.DomUtil.create('div', 'info note');
  noteDiv.innerHTML = '<p>Displayed on the map is the predominant pollutant present within the specific city, indicated by the color of pollutant.</p>';
  return noteDiv;
};

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<h6>Most dominant pollutant</h6>' +
    '<div class="legend-item"><div class="legend-color" style="background: black"></div> pm2.5 </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: purple"></div> pm10 </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: red"></div> no2 </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: orange"></div> ozone </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: yellow"></div> so2 </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: blue"></div> co </div>' +
    '<div class="legend-item"><div class="legend-color" style="background: lightgreen"></div> nh3 </div>';

  return div;
};
// console.log("lol")
note.addTo(map);

legend.addTo(map);

// You can change the position by updating the CSS of the legend and note divs
document.querySelector('.legend').style.marginRight = '10px'; // Adjust the margins as needed
document.querySelector('.note').style.marginTop = '10px'; // Adjust the margins as needed
// Get the "sugg note2" element

// Custom Marker at Delhi's coordinates

// Adding a popup to the marker

// var marker = L.marker(coordinates).addTo(map);
//   //   marker.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
//   //
//   layer.bindPopup(`City: ${name}<br>CO: ${co}`).openPopup();
// if (!jsongovdataarray || !jsongovdataarray.length) {
//   jsongovdataarray = coordata;
// }
var noteDiv = L.DomUtil.create('div','outer-sugg');
function showsuggonmap(suggdata,city){
  var note2 = L.control({ position: 'bottomleft' });
 city=city.toLowerCase();
 
note2.onAdd = function () {
  try{
  noteDiv.innerHTML = '';
  }catch(e){}

  // noteDiv.innerHTML = '<p>suggestions will be shown</p>';
 
//  var parentDiv=noteDiv
    // Remove the paragraph element from the DOM
    // parentDiv.removeChild(paragraph);

    // Create an array of content segments for the cards (modify as needed)
    const cardContentList = suggdata.filter(item=>item.properties.city.toLowerCase().includes(city));
    const cokeys2=Object.keys(suggdata);

    const cardDiv2 = document.createElement('div');
    cardDiv2.classList.add('suggcard2'); // Add a "card" class for styling

    // Add the text content to the new div
    cardDiv2.textContent = `${cardContentList[0].properties.city}`;
    try{
    noteDiv.appendChild(cardDiv2);}
    catch(e){}
    // const parentDiv = document.createElement('div' );
    // parentDiv.classList.add('sugg note2'); // Add a "card" class for styling
    var parentDiv = L.DomUtil.create('div',"sugg note2");
try{
    noteDiv.appendChild(parentDiv);}catch(e){}
    // const  = content.split(/\s+/); // Split by whitespace
console.log(cardContentList)
    // Loop through the content segments
    cardContentList.forEach((segment) => {
      // Create a new div element for each segment
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('suggcard'); // Add a "card" class for styling

      const station = segment.properties.station.split(',')[0].trim();
  const aqi = segment.properties.aqi;
function handleCardClick(station){
  fetchGovDataForCity(station);
}
  // Set the text content with two different headings
  cardDiv.innerHTML = `<p class="suggstation">${station}</p><p class="suggval">AQI: ${aqi}</p>`;
  cardDiv.addEventListener('click', () => {
    // Call a function passing the station value
    handleCardClick(station);
});
 // Custom variable for alpha value
const alphaValue = 0.7;

// Set background color based on AQI value
if (aqi >= 0 && aqi <= 50) {
    cardDiv.style.backgroundColor = 'rgba(0, 128, 0, ' + alphaValue + ')'; // Set your desired color for this range
} else if (aqi > 50 && aqi <= 100) {
    cardDiv.style.backgroundColor = 'rgba(144, 238, 144, ' + alphaValue + ')'; // Set your desired color for this range
} else if (aqi > 100 && aqi <= 200) {
    cardDiv.style.backgroundColor = 'rgba(255, 255, 0, ' + alphaValue + ')'; // Set your desired color for this range
} else if (aqi > 200 && aqi <= 300) {
    cardDiv.style.backgroundColor = 'rgba(255, 165, 0, ' + alphaValue + ')'; // Set your desired color for this range
} else if (aqi > 300 && aqi <= 400) {
    cardDiv.style.backgroundColor = 'rgba(255, 0, 0, ' + alphaValue + ')'; // Set your desired color for this range
} else if (aqi > 400) {
    cardDiv.style.backgroundColor = 'rgba(165, 42, 42, ' + alphaValue + ')'; // Set your desired color for this range
} else {
    cardDiv.style.backgroundColor = 'rgba(128, 128, 128, ' + alphaValue + ')'; // Set your desired color for values above 150
}

      // Optionally, add styling for the card divs here

      // Append the new div to the parent div
      parentDiv.appendChild(cardDiv);})
  return noteDiv;
};
try{
note2.addTo(map);}catch(e){}
 
}
function updateMapWithData() {
  jsongovdataarray.map(feature => {

    function customIcon(col, val) {
      var color;
      if (col == "nh3") {
        color = "green.png";
      }
      else if (col == "co") {
        color = "blue.png";
      }
      else if (col == "so2") {
        color = "yellow.png";
      }
      else if (col == "o3") {
        color = "orange.png";
      }
      else if (col == "no2") {
        color = "Red.png";
      }
      else if (col == "pm10") {
        color = "purple.png";
      }
      else if (col == "pm25") {
        color = "black.png";
      }
      else { color = "grey.png" }
      return customIcon = L.icon({
        iconUrl: `./ImagesOfSite/${color}`,
        //   html: `<div style=" height:20px;width:20px; position:absolute;">
        //   <img src="./ImagesOfSite/${color}"  style="width:16px; height:16px; padding: 0;border: none;">
        //   <div style="">${val}</div>
        // </div>
        // `,
        iconSize: [10, 10], // size of the icon
        iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });
    }
    function showPollutantInfo(pollutant) {
      // You can customize this function to display information about the selected pollutant
      console.log("Help mf")
      const pollutantInfo = document.getElementById('pollutant-info');
      pollutantInfo.innerHTML = `Information for ${pollutant}`;
    }
    
    // Add event listeners to each button
    document.addEventListener('DOMContentLoaded', function() {
      const buttons = document.querySelectorAll('.button');
      buttons.forEach(button => {
          button.addEventListener('mouseover', function() {
              const pollutant = this.getAttribute('data-pollutant');
              showPollutantInfo(pollutant);
          });
      });
    });
    function createRectangleMarker(latLng, value,col) {
      // Create a div element for the marker content
      var color;
      if (col === "nh3") {
        color = 'rgba(0, 128, 0, 0.5)'; // Green
      } else if (col === "co") {
        color = 'rgba(0, 0, 255, 0.5)'; // Blue
      } else if (col === "so2") {
        color = 'rgba(255, 255, 0, 0.7)'; // Yellow
      } else if (col === "o3") {
        color = 'rgba(255, 165, 0, 0.5)'; // Orange
      } else if (col === "no2") {
        color = 'rgba(255, 0, 0, 0.5)'; // Red
      } else if (col === "pm10") {
        color = 'rgba(128, 0, 128, 0.5)'; // Purple
      } else if (col === "pm25") {
        color = 'rgba(0, 0, 0, 0.5)'; // Black
      } else {
        color = 'rgba(128, 128, 128, 0.5)'; // Grey
      }
      

      const markerContent = document.createElement('div');
      markerContent.className = 'custom-marker no-default-border'; // Add the class

      // Set the font and text content dynamically (adjust as needed)
      markerContent.style.fontSize = '12px';
      markerContent.style.fontWeight = 'bold';
      markerContent.style.color="black";
      markerContent.style.width = '20px'; // Adjust as needed
      markerContent.style.height = '20px'; // Adjust as needed
      markerContent.style.borderRadius = '50%';      markerContent.style.backgroundColor = color; // Example red with 80% opacity
    
      // Set border styles (adjust as needed)
      // markerContent.style.border = '0.1px solid #fff'; // White border with 2px width
      // markerContent.style.borderStyle = 'none'; 
      markerContent.textContent = value.toString();
      // Create a Leaflet DivIcon using the marker content
      const customIcon = L.divIcon({
        html: markerContent,
        iconSize: [20, 20], // Adjust size as needed
        iconAnchor: [10, 10]   // Adjust anchor point as needed
      });

      // Create the marker and add it to the map
      const marker = L.marker(latLng, { icon: customIcon });
      marker.addTo(map);

      // Optionally, add a tooltip or popup for additional information
      marker.bindTooltip(`Max: ${value}`); // Example tooltip content

      return marker;
    }
    try {
      // var marker = L.marker([feature.geometry.coordinates[0], // Latitude
      // feature.geometry.coordinates[1],], { icon: customIcon(feature.properties.maxele, feature.properties.max) });
      // marker.addTo(map);
      // const latLng = [19.07,72.877];
      // const value = 123;
      const marker = createRectangleMarker([feature.geometry.coordinates[0], // Latitude
      feature.geometry.coordinates[1],], feature.properties.aqi,feature.properties.maxele);
      marker.addTo(map);

      // let aqi =feature.properties.aqi;
      //  if (aqi==-1){
      //   aqi="Insufficient data";
      //  } else{
      //   aqi =aqi + " ug/m3";
      //  }
      marker.on('click', function () {
        fetchGovDataForCity(feature.properties.station);
      });
      // marker.bindPopup(`<b>${feature.properties.station}</b>
      //                 <br><b>City: ${feature.properties.city}</b>
      //                 <br>Aqi: ${aqi}
      //                 <br>PM 2.5: ${feature.properties.Pm25} ug/m3
      //                 <br>PM 10: ${feature.properties.Pm10} ug/m3
      //                 <br>NO2: ${feature.properties.No2} ug/m3
      //                 <br>O3: ${feature.properties.Ozone} ug/m3
      //                 <br>SO2: ${feature.properties.So2} ug/m3
      //                 <br>CO: ${feature.properties.Co} mg/m3
      //                 <br>NH3: ${feature.properties.Nh3} ug/m3
      //                 `);
    } catch (error) {
      console.log(error);
    }
    // Adding a popup to the marker
  });

}

updateMapWithData();



var respiratoryInputValue = document.getElementById("respiratoryInput");

respiratoryInputValue.addEventListener("change", function (event) {
  // showSuggestions(respiratoryInputValue.value);
});
function showPopup(location, disease, safetyStatus) {
  // Create the popup element
  var popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `<div class="close-btnpopup" onclick="hidePollutantInfo()"><span>&times;</span></div><strong>Location:</strong> ${location}<br><br><strong>Respiratory Disease:</strong> ${disease}<br><br><strong>Safety Status:</strong> ${safetyStatus}<br><a href="#" class="know-more">Know More</a>`;

  // Apply color based on safety status
  if (safetyStatus === 'Safe') {
    popup.classList.add('green');
  } else {
    popup.classList.add('red');
  }

  // Append the popup to the popupContainer div
  document.getElementById('popupContainer').appendChild(popup);

  // You may add an event listener to close the popup when clicked
  popup.addEventListener('click', function () {
    popup.parentNode.removeChild(popup);
  });
  var knowMoreLink = popup.querySelector('.know-more');
  knowMoreLink.addEventListener('click', function (event) {
    event.preventDefault();
    fetchGovDataForCity(locationInput.value);
  });
}


document.getElementById("userInputForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  var respiratoryInputValue = document.getElementById("respiratoryInput");
  var disease = respiratoryInputValue.value;

  var aqiValue = "none";
  var city = locationInput.value;
  var firstmatch = jsongovdataarray.find(
    (element) => element.properties.station === city
  );
  if (!firstmatch) {
    firstmatch = jsongovdataarray.find(
      (element) => element.properties.city.toLowerCase() === city.toLowerCase()
    );
  }

  if (firstmatch) {
    document.getElementById("locationInput").value = firstmatch.properties.station;
    aqiValue = firstmatch.properties.aqi; // Obtained AQI value for the city
  }

  console.log("aqi: " + aqiValue);
  console.log("Respiratory Diseases: " + respiratoryInputValue.value);
  var disease = respiratoryInputValue.value;
  let safetyStatus = "Unknown";

  const medkey = Object.keys(med_data);

  medkey.forEach(item => {
    if (med_data[item].disease === disease) {
      if (aqiValue >= med_data[item].aqi) {
        safetyStatus = "Not Safe";
        console.log("Not Safe");
      } else {
        safetyStatus = "Safe";
        console.log("Safe")
      }
      console.log(med_data[item]);
    } else {
      // console.log(item)
    }
  });

  // Call showPopup outside the forEach loop
  showPopup(city, disease, safetyStatus);
});


document.addEventListener('DOMContentLoaded', (event) => {
  let locationInput = document.getElementById('locationInput');
  let cityInput = document.getElementById('cityInput');
  // console.log("sum is ", sum, money.length)
  cityInput.oninput = function () {
    // Your code here
    showSuggestions(cityInput.value, "city", "2")
    // console.log(locationInput.value);
  }
  locationInput.oninput = function () {
    // Your code here
    showSuggestions(locationInput.value, "location", "1")
    // console.log(locationInput.value);
  }
});
// const diseases = ["Asthma", "COPD", "Bronchitis", "Emphysema", "Lung Cancer", "Influenza", "Pleural Effusion", "Bronchiectasis"];
// console.log(coordata);
function showSuggestions(input, parent, offset) {
  console.log("city val:  " + input)

  const suggestionsContainer = document.getElementById(`suggestions${offset}`);
  suggestionsContainer.innerHTML = ""; // Clear previous suggestions
  if (jsongovdataarray) {
    console.log("exists")
    var usingdata = jsongovdataarray
  } else {
    var usingdata = coordata
  }
  const cokeys = Object.keys(usingdata);

  var filteredDiseases = cokeys.filter(key =>
    usingdata[key].properties.station.toLowerCase().includes(input.toLowerCase())
    // disease.toLowerCase().includes(input.toLowerCase())
  );
  console.log(filteredDiseases)

  if (filteredDiseases.length > 0) {
    filteredDiseases.forEach(item => {
      var disease = usingdata[item].properties.station
      const suggestionElement = document.createElement("div");
      suggestionElement.classList.add("suggestion");
      suggestionElement.textContent = disease;
      suggestionElement.addEventListener("click", function () {
        document.getElementById(`${parent}Input`).value = disease;
        suggestionsContainer.style.display = "none";
      });
      suggestionsContainer.appendChild(suggestionElement);
    });

    suggestionsContainer.style.display = "block";
  } else {
    suggestionsContainer.style.display = "none";
  }
}

// Close suggestions when clicking outside the input and suggestions container
document.addEventListener("click", function (event) {
  if (!event.target.matches("#respiratoryInput") && !event.target.matches(".suggestion")) {
    document.getElementById("suggestions2").style.display = "none";

    document.getElementById("suggestions1").style.display = "none";
  }
});


// script.js
function updatetabledata(datafortable) {
  // document.addEventListener("DOMContentLoaded", function () {
  //   // Function to update the table body with new data
  //   function updateTableBody() {
  // Get the table body element
  var tableBody_poll = document.querySelector("#mostHarmful tbody");
  var tableBody_safe = document.querySelector("#safestPlaces tbody");

  // Clear existing rows
  tableBody_poll.innerHTML = "";
  tableBody_safe.innerHTML = "";


  var sortt = datafortable.sort(function (a, b) {
    // Assuming the data type of the column is numeric
    // For descending order, switch the positions of a and b in the comparison
    return b.properties.aqi - a.properties.aqi;
  });
  // console.log(coordata)
  // console.log(jsongovdataarray)
  // console.log(sortt)
  var top10 = sortt.slice(0, 10);

  // Get the last 10 elements
  // var last10 = sortt.slice(-10).reverse();

  var indexOfElement = sortt.findIndex(item => item.properties.aqi === -1); // Replace the criteria as needed

  if (indexOfElement !== -1) {
    // Get the 10 elements before the particular element
    var last10 = sortt.slice(Math.max(0, indexOfElement - 10), indexOfElement).reverse();

    // Output the result
    // console.log("10 elements before the particular element:", elementsBefore,indexOfElement);
  } else {
    // console.log("Element not found in the array.");
  }

  function showStationDetails(city) {
    // console.log("damn dude")
    fetchGovDataForCity(city);
  }

  top10.forEach(item => {
    item.id = top10.findIndex(item2 => item2 === item) + 1
  })
  // console.log(top10, last10);
  // Loop through the new data and create new rows
  top10.forEach(function (cityData) {
    var newRow = document.createElement("tr");
    newRow.classList.add("trowharm"); // Add your desired class name here

    newRow.innerHTML = `
        <td class="rank">${cityData.id}</td>
        <td>${cityData.properties.station}</td>
        <td>${cityData.properties.state}</td>
        <td class="aqival">${cityData.properties.aqi}</td>
      `;
    newRow.addEventListener("click", () => {
      showStationDetails(cityData.properties.station); // Call your function here
    });
    tableBody_poll.appendChild(newRow);
  });

  last10.forEach(item => {
    item.id = last10.findIndex(item2 => item2 === item) + 1
  })
  console.log(top10, last10);
  // Loop through the new data and create new rows
  last10.forEach(function (cityData) {
    var newRow = document.createElement("tr");
    newRow.classList.add("trowsafe"); // Add your desired class name here

    newRow.innerHTML = `
        <td class="rank">${cityData.id}</td>
        <td>${cityData.properties.station}</td>
        <td>${cityData.properties.state}</td>
        <td class="aqival">${cityData.properties.aqi}</td>
      `;
    newRow.addEventListener("click", () => {
      showStationDetails(cityData.properties.station); // Call your function here
    });
    tableBody_safe.appendChild(newRow);
  });
  animation();
}

function showPollutantInfo() {
  document.getElementById("pollution-container").style.display = "block";
}

// Function to hide the pollutant info container
function hidePollutantInfo() {
  document.getElementById("pollution-container").style.display = "none";
}




export { updateMapWithData, updatetabledata ,showsuggonmap};




//animation stuff
// import { gsap } from "gsap/dist/gsap";
    
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


// gsap.registerPlugin(ScrollTrigger);

// gsap.to(".respiratory-form", {
//   ScrollTrigger: ".respiratory-form", // start the animation when ".box" enters the viewport (once)
//   x: 500,
// });