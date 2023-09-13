const API_KEY = "at_082QGircGHc2SwIeg9mxBchYxW1ir";
// const IP_API_URL = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}`;
const IP_API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

// https://geo.ipify.org/api/v2/country,city?apiKey=at_082QGircGHc2SwIeg9mxBchYxW1ir&ipAddress=8.8.8.8
const button = document.getElementById("btn");
const ip_address = document.querySelector(".ip-address");
const region = document.querySelector(".ip-location");
const timezone = document.querySelector(".ip-timezone");
const isp = document.querySelector(".ip-isp");
let lat;
let lng;

// draw a map

const map = L.map("map");

function _geolocation(lat, lng) {
  if (lat == undefined && lng == undefined) {
    return true;
  }
}

function initMap() {
  var markerIcon = L.icon({
    iconUrl: "./images/icon-location.svg",

    iconSize: [46, 56], // size of the icon
    iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
  });

  map.setView([lat, lng], 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: false,
  }).addTo(map);

  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}

const getUrl = (data) => {
  const API_URL = "https://geo.ipify.org/api/v1?apiKey=";
  const ip = data.slice();
  const domain = data.slice();
  const ipSplit = ip.split(".").map((element) => Number(element));
  const maxLength = ipSplit.every((currentValue) => currentValue <= 255);

  if (maxLength && ipSplit.length == 4) {
    return `${API_URL}${API_KEY}&ipAddress=${ip}`;
  } else {
    return `${API_URL}${API_KEY}&ipAddress=${domain}`;
  }
};

async function getData(input_data = null) {
  // try {
  const URL = getUrl(input_data);
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data, "result data");

  if ("as" in data) {
    lat = data.location.lat;
    lng = data.location.lng;

    ip_address.textContent = data.ip;
    region.textContent = `${data.location.city}, ${data.location.country} ${data.as.asn}`;
    timezone.textContent = `UTC ${data.location.timezone}`;
    isp.textContent = `${data.isp}`;

    if (!_geolocation(lat, lng)) {
      initMap();
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const ip_input = formData.get("ip_input");
  console.log(ip_input, "user input");
  // const ip = ip_input.slice();
  // const ipSplit = ip.split(".").map((element) => Number(element));
  // const maxLength = ipSplit.every((currentValue) => currentValue <= 255);

  // if (maxLength && ipSplit.length == 4) {
  //   getData(ip);
  // } else getData(ip=ip_input);

  getData(ip_input);
});

if (_geolocation(lat, lng)) {
  getData("").then(() => {
    initMap();
  });
}
