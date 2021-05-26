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

const callback1 = function (datas) {
  for (i = 0; i < 37; i++) {
    const btn = document.createElement("button");  
    const dist = datas[i][1];
    let cases = +datas[i][2];
    btn.textContent = cases + " " + " " + dist;
    btn.value = dist;
    btn.setAttribute("id", `totalCases` + i);
    databaseTotalCases.appendChild(btn);
    totalNumberofCases = totalNumberofCases+cases
  }
   totalCases.textContent = totalNumberofCases


  for (i = 0; i < 37; i++) {
    const btn = document.createElement("button");
    const dist = datas[i][1];
    const cases = +datas[i][3];
    btn.textContent = cases + " " + " " + dist;
    btn.value = dist;
    btn.setAttribute("id", "dischargedCases" + i);
    databaseDischargedCases.appendChild(btn);
    totalDischargedCases = totalDischargedCases+cases
  }
  totalDischarges.textContent = totalDischargedCases


  for (i = 0; i < 37; i++) {
    const btn = document.createElement("button");
    const dist = datas[i][1];
    const cases = +datas[i][5];
    btn.textContent = cases + " " + " " + dist;
    btn.value = dist;
    btn.setAttribute("id", "deathCases" + i);
    databaseDeathCases.appendChild(btn);
    totalDeathCases = totalDeathCases +cases
  }
   totalDeaths.textContent = totalDeathCases


  for (i = 0; i < 37; i++) {
    const btn = document.createElement("button");
    const dist = datas[i][1];
    const cases = +datas[i][4];
    btn.textContent = cases + " " + " " + dist;
    btn.value = dist;
    btn.setAttribute("class", "newCases" + i);
    databaseNewCases.appendChild(btn);
    totalRecentCases = totalRecentCases + cases
  }
  totalNewCases.textContent = totalRecentCases
  
};

