import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeBook } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  constructor(public recipeBook: RecipeBook) {}
}
