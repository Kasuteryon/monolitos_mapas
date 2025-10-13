import { Component, HostListener, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

declare var Reveal: any;

@Component({
  selector: 'app-home',
  standalone: true, // This confirms it's a standalone component
  imports: [PortfolioComponent], // For standalone, dependencies go here if needed
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // This is correct for allowing <model-viewer>
})



export class HomeComponent implements AfterViewInit {

  // HostListener is the Angular way to listen for events like scrolling
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const value = window.scrollY;

    // Helper function to safely apply styles
    const styleElement = (id: string, styles: { [key: string]: string }) => {
      const element = document.getElementById(id);
      if (element) {
        Object.assign(element.style, styles);
      }
    };

    // Parallax effects
    styleElement('text', { top: `${50 + value * -0.2}%` });
    styleElement('cloud', { left: `${value * 2}px` });
    styleElement('bird1', { top: `${value * 0.1}px`, left: `${value * 1}px` });
    styleElement('bird2', { top: `${value * -0.1}px`, left: `${value * -2}px` });
    styleElement('explore', { marginTop: `${value * 1.5}px` });
    styleElement('rocks', { top: `${value * -0.14}px` });
    styleElement('forest', { top: `${value * 0.4}px` });
    styleElement('sky', { top: `${value * 0.25}px` });
    styleElement('mountains', { top: `${value * 0.25}px` });
  }

  // Your link function can remain
  openlink(url: string): void {
    window.open(url, "_blank");
  }

   ngAfterViewInit(): void {
    Reveal.initialize({
      embedded: true, 
      hash: true, // Permite enlazar a slides específicas
      center: false, // Alinea el contenido a la izquierda, mejor para párrafos
      autoSlide: 5000, // Cambia de slide cada 5 segundos
      loop: true, // Vuelve al inicio al terminar
      transition: 'convex', // Efecto de transición
      width: "100%",
      margin: 0,
    });
  }
}