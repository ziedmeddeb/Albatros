import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.initMaps();
  }

  initMaps() {
  var map = L.map('map').setView([36.88596000311773, 11.117726886237463], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([36.88596000311773, 11.117726886237463]).addTo(map)
    .bindPopup('Résidence Albatros')
    .openPopup();
}

}
