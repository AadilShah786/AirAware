// import coordata from './data.js';

// import fs from 'fs';

// // Sample coordata structure
// // const coordata = [
// //     {
// //         "type": "Feature",
// //         "geometry": {
// //             "type": "Point",
// //             "coordinates": [16.5150833, 80.5181667]
// //         },
// //         "properties": {
// //             "id": 1,
// //             "station": "Secretariat, Amaravati - APPCB",
// //             "city": "Amaravati",
// //             "state": "Andhra_Pradesh",
// //             "aqi": 306.9230769230769,
// //             "So2": 18,
// //             "Nh3": 4,
// //             "Ozone": 108,
// //             "No2": 15,
// //             "Co": 76,
// //             "Pm25": 129,
// //             "Pm10": 102
// //         }
// //     },
// //     // Add more data as needed
// // ];

// // AQI calculation and max element determination
// function calculateAQIAndMaxElement(data) {
//     return data.map(item => {
//         const { Co, Nh3, No2, Ozone, Pm25, Pm10, So2 } = item.properties;

//         // Calculate individual AQI components
//         const AQICO = Co || 0;
//         const AQINH3 = Nh3 || 0;
//         const AQINO2 = No2 || 0;
//         const AQIO3 = Ozone || 0;
//         const AQIPM10 = Pm10 || 0;
//         const AQIPM25 = Pm25 || 0;
//         const AQISO2 = So2 || 0;

//         // Calculate the AQI using the maximum formula
//         const aqi = !(AQIPM10 || AQIPM25) ? -1 : Math.max(AQICO, AQINH3, AQINO2, AQIO3, AQIPM10, AQIPM25, AQISO2);

//         // Determine the max element type
//         let maxele = "";
//         switch (aqi) {
//             case AQICO:
//                 maxele = "co";
//                 break;
//             case AQINH3:
//                 maxele = "nh3";
//                 break;
//             case AQINO2:
//                 maxele = "no2";
//                 break;
//             case AQIO3:
//                 maxele = "o3";
//                 break;
//             case AQIPM10:
//                 maxele = "pm10";
//                 break;
//             case AQIPM25:
//                 maxele = "pm25";
//                 break;
//             case AQISO2:
//                 maxele = "so2";
//                 break;
//             default:
//                 maxele = "unknown";
//         }

//         // Return new object with updated AQI and maxele
//         return {
//             ...item,
//             properties: {
//                 ...item.properties,
//                 aqi,
//                 maxele
//             }
//         };
//     });
// }

// // Run calculations and save to new file
// const updatedData = calculateAQIAndMaxElement(coordata);

// // Write updated data to new file
// fs.writeFile('updatedCoordata.json', JSON.stringify(updatedData, null, 2), (err) => {
//     if (err) {
//         console.error('Error writing file', err);
//     } else {
//         console.log('File successfully written as updatedCoordata.json');
//     }
// });
