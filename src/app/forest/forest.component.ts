import { Component } from '@angular/core';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.scss'],
})
export class ForestComponent {
  trees = Array.from({ length: 20 }, () => ({
    x: Math.random() * 400,
    y: 200 + Math.random() * 200,
  }));
}
