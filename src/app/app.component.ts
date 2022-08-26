import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabs: { [id: string]: string } = {
    'recipes': 'Recipes',
    'shopping': 'Shopping List'
  };
  page: string = Object.keys(this.tabs)[0];
}
