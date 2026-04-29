// Adds the map from openStreeMap
var map = L.map("map").setView([60.61713023811373, 15.597447894438337], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Basic set of marker, circle and polygon
var marker = L.marker([60.61713023811373, 15.597447894438337]).bindPopup(
  `<h1> Ringvägen</h1><p> Linus' childhood neighbourhood </p><img src="/static/markerImg.jpg" width="500">`,
);

var circle = L.circle([60.61713023811373, 15.597447894438337], {
  color: "blue",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 200,
});

var polygon = L.polygon([
  [60.60066683717627, 15.630680520852824],
  [60.61713023811373, 15.597447894438337],
  [60.6242287940109, 15.595743434228238],
  [60.59822611666412, 15.661540293446494],
]).bindPopup(
  `<h1>Houses in Falun</h1><p> Each location Linus has lived in Falun </p><img src="/static/falunAir.jpg" width="500">`,
);

var line = L.polygon([
  [60.606425, 15.629591],
  [60.604342, 15.64179],
]).bindPopup(
  `<h1>Line between the bar and Max</h1><img src="/static/maxFalun.jpg" width="500">`,
);
var popupCords = L.popup();

function toggleMarker(layer) {
  if (map.hasLayer(layer)) {
    map.removeLayer(layer);
  } else {
    map.addLayer(layer);
  }
}

// Function to return cordinate data on map click
function mapCordinatesOnClick(e) {
  popupCords
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

// Grabs our sidebar object
var sidebar = document.getElementById("sidebar");
//var varMap = document.getElementById("map");
var sidebarImg = document.getElementById("sidebarImg");

function toggleSidebar() {
  sidebar.classList.toggle("translate-x-full");
  sidebar.classList.toggle("translate-x-0");
  //setTimeout(() => map.invalidateSize(), 300);
}
var popupEnabled = false;
var popupButton = document.getElementById("popupButton");

function togglePopup() {
  if (popupEnabled) {
    map.off("click", mapCordinatesOnClick);
    popupEnabled = false;
  } else {
    map.on("click", mapCordinatesOnClick);
    popupEnabled = true;
  }
  popupButton.classList.toggle("bg-green-500");
}

function locationSidebar() {
  const markerSidebarElement = document.querySelector("#markerSidebar");
  const content = "<p> Updated Test </>";
  markerSidebarElement.innerHTML = content;
}

const task2Location = [
  {
    name: "Max Burgers",
    type: "Resturant",
    lat: 60.60437388360507,
    lng: 15.641613826911803,
    location: "Tullkammaregatan 8, 791 31 Falun",
    description: "...",
    img: "/static/maxFalun.jpg",
  },
  {
    name: "McDonalds",
    type: "Resturant",
    lat: 60.609183123862806,
    lng: 15.656669219458408,
    location: "Bataljonsvägen 5, 791 40 Falun",
    description: "...",
    img: "/static/mcdonaldsFalun.jpg",
  },
  {
    name: "Subway",
    type: "Resturant",
    lat: 60.60684121356442,
    lng: 15.62732396279977,
    location: "Östra Hamngatan 16, 18, 791 36 Falun",
    description: "...",
    img: "/static/subwayFalun.jpg",
  },
  {
    name: "Bastard Burgers",
    type: "Resturant",
    lat: 60.605956029510445,
    lng: 15.633115313816822,
    location: "Åsgatan 25, 791 71 Falun",
    description: "...",
    img: "/static/bastardBurgerFalun.jpg",
  },
  {
    name: "Tairyo",
    type: "Resturant",
    lat: 60.60635920288443,
    lng: 15.63291447234441,
    location: "Åsgatan 18, 791 71 Falun",
    description: "...",
    img: "/static/tairyoFalun.jfif",
  },
];

function markersPointOfIntresst() {
  var markersPointOfIntresstArray = [];
  task2Location.forEach(function (t2location) {
    var marker = L.marker([t2location.lat, t2location.lng]);

    marker.on("click", function (e) {
      document.getElementById("markerSidebar").innerHTML =
        `<img src =${t2location.img} width="300" height="200">
      <h3>${t2location.name}</h3>
      <p>${t2location.type}</p>
      <p>${t2location.location}</p>
      <p>${t2location.description}</p>`;
    });
    markersPointOfIntresstArray.push(marker);
  });
  return markersPointOfIntresstArray;
}

var markers = [];
function task2Handler() {
  if (markers.length == 0) {
    markers = markersPointOfIntresst();
  }
  markers.forEach(function (marker) {
    toggleMarker(marker);
  });
}

// ---------------------------------------- Task 3 ---------------------------------------- //
var supermarketCircles = [];

function addGeoJsonData(data) {
  L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name);
    },
  }).addTo(map);
}
function addBuffer(data) {
  data.features.forEach(function (feature) {
    // Storing each points lng/lat since they are reversed in the geoJSON compared to leaflet
    var lng = feature.geometry.coordinates[0];
    var lat = feature.geometry.coordinates[1];
    // Adds 1km radius circle at each marker
    var circle = L.circle([lat, lng], { radius: 1000 }).addTo(map);
    supermarketCircles.push(circle);
  });
}
function checkBufferOverlap(data) {
  data.features.forEach(function (feature, index) {
    var isOverlapping = false;
    var lng1 = feature.geometry.coordinates[0];
    var lat1 = feature.geometry.coordinates[1];
    data.features.forEach(function (feature2) {
      if (feature === feature2) {
        return;
      }
      var lng2 = feature2.geometry.coordinates[0];
      var lat2 = feature2.geometry.coordinates[1];

      const distanceBetweenPoints = L.latLng(lat1, lng1).distanceTo(
        L.latLng(lat2, lng2),
      );
      if (distanceBetweenPoints < 2000) {
        isOverlapping = true;
      }
    });
    if (isOverlapping) {
      supermarketCircles[index].setStyle({ color: "red" });
    } else {
      supermarketCircles[index].setStyle({ color: "green" });
    }
  });
}
async function fetchGeoJsonData(path) {
  const response = await fetch(path);
  const data = await response.json();
  //console.log(data);
  addGeoJsonData(data);
  addBuffer(data);
  checkBufferOverlap(data);
}
fetchGeoJsonData("/static/Data/supermarket.geojson");
