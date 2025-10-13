import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definimos una interfaz para tipar nuestros datos
interface Project {
  imageSrc: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule], // CommonModule nos da acceso a *ngFor, *ngIf, etc.
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  // Propiedades para manejar el estado del overlay
  isOverlayVisible = false;
  selectedImageSrc: string | null = null;

  // Los datos de los proyectos ahora viven en un arreglo, haciéndolo dinámico
  projects: Project[] = Array.from({ length: 15 }, (_, i) => ({
  imageSrc: `assets/images/monolitos_fotos/${i + 1}.${i + 1 === 15 ? 'png' : 'jpg'}`
}));

  // Método para mostrar el overlay con la imagen seleccionada
  openOverlay(project: Project): void {
    this.selectedImageSrc = project.imageSrc;
    this.isOverlayVisible = true;
  }

  // Método para ocultar el overlay
  closeOverlay(): void {
    this.isOverlayVisible = false;
    this.selectedImageSrc = null; // Limpiamos la imagen seleccionada
  }
}