const API_KEY = "at_082QGircGHc2SwIeg9mxBchYxW1ir";
// const IP_API_URL = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}`;
const IP_API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

// https://geo.ipify.org/api/v2/country,city?apiKey=at_082QGircGHc2SwIeg9mxBchYxW1ir&ipAddress=8.8.8.8
const button = document.getElementById("btn");
const ip_address = document.querySelector(".ip-address");
const region = document.querySelector(".ip-location");
const timezone = document.querySelector(".ip-timezone");
const isp = document.querySelector(".ip-isp");



// draw a map

const map = L.map("map");
const marker = L.marker([0, 0]).addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);



function displayMap(lat, lng) {
  console.log('e')
  map.setView([lat, lng], 18);
  map.setLatLng([lat, lng]);
}







// ===================================

(function () {
  const res = fetch(`${IP_API_URL}`, { method: "GET" })
    .then((res) => res.json())
    .catch(() => console.error("Request failed"));

  res
    .then((res) => {
      const lat = res.location.lat;
      const lng = res.location.lng;

      ip_address.textContent = res.ip;
      region.textContent = res.location.region + ', ' + res.location.city ;
      timezone.textContent = `UTC ${res.location.timezone}`;
      isp.textContent = res.isp;

      displayMap(lat, lng);
    })
    .catch(() => console.error("Ip request failed"));
})();
