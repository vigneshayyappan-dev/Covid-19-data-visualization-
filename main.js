const ctx = document.getElementById("myLine")


databaseTotalCases = document.getElementById("left-bar_sidebar1_lead3");
databaseDischargedCases = document.getElementById("left-bar_sidebar2_lead3")
databaseDeathCases = document.getElementById("right-bar_sidebar1_lead3");
databaseNewCases = document.getElementById("right-bar_sidebar2_lead3");

totalCases = document.getElementById("left-bar_sidebar1_lead2")
totalDischarges = document.getElementById("left-bar_sidebar2_lead2")
totalDeaths = document.getElementById("right-bar_sidebar1_lead2")
totalNewCases = document.getElementById("right-bar_sidebar2_lead2")

let totalNumberofCases = 1
let totalDischargedCases =1
let totalDeathCases = 1
let totalRecentCases = 1


const callback1 = function (district,caseCategory) {


  for (i = 3; i<40; i++) {
      const btn = document.createElement("button");  
      const dist = district[i];
      let cases = caseCategory[i].active;
      btn.textContent = cases + " " + " " + dist;
      btn.value = dist;
        btn.setAttribute("id", `totalCases` + i);
        databaseTotalCases.appendChild(btn);
        totalNumberofCases = totalNumberofCases+cases
  }
   totalCases.textContent = totalNumberofCases

  for (i = 3; i < 40; i++) {
    const btn = document.createElement("button");
    const dist = district[i];
    const cases = +caseCategory[i].recovered;
    btn.textContent = cases + " " + " " + dist;
    btn.value = dist;
    btn.setAttribute("id", "dischargedCases" + i);
    databaseDischargedCases.appendChild(btn);
    totalDischargedCases = totalDischargedCases+cases
  }
  totalDischarges.textContent = totalDischargedCases

  for (i = 3; i < 40; i++) {
    const btn = document.createElement("button");
    const dist = district[i];
    const cases = caseCategory[i].deceased;
    btn.textContent = cases + " " + " " + dist;
    btn.value = dist;
    btn.setAttribute("id", "deathCases" + i);
    databaseDeathCases.appendChild(btn);
    totalDeathCases = totalDeathCases +cases
  }
   totalDeaths.textContent = totalDeathCases


  for (i = 3; i < 40; i++) {
    const btn = document.createElement("button");
    const dist = district[i];
    const cases = +caseCategory[i].confirmed;
    btn.textContent = cases + " " + " " + dist;
    btn.value = dist;
    btn.setAttribute("class", "newCases" + i);
    databaseNewCases.appendChild(btn);
    totalRecentCases = totalRecentCases + cases
  }
  totalNewCases.textContent = totalRecentCases
  mapPopup(totalNumberofCases,totalDischargedCases,totalDeathCases,totalRecentCases,district,caseCategory)
}

// Adding Chart
const callback2 = function(district,caseCategory){

  let covidDistrict = []
  let covidTotalCases = []
  for (i = 3; i < 40; i++) {
    const dist = district[i];
    const cases = +caseCategory[i].recovered;
    covidTotalCases.push(cases)
    covidDistrict.push(dist)
  }

  let covidDischargedCases = []
  for (i = 3; i < 40; i++) {
    const cases = +caseCategory[i].recovered;
    covidDischargedCases.push(cases)
  }

  let covidDeathCases = []
  for (i = 3; i < 40; i++) {
    const cases = +caseCategory[i].recovered; 
    covidDeathCases.push(cases)
  }

  let covidAddedCases = []
  for (i = 3; i < 40; i++) {
    const cases = +caseCategory[i].recovered;
    covidAddedCases.push(cases)
  }
  let lineChart = new Chart(ctx,{
    type:"line",
    data:{
        labels:covidDistrict,
        datasets:[{
            label:"Cases",
            fill:false,
            borderJoinStyle:"round",
            borderColor:"red",
            lineTension:0,
            data:covidTotalCases
            // backgroundColor:"red", // borderCapStyle:"round", // pointBorderColor:"rgba(6,82,221,1.0)",            // pointBackgroundColor:"green",            // pointHoverBorderColor:"yellow",            // pointBackgroundColor:"violet",            // pointHoverBorderWidth:3,// pointRadius:3, 
        },{  
          label:"Discharges",
          fill:false,
          borderJoinStyle:"round",
          borderColor:"orange",
          lineTension:0,
        data:covidDischargedCases
      },{
        label:"Death",
        fill:false,
        borderJoinStyle:"round",
        borderColor:"blue",
        lineTension:0,
        data:covidDeathCases
      },
      {
        label:"Active",
        fill:false,
        borderJoinStyle:"round",
        borderColor:"green",
        lineTension:0,
        data:covidAddedCases
      }
      ]
    }
})
}
  
