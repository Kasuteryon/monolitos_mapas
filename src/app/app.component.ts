import { Component, inject } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})

export class AppComponent {
  private analytics = inject(Analytics);
  title = 'bosque-app';
}
