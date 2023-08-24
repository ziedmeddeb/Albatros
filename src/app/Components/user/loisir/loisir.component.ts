import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-loisir',
  templateUrl: './loisir.component.html',
  styleUrls: ['./loisir.component.css']
})
export class LoisirComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initMaps();
  }

  initMaps() {
    // Map 1
    var map = L.map('map').setView([36.838452291687126, 11.100939042992563], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([36.838452291687126, 11.100939042992563]).addTo(map)
    .bindPopup('Manége de Kelibia')
    .openPopup();

    // Map 2
    var map2 = L.map('map2').setView([36.8335729592769, 11.11548713838621], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map2);
    
    L.marker([36.8335729592769, 11.11548713838621]).addTo(map2)
        .bindPopup('Café Sidi El Bahri')
        .openPopup();

        // Map 3
    var map3 = L.map('map3').setView([36.83118807218884, 11.058071527832288], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map3);
    
    L.marker([36.83118807218884, 11.058071527832288]).addTo(map3)
        .bindPopup('Café/Restaurant Ouyoun Aliya')
        .openPopup();

         // Map 4
    var map4 = L.map('map4').setView([36.838991566762125, 11.117387248343851], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map4);
    
    L.marker([36.838991566762125, 11.117387248343851]).addTo(map4)
        .bindPopup('Café du Fort')
        .openPopup();

        
         // Map 5
    var map5 = L.map('map5').setView([36.842306809911285, 11.119920251551173], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map5);
    
    L.marker([36.842306809911285, 11.119920251551173]).addTo(map5)
        .bindPopup("Café l'Opéra")
        .openPopup();

         // Map 6
    var map6 = L.map('map6').setView([36.83444081158667, 11.116547889575116], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map6);
    
    L.marker([36.83444081158667, 11.116547889575116]).addTo(map6)
        .bindPopup("Café Mosaïque ")
        .openPopup();

         // Map 7
    var map7 = L.map('map7').setView([36.83254191218458, 11.09233646297361], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map7);
    
    L.marker([36.83254191218458, 11.09233646297361]).addTo(map7)
        .bindPopup("Café Fafa ")
        .openPopup();
  }

}
