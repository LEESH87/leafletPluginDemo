import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customLayer from './customLayer';

const seoul = [37.5642135, 127.0016985];
let map = L.map('map').setView(seoul, 11).panBy([0, -25]);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

customLayer({point: seoul}).addTo(map);