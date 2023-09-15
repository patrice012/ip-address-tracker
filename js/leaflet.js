const API_KEY = "at_082QGircGHc2SwIeg9mxBchYxW1ir";
const API_URL = "https://geo.ipify.org/api/v1?apiKey=";

const button = document.getElementById("btn");
const ip_address = document.querySelector(".ip-address");
const region = document.querySelector(".ip-location");
const timezone = document.querySelector(".ip-timezone");
const isp = document.querySelector(".ip-isp");
const err = document.querySelector(".error");
const err_msg = document.querySelector(".error--msg");
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
  const ip = data.slice();
  const domain = data.slice();
  const ipSplit = ip.split(".").map((element) => Number(element));
  const maxLength = ipSplit.every((currentValue) => currentValue <= 255);

  if (maxLength && ipSplit.length == 4) {
    return `${API_URL}${API_KEY}&ipAddress=${ip}`;
  } else {
    return `${API_URL}${API_KEY}&ipAddress=${ip}&domain=${domain}`;
  }
};

function removeSkeleton() {
  ip_address.classList.remove("skeleton");
  region.classList.remove("skeleton");
  timezone.classList.remove("skeleton");
  isp.classList.remove("skeleton");
}

function addSkeleton() {
  ip_address.classList.add("skeleton");
  region.classList.add("skeleton");
  timezone.classList.add("skeleton");
  isp.classList.add("skeleton");
  ip_address.textContent = "";
  region.textContent = "";
  isp.textContent = "";
  timezone.textContent = "";
}

function delayRemove(html_element) {
  setTimeout(() => {
    html_element.style.display = "None";
  }, 5000);
}

function toggleError(msg = "") {
  err.style.display = "grid";
  err_msg.textContent = `${msg}`;
  delayRemove(err);
}

addSkeleton();

async function getData(input_data = null) {
  const URL = getUrl(input_data);
  const response = await fetch(URL);
  const data = await response.json();

  if (!response.ok) {
    toggleError((msg = `${input_data} not found`));
  }
  if ("as" in data) {
    removeSkeleton();

    lat = data.location.lat;
    lng = data.location.lng;

    ip_address.textContent = data.ip;
    region.textContent = `${data.location.city}, ${data.location.country} ${data.as.asn}`;
    timezone.textContent = `UTC ${data.location.timezone}`;
    isp.textContent = `${data.isp}`;

    if (!_geolocation(lat, lng)) {
      initMap();
    }
  } else {
    addSkeleton();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const ip_input = formData.get("ip_input");
  document.getElementById("form").reset();

  getData(ip_input).catch((err) => toggleError(err));
});

if (_geolocation(lat, lng)) {
  getData("")
    .then(() => initMap())
    .catch((err) => toggleError(err));
}
