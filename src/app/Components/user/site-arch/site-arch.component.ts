import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-site-arch',
  templateUrl: './site-arch.component.html',
  styleUrls: ['./site-arch.component.css']
})
export class SiteArchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initMaps();
  }

  initMaps() {
    // Map 1
    var map = L.map('map').setView([37.05939899749472, 10.9966804658142], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([37.05939899749472, 10.9966804658142]).addTo(map)
    .bindPopup('Grottes El Haouaria')
    .openPopup();

    // Map 2
    var map2 = L.map('map2').setView([36.94775097484869, 11.098713780719374], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map2);
    
    L.marker([36.94775097484869, 11.098713780719374]).addTo(map2)
        .bindPopup('Le musée de Kerkouane')
        .openPopup();

        // Map 3
    var map3 = L.map('map3').setView([36.83780029878207, 11.11565360584503], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map3);
    
    L.marker([36.83780029878207, 11.11565360584503]).addTo(map3)
        .bindPopup('Le fort de Kélibia')
        .openPopup();
  }

}
