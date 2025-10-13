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
  projects: Project[] = [
    { imageSrc: 'https://images.unsplash.com/photo-1519211975560-4ca611f5a72a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6ae34625b8db390fb2b784800d76d225&auto=format&fit=crop&w=700&q=80'},
    { imageSrc: 'https://images.unsplash.com/photo-1521104955835-ba91c70d6443?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=38cdeda7d073c4b6d47a5776f184cba9&auto=format&fit=crop&w=700&q=80' },
    { imageSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5a31d03ddee66863a599421f792e07b&auto=format&fit=crop&w=700&q=80' },
    { imageSrc: 'https://images.unsplash.com/photo-1472437774355-71ab6752b434?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dd4d735954f33290fbf984e4eb7abe32&auto=format&fit=crop&w=700&q=80'},
    { imageSrc: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7c5008952226f48ed4bf5d3ea64ff545&auto=format&fit=crop&w=700&q=80' },
    { imageSrc: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?ixlib=rb-0.3.5&s=a4b3dc4bee43da458f6aa5c05be6bfc4&auto=format&fit=crop&w=700&q=80'},
    { imageSrc: 'https://images.unsplash.com/photo-1481762554390-ff5562748bdf?ixlib=rb-0.3.5&s=1b7f850b7f8f702e237b0f81c0ec0bf5&auto=format&fit=crop&w=700&q=80' },
    { imageSrc: 'https://images.unsplash.com/photo-1463620695885-8a91d87c53d0?ixlib=rb-0.3.5&s=e5bf2f64858b8abe2a386b0c6df594e4&auto=format&fit=crop&w=700&q=80' }
  ];

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