const data = async () => {
  const response = await fetch("https://api.covid19india.org/state_district_wise.json");
  return response;
};

data()
.then((response) => {
    return response.json();
  })
  .then((datas) => {
    const arrDataState = Object.values(datas)
    const arrDataDist =  Object.values(arrDataState[32])
    const arrDataValues =  Object.values(arrDataState[32])
    const district = Object.keys(arrDataDist[0])
    const cases = Object.values(arrDataValues[0])
    return{
      district,cases
    }
  })
  .then((data) => {
    distName = data.district
    caseCategory = data.cases
    callback1(distName,caseCategory);
    callback2(distName,caseCategory)
  });



// Adding map

function mapPopup(totalActiveCases,totalDischarges,totalDeseased,totalCases,district,caseCategory){

mapboxgl.accessToken =
  "pk.eyJ1IjoidmlnbmVzaGt1bWFyYXl5YXBwYW4iLCJhIjoiY2tuemh6MjN1MDV4azJubWY4d2dpeXp1ciJ9.CV7R8IAXv5Z67bpOrO8sWQ";
var map = new mapboxgl.Map({
  container: "map",
  // style: "mapbox://styles/vigneshkumarayyappan/cko02e9ka2txe17qx1smlm86b",
  // mapbox://styles/vigneshkumarayyappan/cko02h75m0jhc17pl31wkzypc
  // style:"mapbox://styles/vigneshkumarayyappan/cko02h75m0jhc17pl31wkzypc",
  // style:"mapbox://styles/vigneshkumarayyappan/cko02h75m0jhc17pl31wkzypc",
  style:"mapbox://styles/vigneshkumarayyappan/cko02h75m0jhc17pl31wkzypc",
  zoom: 6,
  center: [ 78.6569, 11.1271],
});
// Adding Menus and Options to the map
var layerList = document.getElementById("menu");
var inputs = layerList.getElementsByTagName("input");

function switchLayer(layer) {
  var layerId = layer.target.id;
  map.setStyle("mapbox://styles/mapbox/" + layerId);
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}
// let marker = new mapboxgl.Marker().setLngLat([78.6569, 11.1271]).addTo(map);
let Ariyalur = new mapboxgl.Marker().setLngLat([79.0694, 11.1521]).addTo(map);
let Chengalpattu = new mapboxgl.Marker()
  .setLngLat([79.9805, 12.69362])
  .addTo(map);
let Chennai = new mapboxgl.Marker()
  .setLngLat([80.270186, 13.083694])
  .addTo(map);
let Coimbatore = new mapboxgl.Marker()
  .setLngLat([76.962843, 11.001812])
  .addTo(map);
let Cuddlaore = new mapboxgl.Marker().setLngLat([79.7629, 11.75664]).addTo(map);
let Dharmapuri = new mapboxgl.Marker()
  .setLngLat([78.158986, 12.134799])
  .addTo(map);
let Dindigul = new mapboxgl.Marker()
  .setLngLat([77.969573, 10.365545])
  .addTo(map);
let Erode = new mapboxgl.Marker().setLngLat([78.060022, 10.510729]).addTo(map);
let Kallakurichi = new mapboxgl.Marker()
  .setLngLat([78.963882, 11.738187])
  .addTo(map);
let Kancheepuram = new mapboxgl.Marker()
  .setLngLat([79.704983, 12.835318])
  .addTo(map);
let Kanniyakumari = new mapboxgl.Marker()
  .setLngLat([77.5385, 8.0883])
  .addTo(map);
let Karur = new mapboxgl.Marker().setLngLat([78.0766, 10.9601]).addTo(map);
let Krishnagiri = new mapboxgl.Marker()
  .setLngLat([78.2126326, 12.5275198])
  .addTo(map);
let Madurai = new mapboxgl.Marker().setLngLat([78.1198, 9.9252]).addTo(map);
let Nagapattinam = new mapboxgl.Marker()
  .setLngLat([79.8449, 10.7672])
  .addTo(map);
let Namakkal = new mapboxgl.Marker().setLngLat([78.1674, 11.2189]).addTo(map);
let Nilgiris = new mapboxgl.Marker().setLngLat([76.7337, 11.4916]).addTo(map);
let Perambalur = new mapboxgl.Marker().setLngLat([78.8807, 11.2342]).addTo(map);
let Pudukkottai = new mapboxgl.Marker()
  .setLngLat([78.8001, 10.3833])
  .addTo(map);
let Ramanathapuram = new mapboxgl.Marker()
  .setLngLat([78.8395, 9.3639])
  .addTo(map);
let Ranipet = new mapboxgl.Marker().setLngLat([79.319, 12.9487]).addTo(map);
let Salem = new mapboxgl.Marker().setLngLat([78.146, 11.6643]).addTo(map);
let Sivaganga = new mapboxgl.Marker().setLngLat([78.4809, 9.8433]).addTo(map);
let Tenkasi = new mapboxgl.Marker().setLngLat([77.3161, 8.9594]).addTo(map);
let Thanjavur = new mapboxgl.Marker().setLngLat([79.1378, 10.787]).addTo(map);
let Theni = new mapboxgl.Marker().setLngLat([77.4768, 10.0104]).addTo(map);
let Thoothukudi = new mapboxgl.Marker().setLngLat([78.1348, 8.7642]).addTo(map);
let Thiruchirappalli = new mapboxgl.Marker()
  .setLngLat([78.7047, 10.7905])
  .addTo(map);
let Tirunelveli = new mapboxgl.Marker().setLngLat([77.7567, 8.7139]).addTo(map);
let Tirupathur = new mapboxgl.Marker().setLngLat([78.5678, 12.495]).addTo(map);
let Tiruppur = new mapboxgl.Marker().setLngLat([77.3411, 11.1085]).addTo(map);
let Tiruvallur = new mapboxgl.Marker().setLngLat([79.912, 13.1231]).addTo(map);
let Tiruvannamalai = new mapboxgl.Marker()
  .setLngLat([79.0747, 12.2253])
  .addTo(map);
let Tiruvarur = new mapboxgl.Marker().setLngLat([79.6344, 10.7661]).addTo(map);
let Vellore = new mapboxgl.Marker().setLngLat([79.1325, 12.9165]).addTo(map);
let Villupuram = new mapboxgl.Marker().setLngLat([79.4861, 11.9401]).addTo(map);
let Virudhunagar = new mapboxgl.Marker().setLngLat([77.9624, 9.568]).addTo(map);


// Adding popup
  map.on("load", function () {
 
    map.addSource("places", {
      // This GeoJSON contains features that include an "icon"
      // property. The value of the "icon" property corresponds
      // to an image in the Mapbox Streets style's sprite.
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              description:
                `<strong>${district[3]}</strong><ol><li>Total Cases:${caseCategory[3].confirmed}</li><li> Current Cases:${caseCategory[3].deceased}</li><li>Recently Added Cases:${caseCategory[3].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.0694, 11.1521],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[4]}</strong><ol><li>Total Cases:${caseCategory[4].confirmed}</li><li>Current Cases:${caseCategory[4].deceased}</li><li>Recently Added Cases:${caseCategory[4].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.9805, 12.69362],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[5]}</strong><ol><li>Total Cases:${caseCategory[5].confirmed}</li><li>Current Cases:${caseCategory[5].deceased}</li><li>Recently Added Cases:${caseCategory[5].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [80.270186, 13.083694],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[6]}</strong><ol><li>Total Cases:${caseCategory[6].confirmed}</li><li>Current Cases:${caseCategory[6].deceased}</li><li>Recently Added Cases:${caseCategory[6].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [76.962843, 11.001812],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[7]}</strong><ol><li>Total Cases:${caseCategory[7].confirmed}</li><li>Current Cases:${caseCategory[7].deceased}</li><li>Recently Added Cases:${caseCategory[7].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.7629, 11.75664],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[8]}</strong><ol><li>Total Cases:${caseCategory[8].confirmed}</li><li>Current Cases:${caseCategory[8].deceased}</li><li>Recently Added Cases:${caseCategory[8].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.158986, 12.134799],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[9]}</strong><ol><li>Total Cases:${caseCategory[9].confirmed}</li><li>Current Cases:${caseCategory[9].deceased}</li><li>Recently Added Cases:${caseCategory[9].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [77.969573, 10.365545],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[10]}</strong><ol><li>Total Cases:${caseCategory[10].confirmed}</li><li>Current Cases:${caseCategory[10].deceased}</li><li>Recently Added Cases:${caseCategory[10].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.060022, 10.510729],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[11]}</strong><ol><li>Total Cases:${caseCategory[11].confirmed}</li><li>Current Cases:${caseCategory[11].deceased}</li><li>Recently Added Cases:${caseCategory[11].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.963882, 11.738187],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[12]}</strong><ol><li>Total Cases:${caseCategory[12].confirmed}</li><li>Current Cases:${caseCategory[12].deceased}</li><li>Recently Added Cases:${caseCategory[12].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.704983, 12.835318],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[13]}</strong><ol><li>Total Cases:${caseCategory[13].confirmed}</li><li>Current Cases:${caseCategory[13].deceased}</li><li>Recently Added Cases:${caseCategory[13].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [77.5385, 8.0883],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[14]}</strong><ol><li>Total Cases:${caseCategory[14].confirmed}</li><li>Current Cases:${caseCategory[14].deceased}</li><li>Recently Added Cases:${caseCategory[14].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.0766, 10.9601],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[15]}</strong><ol><li>Total Cases:${caseCategory[15].confirmed}</li><li>Current Cases:${caseCategory[15].deceased}</li><li>Recently Added Cases:${caseCategory[15].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.2126326, 12.5275198],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[16]}</strong><ol><li>Total Cases:${caseCategory[16].confirmed}</li><li>Current Cases:${caseCategory[16].deceased}</li><li>Recently Added Cases:${caseCategory[16].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.1198, 9.9252],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[17]}</strong><ol><li>Total Cases:${caseCategory[17].confirmed}</li><li>Current Cases:${caseCategory[17].deceased}</li><li>Recently Added Cases:${caseCategory[17].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.8449, 10.7672],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[18]}</strong><ol><li>Total Cases:${caseCategory[18].confirmed}</li><li>Current Cases:${caseCategory[18].deceased}</li><li>Recently Added Cases:${caseCategory[18].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.1674, 11.2189],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[19]}</strong><ol><li>Total Cases:${caseCategory[19].confirmed}</li><li>Current Cases:${caseCategory[19].deceased}</li><li>Recently Added Cases:${caseCategory[19].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [76.7337, 11.4916],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[20]}</strong><ol><li>Total Cases:${caseCategory[20].confirmed}</li><li>Current Cases:${caseCategory[20].deceased}</li><li>Recently Added Cases:${caseCategory[20].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.8807, 11.2342],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[21]}</strong><ol><li>Total Cases:${caseCategory[21].confirmed}</li><li>Current Cases:${caseCategory[21].deceased}</li><li>Recently Added Cases:${caseCategory[21].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.8001, 10.3833],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[22]}</strong><ol><li>Total Cases:${caseCategory[22].confirmed}</li><li>Current Cases:${caseCategory[22].deceased}</li><li>Recently Added Cases:${caseCategory[22].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.8395, 9.3639],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[23]}</strong><ol><li>Total Cases:${caseCategory[23].confirmed}</li><li>Current Cases:${caseCategory[23].deceased}</li><li>Recently Added Cases:${caseCategory[23].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.319, 12.9487],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[24]}</strong><ol><li>Total Cases:${caseCategory[24].confirmed}</li><li>Current Cases:${caseCategory[24].deceased}</li><li>Recently Added Cases:${caseCategory[24].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.146, 11.6643],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[25]}</strong><ol><li>Total Cases:${caseCategory[25].confirmed}</li><li>Current Cases:${caseCategory[25].deceased}</li><li>Recently Added Cases:${caseCategory[25].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.4809, 9.8433],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[26]}</strong><ol><li>Total Cases:${caseCategory[26].confirmed}</li><li>Current Cases:${caseCategory[26].deceased}</li><li>Recently Added Cases:${caseCategory[26].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [77.3161, 8.9594],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[27]}</strong><ol><li>Total Cases:${caseCategory[27].confirmed}</li><li>Current Cases:${caseCategory[27].deceased}</li><li>Recently Added Cases:${caseCategory[27].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates:[79.1378, 10.787],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[28]}</strong><ol><li>Total Cases:${caseCategory[28].confirmed}</li><li>Current Cases:${caseCategory[28].deceased}</li><li>Recently Added Cases:${caseCategory[28].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [77.4768, 10.0104],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[29]}</strong><ol><li>Total Cases:${caseCategory[29].confirmed}</li><li>Current Cases:${caseCategory[29].deceased}</li><li>Recently Added Cases:${caseCategory[29].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.1348, 8.7642],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[30]}</strong><ol><li>Total Cases:${caseCategory[30].confirmed}</li><li>Current Cases:${caseCategory[30].deceased}</li><li>Recently Added Cases:${caseCategory[30].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.7047, 10.7905],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[31]}</strong><ol><li>Total Cases:${caseCategory[31].confirmed}</li><li>Current Cases:${caseCategory[31].deceased}</li><li>Recently Added Cases:${caseCategory[31].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [77.7567, 8.7139],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[32]}</strong><ol><li>Total Cases:${caseCategory[32].confirmed}</li><li>Current Cases:${caseCategory[32].deceased}</li><li>Recently Added Cases:${caseCategory[32].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [78.5678, 12.495],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[33]}</strong><ol><li>Total Cases:${caseCategory[33].confirmed}</li><li>Current Cases:${caseCategory[33].deceased}</li><li>Recently Added Cases:${caseCategory[33].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [77.3411, 11.1085],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[34]}</strong><ol><li>Total Cases:${caseCategory[34].confirmed}</li><li>Current Cases:${caseCategory[34].deceased}</li><li>Recently Added Cases:${caseCategory[34].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.912, 13.1231],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[35]}</strong><ol><li>Total Cases:${caseCategory[35].confirmed}</li><li>Current Cases:${caseCategory[35].deceased}</li><li>Recently Added Cases:${caseCategory[35].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.0747, 12.2253],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[36]}</strong><ol><li>Total Cases:${caseCategory[36].confirmed}</li><li>Current Cases:${caseCategory[36].deceased}</li><li>Recently Added Cases:${caseCategory[36].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.6344, 10.7661],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[37]}</strong><ol><li>Total Cases:${caseCategory[37].confirmed}</li><li>Current Cases:${caseCategory[37].deceased}</li><li>Recently Added Cases:${caseCategory[37].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.1325, 12.9165],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[38]}</strong><ol><li>Total Cases:${caseCategory[38].confirmed}</li><li>Current Cases:${caseCategory[38].deceased}</li><li>Recently Added Cases:${caseCategory[38].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [79.4861, 11.9401],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
              `<strong>${district[39]}</strong><ol><li>Total Cases:${caseCategory[39].confirmed}</li><li>Current Cases:${caseCategory[39].deceased}</li><li>Recently Added Cases:${caseCategory[39].active}</li></ol>`,
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [77.9624, 9.568],
            },
          },
        ],
      },
  });  

  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "symbol",
    source: "places",
    layout: {
      "icon-image": "{icon}",
      "icon-allow-overlap": true,
    },
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on("click", "places", function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", "places", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
  });
});
map.addControl(new mapboxgl.NavigationControl());
}
// Add zoom and rotation controls to the map
// adding event handler
window.addEventListener("click", (e) => {
  console.log(e.target.value);
});



// const data = async () => {
//   const response = await fetch("https://api.covid19india.org/state_district_wise.json");
//   return response;
// };

// data()
// .then((response) => {
//     return response.json();
//   })
//   .then((datas) => {
//     const arrDataState = Object.values(datas)
//      arrDataDist =  Object.values(arrDataState[32])
//      console.log(arrDataDist[0])
//      console.log(Object.values(arrDataDist[0]))
//   })
//   .then((data) => {
//     callback1(data);
//     callback2(data)
//   });





// const data = async () => {
//   const response = await fetch("https://api.covid19india.org/state_district_wise.json");
//   return response;
// };

// data()
// .then((response) => {
//     return response.json();
//   })
//   .then((datas) => {
//     const arrDataState = Object.values(datas)
//     const arrDataDist =  Object.values(arrDataState[32])
//     const arrDataValues =  Object.values(arrDataState[32])
//     const district = Object.keys(arrDataDist[0])
//     const cases = Object.values(arrDataValues[0])
//     return{
//       district,cases
//     }
//   })
//   .then((data) => {
//     // callback1(data);
//     // callback2(data)
//     console.log(data.district)
//     console.log(data.cases)
//   });






// const districtName = async () => {
//   const response = await fetch("covidData.json");
//   return response;
// };

// districtName()
// .then((response) => {
//     return response.json();
//   })
//   .then((datas) => {
//     return datas.data;
//     // console.log(datas)
//   })
//   .then((data) => {
//     callback1(data);
//     callback2(data)
//   });



// callback1(district,caseCategory){

// }