import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from "@angular/google-maps";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [GoogleMapsModule, CommonModule, MapInfoWindow, MapMarker]
})
export class HomeComponent implements OnInit {
  constructor() {}

  center: google.maps.LatLngLiteral = { lat: 21.604666, lng: -101.011743 }; // Centro inicial
  zoom = 6;

  options: google.maps.MapOptions = {
    mapId: "MEXICO MAP",
    center: this.center,
    zoom: this.zoom,
    mapTypeId: 'satellite'
  };

   // Coordenadas simplificadas del polígono de Michoacán
   polygonCoords: google.maps.LatLngLiteral[] = [
    { lat: 19.8554, lng: -102.0283 },
    { lat: 19.4201, lng: -103.1210 },
    { lat: 18.9857, lng: -102.7427 },
    { lat: 18.4405, lng: -102.0409 },
    { lat: 17.9758, lng: -102.1687 },
    { lat: 18.8742, lng: -100.9756 },
    { lat: 19.7388, lng: -100.9526 },
    { lat: 19.8554, lng: -102.0283 }
  ];

  // Opciones de estilo para el polígono
  polygonOptions: google.maps.PolygonOptions = {
    fillColor: '#FFFFFF',
    fillOpacity: 0.3,
    strokeColor: '#FFFFFF',
    strokeOpacity: 0.8,
    strokeWeight: 2
  };

  markers = [
    {
      position:  { lat: 18.908020, lng: -101.433568}, // Coordenadas del marcador 1
      title: 'RA',
      icon: {
        url:`data:image/svg+xml;utf-8,
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <circle cx="20" cy="20" r="18" fill="white" stroke="green" stroke-width="4"/>
        <text x="50%" y="55%" text-anchor="middle" font-size="12" font-family="Arial" fill="green" font-weight="bold">RA</text>
      </svg>`
      }
    },
    {
      position: { lat: 19.038017, lng: -101.715929 }, // Coordenadas del marcador 2
      title: 'Video',
      icon: {
        url:  `data:image/svg+xml;utf-8,
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <circle cx="20" cy="20" r="18" fill="white" stroke="green" stroke-width="4"/>
        <path d="M14 12 h8 v16 h-8 z M22 16 l8 4 l-8 4 z" fill="green"/>
      </svg>`
      }
    }
  ];

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  // Al hacer click en el polígono
  onPolygonClick() {
    this.center = { lat: 18.939650, lng: -101.623047 }; // Coordenadas del zoom
    this.zoom = 12; // Zoom más cercano
  }

  // Al hacer click en un marcador
  onMarkerClick(markerType: string) {
    if (markerType === 'RA') {
      this.openARModel();
    } else if (markerType === 'Video') {
      this.open360Image();
    }
  }

  // Abrir modelo en AR usando la API nativa de Android/iOS
  openARModel() {
    const arModelURL = 'https://github.com/KhronosGroup/glTF-Sample-Models/blob/main/2.0/Duck/glTF-Binary/Duck.glb?raw=true'; // URL de tu modelo GLB/GLTF
    const aTag = document.createElement('a');
    aTag.setAttribute('rel', 'ar'); // Indica a los dispositivos que es un modelo de AR
    aTag.href = arModelURL;

    if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
      // iOS: Mostrar modelo en .usdz
      aTag.href = 'https://developer.apple.com/augmented-reality/quick-look/models/pancakes/pancakes.usdz';
    }
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
  }

  // Abrir imagen 360° en un modal
  open360Image() {
    const imageUrl = 'https://github.com/Experience-Monks/360-image-viewer/blob/master/demo/pano_4096.jpg?raw=true';
    window.open(imageUrl, '_blank', 'width=800,height=600');
  }

  ngOnInit(): void {
    this.loadExternalJavaScript();
  }

  private loadExternalJavaScript(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      // Select the class bubble
time = document.getElementsByClassName('bubbles')[0];

// padding values for desktop
var fish2move = 100;
var fish3move = 900;
var fish4move = 1200;

if (screen.width < 400) {

    //Change transformation duration and translatey for mobile view
    time.style.setProperty('--transform-duration', '15s')
    time.style.setProperty('--transform-y', '-700vh')

    // padding values for mobile
    fish2move = 1680;
    fish3move = 3000;
    fish4move = 4300;
}



window.addEventListener('scroll', function () {

    let value = window.scrollY;   //Get Scroll Value (Mobile - High)

    text.style.top = 50 + value * -0.2 + '%';
    cloud.style.left = value * 2 + 'px';

    bird1.style.top = value * 0.1 + 'px';
    bird1.style.left = value * 1 + 'px';

    bird2.style.top = value * -0.1 + 'px';
    bird2.style.left = value * -2 + 'px';

    explore.style.marginTop = value * 1.5 + 'px';

    rocks.style.top = value * -0.14 + 'px';

    forest.style.top = value * 0.4 + 'px';
    sky.style.top = value * 0.25 + 'px';
    mountains.style.top = value * 0.25 + 'px';

    header.style.top = value * 0.7 + 'px';
    sun.style.top = value * 1 + 'px';

    //To prevent splash to move above sea water
    if (value < 380) {
        splash.style.top = 20 + value * -0.3 + 'px';
    }

    //Move fishes horizontally
    fish1.style.right = (value - 100) * 1 + 'px';
    fish2.style.left = (value - fish2move) * 1 + 'px';
    fish3.style.right = (value - fish3move) * 1 + 'px';
    fish4.style.left = (value - fish4move) * 1 + 'px';
})


// Contains the link for all social media handles
var links = document.getElementsByClassName("social-media");

links[0].addEventListener("click", () => { openlink(1) });
links[1].addEventListener("click", () => { openlink(2) });
links[2].addEventListener("click", () => { openlink(3) });
links[3].addEventListener("click", () => { openlink(4) });

function openlink(x) {
    if (x == 1) {
        window.open("https://www.instagram.com/_.vini._02_/", "_blank");
    }
    if (x == 2) {
        window.open("https://www.linkedin.com/in/vineet-kumar-gupta-2833ab196/", "_blank");
    }
    if (x == 3) {
        window.open("https://github.com/VineetKumar02", "_blank");
    }
    if (x == 4) {
        window.open("https://vineet-portfolio-site.netlify.app/", "_blank");
    }
}
    `;
    document.body.appendChild(script);
  }
}
