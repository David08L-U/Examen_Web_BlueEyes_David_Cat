import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search/search';
import {BlueEyesComponent} from './components/blue-eyes/blue-eyes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchComponent, BlueEyesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('blue-eyes-explorer');
}
