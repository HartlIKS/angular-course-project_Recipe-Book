import { Component, ViewChild } from '@angular/core';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { IngredientVolume } from './shopping-list/ingredientvolume.model';
import { KeyValuePipe } from '@angular/common';

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
