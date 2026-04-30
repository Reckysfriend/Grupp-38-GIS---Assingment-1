// ---------------------------------------- Builds Map ---------------------------------------- //
//Adds the map to our div element via openstreetmap
var map = L.map("map").setView([62.226996, 16.21582], 5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// ---------------------------------------- Task 1 ---------------------------------------- //
//Places a marker at given cordinates with popup
var marker = L.marker([60.61713023811373, 15.597447894438337]).bindPopup(
  `<h1> Ringvägen</h1><p> Linus' childhood neighbourhood </p><img src="/static/markerImg.jpg" width="500">`,
);
//Places a polygon at given cordinates with popup
var polygon = L.polygon([
  [60.60066683717627, 15.630680520852824],
  [60.61713023811373, 15.597447894438337],
  [60.6242287940109, 15.595743434228238],
  [60.59822611666412, 15.661540293446494],
]).bindPopup(
  `<h1>Houses in Falun</h1><p> Each location Linus has lived in Falun </p><img src="/static/falunAir.jpg" width="500">`,
);
//Places a line at given cordinates with popup
var line = L.polygon([
  [60.606425, 15.629591],
  [60.604342, 15.64179],
]).bindPopup(
  `<h1>Line between the bar and Max</h1><img src="/static/maxFalun.jpg" width="500">`,
);
// Uses toggleLayer to check if the layer already exsists or not before adding/removing it
function toggleMarker() {
  map.flyTo([60.616944, 15.597239], 16);
  toggleLayer(marker);
}
function togglePolygon() {
  map.flyTo([60.609805, 15.621958], 14);
  toggleLayer(polygon);
}
function toggleLine() {
  map.flyTo([60.605098, 15.636281], 17);
  toggleLayer(line);
}

var popupCords = L.popup();

// ---------------------------------------- Task 2 ---------------------------------------- //
//Location data to be maped during task 2
const task2Location = [
  {
    name: "Max Burgers",
    type: "Resturant",
    lat: 60.60437388360507,
    lng: 15.641613826911803,
    location: "Tullkammaregatan 8, 791 31 Falun",
    description:
      "Max Burgers är en svensk snabbmatskedja med hamburgare (kött eller kyckling), vegetariska alternativ och ett varierat sortement av tillbehör (pommes, lökringar, dip m.m). Det erbjuds ofta både drive-thru, digitala beställnings alternativ, samt sittplatser inuti resturangen.",
    img: "/static/maxFalun.jpg",
  },
  {
    name: "McDonalds",
    type: "Resturant",
    lat: 60.609183123862806,
    lng: 15.656669219458408,
    location: "Bataljonsvägen 5, 791 40 Falun",
    description:
      "McDonald’s är en internationell snabbmatskedja som serverar hamburgare, kycklingprodukter och ett brett utbud av tillbehör som pommes frites, nuggets och desserter. Restaurangerna erbjuder ofta både drive‑thru, digitala beställningsskärmar och sittplatser inomhus.",
    img: "/static/mcdonaldsFalun.jpg",
  },
  {
    name: "Subway",
    type: "Resturant",
    lat: 60.60684121356442,
    lng: 15.62732396279977,
    location: "Östra Hamngatan 16, 18, 791 36 Falun",
    description:
      "Subway är en enkel snabbmats kedja med smörgåsar med valrfitt innehåll och sallder som serveras över disk. Det finns en bred variation av pålägg som kykling, kalkon, skinka etc samt allt från sallad, tomater samt mera.Du kan antingen göra den helt egna macka med behåll som må vara unikt och gott för dig själv eller beställa färdig ställda makor som Subway själva har lagt ihop. Priset kan ligga från cirka 75kr up till 200kr beroende på längd, mängd pålägg samt ytterligare erbjudander som kakor, chips etc.",
    img: "/static/subwayFalun.jpg",
  },
  {
    name: "Bastard Burgers",
    type: "Resturant",
    lat: 60.605956029510445,
    lng: 15.633115313816822,
    location: "Åsgatan 25, 791 71 Falun",
    description:
      "En hamburgar restaurang med fokus på svenska råvaror med rötter i Norrland och inspiration från New York. Det finns ett bra urval av olika smashburgers men för de som inte är intresserade i nötkött finns det även ett stort urval av chicken burgers och chicken nuggets. Som vanligt för många hamburgare restauranger kan du såklart få pommes, lökringar, chili cheese och mozarella sticks till maten samt dryck ingår i många menyer.",
    img: "/static/bastardBurgerFalun.jpg",
  },
  {
    name: "Tairyo",
    type: "Resturant",
    lat: 60.60635920288443,
    lng: 15.63291447234441,
    location: "Åsgatan 18, 791 71 Falun",
    description:
      "En japansk restaurang med stor bredd på olika rätter som Sushi, Norimaki. Samt olika små och varmrätter. Det finns även olika val för vegetariska alternativ samt efterätter. Man kan även om man är större sällskap på 6 eller fler kan man prova deras Teppanayaki som är en form av Japansk matlagning som grillas på speciell järnplatta.",
    img: "/static/tairyoFalun.jfif",
  },
];
//Places markers based on task2Location array and adds relevant information to the markers
var markersPointOfIntresstArray = [];
function markersPointOfIntresst() {
  task2Location.forEach(function (location) {
    var marker = L.marker([location.lat, location.lng]);
    marker.on("click", function (e) {
      document.getElementById("sidebar").classList.remove("hidden");
      document.getElementById("sidebar").innerHTML =
        `<img src =${location.img} width="300" height="200">
      <h3 class = "text-center decoration-double font-bold underline top-0">${location.name}</h3>
      <p class = "font-bold">${location.type}</p>
      <p class = "italic">${location.location}</p>
      <hr class="border-dotted border-gray-400 my-4">
      <p class = "italic">${location.description}</p>`;
    });
    markersPointOfIntresstArray.push(marker);
  });
}
// Assist function for handling task2 to avoid repreated generation of array
function task2Handler() {
  map.flyTo([60.607404, 15.645368], 16);
  if (markersPointOfIntresstArray.length === 0) {
    markersPointOfIntresst();
  }
  markersPointOfIntresstArray.forEach(function (marker) {
    toggleLayer(marker);
  });
}

// ---------------------------------------- Task 3 ---------------------------------------- //
var supermarketCircles = [];
var supermarketData = null;
var supermarketLayer = null;
var supermarketVisible = false;
var buffersVisible = false;
var overlapVisible = false;

// Fetches the provided geojsondata and converts it to json for easier handling
async function fetchGeoJsonData(path) {
  const response = await fetch(path);
  const data = await response.json();
  supermarketData = data;
  addGeoJsonData(data);
}
// Makes the geojsondata avalible to other functions and adds name popup
function addGeoJsonData(data) {
  if (supermarketData) {
    supermarketLayer = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      },
    });
  }
}
// Toggles on each supermarket marker
function toggleSupermarkets() {
  map.flyTo([59.803397, 17.569885], 9);
  if (supermarketLayer) {
    toggleLayer(supermarketLayer);
    supermarketVisible = !supermarketVisible;
  }
}
// Toggles the 1km buffer radius on if the supermarket markers are visible
function toggleBuffer() {
  map.flyTo([59.626103, 17.15395], 13);
  if (supermarketVisible && supermarketData) {
    if (!buffersVisible) {
      supermarketData.features.forEach(function (feature) {
        // Storing each points lng/lat since they are reversed in the geoJSON compared to leaflet
        var lng = feature.geometry.coordinates[0];
        var lat = feature.geometry.coordinates[1];
        // Adds 1km radius circle at each marker
        var circle = L.circle([lat, lng], { radius: 1000 }).addTo(map);
        supermarketCircles.push(circle);
      });
      buffersVisible = true;
    } else {
      supermarketCircles.forEach(function (circle) {
        map.removeLayer(circle);
      });
      supermarketCircles = [];
      buffersVisible = false;
    }
  }
}
//Changes the color of the circles based on if the distance between points is greater than 2km
function toggleOverlap() {
  if (supermarketData && buffersVisible) {
    if (!overlapVisible) {
      supermarketData.features.forEach(function (feature, index) {
        var isOverlapping = false;
        var lng1 = feature.geometry.coordinates[0];
        var lat1 = feature.geometry.coordinates[1];
        supermarketData.features.forEach(function (feature2) {
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
      overlapVisible = true;
    } else {
      supermarketCircles.forEach(function (circle) {
        circle.setStyle({ color: "#3388ff" });
      });
      overlapVisible = false;
    }
  }
}

fetchGeoJsonData("/static/Data/supermarket.geojson");

// ---------------------------------------- Task 4 ---------------------------------------- //
imageVisible = false;
//Bounds for image. Hand picked from googlemaps
var bounds = [
  [60.59514843973514, 15.596187294878863],
  [60.60181494883558, 15.619811791293525],
];
img = L.imageOverlay("/static/mineFalun.png", bounds);
// Loads/unloads the image based on state
function toggleStaliteImage() {
  if (!imageVisible) {
    img.addTo(map);
    imageVisible = true;
  } else {
    map.removeLayer(img);
    imageVisible = false;
  }
}

// ---------------------------------------- Task 5 ---------------------------------------- //
var fuelData = null;
var clusterVisible = false;
// Fetches the fuelgeojson and makes it avalible to other functions
async function fetchFuelGeoJson(path) {
  const reponse = await fetch(path);
  const data = await reponse.json();
  fuelData = data;
}
//Empty markerClusterGroup
var markers = L.markerClusterGroup();
//Adds clustergroups based on provided markers
function toggleMarkerClusterGroup() {
  map.flyTo([59.300536, 18.043851], 10);
  if (!clusterVisible) {
    fuelData.features.forEach(function (feature) {
      var lng = feature.geometry.coordinates[0];
      var lat = feature.geometry.coordinates[1];
      var marker = L.marker([lat, lng]).bindPopup(feature.properties.name);
      markers.addLayer(marker);
    });
    clusterVisible = true;
    map.addLayer(markers);
  } else {
    map.removeLayer(markers);
    clusterVisible = false;
    markers = L.markerClusterGroup();
  }
}
donutCluster = null;
var donutVisible = false;
//Adds donutclusters based on provided markers with "Brand" as key
function toggleClusterGroup() {
  map.flyTo([59.300536, 18.043851], 10);
  if (!donutVisible && donutCluster) {
    fuelData.features.forEach(function (feature) {
      var lng = feature.geometry.coordinates[0];
      var lat = feature.geometry.coordinates[1];
      var donutMarker = L.marker([lat, lng], {
        brand: feature.properties.brand,
      }).bindPopup(feature.properties.name);
      donutCluster.addLayer(donutMarker);
    });
    map.addLayer(donutCluster);
    donutVisible = true;
  } else {
    map.removeLayer(donutCluster);
    donutVisible = false;
    //Generates DonutCluster based on pregiven parameters
    generateDonutCluster();
  }
}
// Generates "empty" donutcluster based on provided information
function generateDonutCluster() {
  donutCluster = L.DonutCluster(
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
}

fetchFuelGeoJson("/static/Data/fuel.geojson");
generateDonutCluster();
// ---------------------------------------- HTML Buttons ---------------------------------------- //
// Grabs our sidebar object
var taskbar = document.getElementById("taskbar");
//var varMap = document.getElementById("map");
var sidebarImg = document.getElementById("sidebarImg");
//Smooth transiation for sidebar
function toggleSidebar() {
  taskbar.classList.toggle("translate-x-full");
  taskbar.classList.toggle("translate-x-0");
}
// Removes/Adds a layer based on current state
function toggleLayer(layer) {
  if (map.hasLayer(layer)) {
    map.removeLayer(layer);
  } else {
    map.addLayer(layer);
  }
}
//Builds all the different HTML elements for each task
function buildDefaultView() {
  taskbar.innerHTML = `        
  <button class="absolute -left-5 top-0 z-[2000]" onClick="toggleSidebar()"><img id="sidebarImg" src="/static/hide-sidepanel.png"/></button>
  <button class="w-[90%] bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full" onclick="buildTask1()">Task 1</button>
  <button class="w-[90%] bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full" onclick="buildTask2()">Task 2</button>
  <button class="w-[90%] bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full" onclick="buildTask3()">Task 3</button>
  <button class="w-[90%] bg-purple-500 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded-full" onclick="buildTask4()">Task 4</button>
  <button class="w-[90%] bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full" onclick="buildTask5()">Task 5</button>`;
  taskbar.classList.remove(
    "taskbar-task1",
    "taskbar-task2",
    "taskbar-task3",
    "taskbar-task4",
    "taskbar-task5",
  );
  taskbar.classList.add("taskbar-default");
}

function buildTask1() {
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline">Task 1</h3>
  <button onClick="buildDefaultView()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>
  <button onclick="toggleMarker()" class = "w-[90%] bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">Toggle Point</button>
  <button onclick="togglePolygon()" class = "w-[90%] bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">Toggle Polygon</button>
  <button onclick="toggleLine()" class = "w-[90%] bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">Toggle Line</button>`;
  map.flyTo([60.608289, 15.627966], 13);
  taskbar.classList.remove("taskbar-default");
  taskbar.classList.add("taskbar-task1");
}
function buildTask2() {
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline top-0">Task 2</h3>
  <button onClick="endTask2()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>`;
  task2Handler();

  taskbar.classList.remove("taskbar-default");
  taskbar.classList.add("taskbar-task2");
}
function endTask2() {
  document.getElementById("sidebar").classList.add("hidden");
  task2Handler();
  buildDefaultView();
}
function buildTask3() {
  map.flyTo([59.803397, 17.569885], 9);
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline">Task 3</h3>
  <button onClick="buildDefaultView()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>
  <button onclick="toggleSupermarkets()" class = "w-[90%] bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full">Toggle Supermarkets</button>
  <button onclick="toggleBuffer()" class = "w-[90%] bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full">Toggle 1km Buffer</button>
  <button onclick="toggleOverlap()" class = "w-[90%] bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full">Toggle Overlap</button>`;
  taskbar.classList.remove("taskbar-default");
  taskbar.classList.add("taskbar-task3");
}
function buildTask4() {
  map.flyTo([60.598283, 15.608976], 16);
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline">Task 4</h3>
  <button onClick="buildDefaultView()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>
  <button onclick="toggleStaliteImage()" class = "w-[90%] bg-purple-500 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded-full">Toggle Image</button>`;
  taskbar.classList.remove("taskbar-default");
  taskbar.classList.add("taskbar-task4");
}
function buildTask5() {
  map.flyTo([59.300536, 18.043851], 10);
  taskbar.innerHTML = `<h3 class = "text-center decoration-double font-bold underline">Task 5</h3>
  <button onClick="buildDefaultView()" class = "absolute left-0 top-0 z-[2000] rotate-180"><img src="/static/backArrow.png"/></button>
  <button onclick="toggleMarkerClusterGroup()" class = "w-[95%] bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full">Toggle Marker Cluster</button>
  <button onclick="toggleClusterGroup()" class = "w-[95%] bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full">Toggle Donut Cluter</button>`;
  taskbar.classList.remove("taskbar-default");
  taskbar.classList.add("taskbar-task5");
}
buildDefaultView();

// Helper function to provide cordinates and zoom levels for "flyTo" functions
function mapCordinatesOnClick(e) {
  popupCords
    .setLatLng(e.latlng)
    .setContent(
      "You clicked the map at " +
        e.latlng.toString() +
        "Current Zoom:" +
        map.getZoom(),
    )
    .openOn(map);
}
map.on("click", mapCordinatesOnClick);
