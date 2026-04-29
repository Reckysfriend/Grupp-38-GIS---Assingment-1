// ---------------------------------------- Builds Map ---------------------------------------- //

var map = L.map("map").setView([60.61713023811373, 15.597447894438337], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// ---------------------------------------- Task 1 ---------------------------------------- //
var marker = L.marker([60.61713023811373, 15.597447894438337]).bindPopup(
  `<h1> Ringvägen</h1><p> Linus' childhood neighbourhood </p><img src="/static/markerImg.jpg" width="500">`,
);
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

// ---------------------------------------- Task 2 ---------------------------------------- //
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
  task2Location.forEach(function (location) {
    var marker = L.marker([location.lat, location.lng]);
    console.log(document.getElementById("sidebar"));
    marker.on("click", function (e) {
      document.getElementById("sidebar").classList.remove("hidden");
      document.getElementById("sidebar").innerHTML =
        `<img src =${location.img} width="300" height="200">
      <h3>${location.name}</h3>
      <p>${location.type}</p>
      <p>${location.location}</p>
      <p>${location.description}</p>`;
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
var supermarketData = null;
function toggleSupermarkets(data) {
  if (supermarketData) {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      },
    }).addTo(map);
  }
}
function toggleBuffer(data) {
  if (supermarketData) {
    data.features.forEach(function (feature) {
      // Storing each points lng/lat since they are reversed in the geoJSON compared to leaflet
      var lng = feature.geometry.coordinates[0];
      var lat = feature.geometry.coordinates[1];
      // Adds 1km radius circle at each marker
      var circle = L.circle([lat, lng], { radius: 1000 }).addTo(map);
      supermarketCircles.push(circle);
    });
  }
}
function toggleOverlap(data) {
  if (supermarketData) {
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
}
async function fetchGeoJsonData(path) {
  const response = await fetch(path);
  const data = await response.json();
  supermarketData = data;
}
fetchGeoJsonData("/static/Data/supermarket.geojson");

// ---------------------------------------- Task 4 ---------------------------------------- //
function toggleStaliteImage() {
  var bounds = [
    [60.59514843973514, 15.596187294878863],
    [60.60181494883558, 15.619811791293525],
  ];
  L.imageOverlay("/static/mineFalun.png", bounds).addTo(map);
}

// ---------------------------------------- Task 5 ---------------------------------------- //
var fuelData = null;
async function fetchFuelGeoJson(path) {
  const reponse = await fetch(path);
  const data = await reponse.json();
  fuelData = data;
}

function addMarkerClusterGroup(data) {
  var markers = L.markerClusterGroup();
  data.features.forEach(function (feature) {
    var lng = feature.geometry.coordinates[0];
    var lat = feature.geometry.coordinates[1];
    var marker = L.marker([lat, lng]).bindPopup(feature.properties.name);
    markers.addLayer(marker);
  });
  map.addLayer(markers);
}
fetchFuelGeoJson("/static/Data/fuel.geojson");

function addDonutClusterGroup(data) {
  var markers = L.DonutCluster(
    { chunkedLoading: true },
    {
      key: "brand",
      arcColorDict: {
        Shell: "yellow",
        OKQ8: "green",
        "Circle K": "orange",
        undefined: "gray",
        st1: "blue",
        ST1: "blue",
        St1: "blue",
        IDS: "purple",
        Preem: "red",
        Ingo: "indigo",
        Tanka: "black",
      },
    },
  );

  data.features.forEach(function (feature) {
    var lng = feature.geometry.coordinates[0];
    var lat = feature.geometry.coordinates[1];
    var marker = L.marker([lat, lng], {
      brand: feature.properties.brand,
    }).bindPopup(feature.properties.name);
    markers.addLayer(marker);
  });
  map.addLayer(markers);
}
// ---------------------------------------- HTML Buttons ---------------------------------------- //
// Grabs our sidebar object
var taskbar = document.getElementById("taskbar");
//var varMap = document.getElementById("map");
var sidebarImg = document.getElementById("sidebarImg");

function toggleSidebar() {
  taskbar.classList.toggle("translate-x-full");
  taskbar.classList.toggle("translate-x-0");
  //setTimeout(() => map.invalidateSize(), 300);
}
function toggleMarker(layer) {
  if (map.hasLayer(layer)) {
    map.removeLayer(layer);
  } else {
    map.addLayer(layer);
  }
}
function buildDefaultView() {
  taskbar.innerHTML = `        
  <button class="absolute -left-8 top-1/2 z-[2000]" onClick="toggleSidebar()"><img id="sidebarImg" src="/static/hide-sidepanel.png"/></button>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onclick="buildTask1()">Task 1</button>
  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onclick="buildTask2()">Task 2</button>
  <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full" onclick="buildTask3()">Task 3</button>
  <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full" onclick="buildTask4()">Task 4</button>
  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onclick="buildTask5()">Task 5</button>`;
}

function buildTask1() {
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline">Task 1</h3>
  <button onClick="buildDefaultView()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>
  <button onclick="toggleMarker(marker)" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle Point</button>
  <button onclick="toggleMarker(polygon)" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle Polygon</button>
  <button onclick="toggleMarker(line)" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle Line</button>`;
}
function buildTask2() {
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline top-0">Task 2</h3>
  <button onClick="endTask2()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>`;
  task2Handler();
}
function endTask2() {
  document.getElementById("sidebar").classList.add("hidden");
  buildDefaultView();
}
function buildTask3() {
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline">Task 3</h3>
  <button onClick="buildDefaultView()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>
  <button onclick="toggleSupermarkets(supermarketData)" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle Supermarkets</button>
  <button onclick="toogleBuffer(supermarketData)" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle 1km Buffer</button>
  <button onclick="toogleOverlap(supermarketData)" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle Overlap</button>`;
}
function buildTask4() {
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline">Task 4</h3>
  <button onClick="buildDefaultView()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>
  <button onclick="toggleStaliteImage()" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle Image</button>`;
}
function buildTask5() {
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline">Task 5</h3>
  <button onClick="buildDefaultView()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>
  <button onclick="addMarkerClusterGroup(fuelData)" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle Marker Cluster</button>
  <button onclick="addDonutClusterGroup(fuelData)" class = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Toggle Donut Cluter</button>`;
}
buildDefaultView();