// Adding Chart
const callback2 = function(datas){

  let covidDistrict = []
  let covidTotalCases = []
  for (i = 0; i < 37; i++) {
    const dist = datas[i][1];
    let cases = +datas[i][2];
    covidTotalCases.push(cases)
    covidDistrict.push(dist)
  }

  let covidDischargedCases = []
  for (i = 0; i < 37; i++) {
    let cases = +datas[i][3];
    covidDischargedCases.push(cases)
  }

  let covidDeathCases = []
  for (i = 0; i < 37; i++) {
    let cases = +datas[i][5];
    covidDeathCases.push(cases)
  }

  let covidAddedCases = []
  for (i = 0; i < 37; i++) {
    let cases = +datas[i][4];
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




const districtName = async () => {
  const response = await fetch("covidData.json");
  return response;
};

districtName()
.then((response) => {
    return response.json();
  })
  .then((datas) => {
    return datas.data;
  })
  .then((data) => {
    callback1(data);
    callback2(data)
  });

// Adding map

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
              '<strong>Ariyallur</strong><ol><li>Total Cases:5427</li><li>Death Cases:52</li><li>Recently Added Cases:298 </li></ol>',
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
              '<strong>Chengapattu</strong><ol><li>Total Cases:76275</li><li>Death Cases:923</li><li>Recently Added Cases:8608 </li></ol>',
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
              '<strong>Chennai</strong><ol><li>Total Cases:318614</li><li>Death Cases:4629</li><li>Recently Added Cases:31136 </li></ol>',
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
              '<strong>Coimbatore</strong><ol><li>Total Cases:75293</li><li>Death Cases:717</li><li>Recently Added Cases: 6948</li></ol>',
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
              '<strong>Cuddalore</strong><ol><li>Total Cases: 29363</li><li>Death Cases: 319</li><li>Recently Added Cases: 1450</li></ol>',
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
              '<strong>Dharmapuri</strong><ol><li>Total Cases:8899</li><li>Death Cases:64</li><li>Recently Added Cases: 1078</li></ol>',
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
              '<strong>Dindigul</strong><ol><li>Total Cases: 15030</li><li>Death Cases:208</li><li>Recently Added Cases:1616 </li></ol>',
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
              '<strong>Erode</strong><ol><li>Total Cases: 19811</li><li>Death Cases: 157</li><li>Recently Added Cases: 2656</li></ol>',
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
              '<strong>Kallakurichi</strong><ol><li>Total Cases: 12227</li><li>Death Cases: 109</li><li>Recently Added Cases: 649</li></ol>',
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
              '<strong>Kanchepuram</strong><ol><li>Total Cases: 36790</li><li>Death Cases: 515</li><li>Recently Added Cases: 2810</li></ol>',
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
              '<strong>Kanniyakumari</strong><ol><li>Total Cases: 20995</li><li>Death Cases: 1849</li><li>Recently Added Cases: 20995</li></ol>',
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
              '<strong>Karur</strong><ol><li>Total Cases: 7121</li><li>Death Cases: 55</li><li>Recently Added Cases: 786</li></ol>',
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
              '<strong>Krishnagiri</strong><ol><li>Total Cases:13174</li><li>Death Cases: 126</li><li>Recently Added Cases: 2620</li></ol>',
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
              '<strong>Madurai</strong><ol><li>Total Cases: 29005</li><li>Death Cases: 502</li><li>Recently Added Cases:4073 </li></ol>',
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
              '<strong>Nagapattinam</strong><ol><li>Total Cases: 12705</li><li>Death Cases: 167</li><li>Recently Added Cases: 1395</li></ol>',
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
              '<strong>Namakkal</strong><ol><li>Total Cases: 15095</li><li>Death Cases: 114</li><li>Recently Added Cases: 1730</li></ol>',
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
              '<strong>Nilgiris</strong><ol><li>Total Cases: 9704</li><li>Death Cases: 51</li><li>Recently Added Cases: 459</li></ol>',
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
              '<strong>Perambalur</strong><ol><li>Total Cases: 2540</li><li>Death Cases: 24</li><li>Recently Added Cases: 124</li></ol>',
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
              '<strong>Pudukottai</strong><ol><li>Total Cases: 13363</li><li>Death Cases: 160</li><li>Recently Added Cases:742 </li></ol>',
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
              '<strong>Ramanathapuram</strong><ol><li>Total Cases: 7815</li><li>Death Cases: 142</li><li>Recently Added Cases: 707</li></ol>',
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
              '<strong>Ranipet</strong><ol><li>Total Cases: 19684</li><li>Death Cases: 196</li><li>Recently Added Cases: 1715</li></ol>',
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
              '<strong>Salem</strong><ol><li>Total Cases: 39873</li><li>Death Cases: 500</li><li>Recently Added Cases: 3536</li></ol>',
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
              '<strong>Sivaganga</strong><ol><li>Total Cases: 8264</li><li>Death Cases: 130</li><li>Recently Added Cases: 565</li></ol>',
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
              '<strong>Tenkasi</strong><ol><li>Total Cases: 11281</li><li>Death Cases: 174</li><li>Recently Added Cases: 1469</li></ol>',
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
              '<strong>Thanjavur</strong><ol><li>Total Cases: 24578</li><li>Death Cases: 298</li><li>Recently Added Cases: 2063</li></ol>',
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
              '<strong>Theni</strong><ol><li>Total Cases: 19371</li><li>Death Cases: 212</li><li>Recently Added Cases: 1321</li></ol>',
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
              '<strong>Thoothukudi</strong><ol><li>Total Cases: 21629</li><li>Death Cases: 151</li><li>Recently Added Cases: 2790</li></ol>',
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
              '<strong>Thiruchirappalli</strong><ol><li>Total Cases: 22038</li><li>Death Cases: 210</li><li>Recently Added Cases:2860 </li></ol>',
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
              '<strong>Tirunelveli</strong><ol><li>Total Cases: 22428</li><li>Death Cases: 232</li><li>Recently Added Cases: 3836</li></ol>',
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
              '<strong>Tirupathur</strong><ol><li>Total Cases: 9559</li><li>Death Cases: 138</li><li>Recently Added Cases: 974</li></ol>',
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
              '<strong>Tiruppur</strong><ol><li>Total Cases: 25111</li><li>Death Cases: 235</li><li>Recently Added Cases:2595 </li></ol>',
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
              '<strong>Tiruvallur</strong><ol><li>Total Cases: 57189</li><li>Death Cases: 771</li><li>Recently Added Cases: 5407</li></ol>',
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
              '<strong>Tiruvannamalai</strong><ol><li>Total Cases: 23163</li><li>Death Cases: 299</li><li>Recently Added Cases: 1988</li></ol>',
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
              '<strong>Tiruvarur</strong><ol><li>Total Cases: 14666</li><li>Death Cases: 120</li><li>Recently Added Cases: 963</li></ol>',
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
              '<strong>Vellore</strong><ol><li>Total Cases: 25807</li><li>Death Cases: 373</li><li>Recently Added Cases: 2403</li></ol>',
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
              '<strong>Villupuram</strong><ol><li>Total Cases: 17887</li><li>Death Cases: 120</li><li>Recently Added Cases: 1293</li></ol>',
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
              '<strong>Virudhunagar</strong><ol><li>Total Cases: 19239</li><li>Death Cases: 239</li><li>Recently Added Cases: 1338</li></ol>',
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

// Add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// adding event handler
window.addEventListener("click", (e) => {
  console.log(e.target.value);
});