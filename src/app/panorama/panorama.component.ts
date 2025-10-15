import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, NgZone } from '@angular/core';
// Importamos las clases, pero tiparemos en "any" para evitar choques de d.ts entre v4/v5.
import { Viewer as PSVViewer } from '@photo-sphere-viewer/core';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';
import '@photo-sphere-viewer/core/index.css';

@Component({
  selector: 'app-panorama',
  standalone: true,
  template: `<div #container class="psv-container" [style.aspectRatio]="aspectRatio"></div>`,
  styles: [`
    .psv-container{
      width:100%;max-width:100%;
      aspect-ratio:16/9;border-radius:12px;overflow:hidden;
      box-shadow:0 10px 30px rgba(0,0,0,.25);background:#111;
    }
  `]
})
export class PanoramaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  @Input() src!: string;            // JPG/WEBP equirectangular 2:1
  @Input() caption = '';
  @Input() aspectRatio = '16 / 9';
  @Input() initialZoom = 70;        // rango típico 30–100 (menor = más cerca)

  private viewer: any;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // ------- CONFIG (compatible v4/v5) -------
      const opts: any = {
        container: this.container.nativeElement,
        panorama: this.src,
        caption: this.caption,
        defaultYaw: 0,
        defaultPitch: 0,
        touchmoveTwoFingers: true,
        navbar: ['zoom','move','download','fullscreen','gyroscope'],
        plugins: [
          [GyroscopePlugin as any, { touchmove: true }]
        ],
      };

      // Algunas builds usan defaultFov; si existe en runtime, lo respetamos.
      (opts as any).defaultFov = this.initialZoom;

      // Crear viewer (sin tipos estrictos)
      this.viewer = new (PSVViewer as any)(opts);

      // Si existe setZoom en esta versión, lo usamos; si no, quedará el defaultFov del config.
      const setZoom = (this.viewer as any)?.setZoom;
      if (typeof setZoom === 'function') {
        try { setZoom.call(this.viewer, this.initialZoom); } catch {}
      }

    });
  }

  ngOnDestroy(): void {
    try { this.viewer?.destroy?.(); } catch {}
    this.viewer = undefined;
  }
}