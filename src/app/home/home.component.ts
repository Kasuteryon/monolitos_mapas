import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  trees = Array.from({ length: 15 }, () => ({
    x: Math.random() * 400,
    y: 300 + Math.random() * 100,
  }));

  constructor(private router: Router) {}

  navigateToForest(): void {
    this.router.navigate(['/forest']);
  }
}
