import { Component, Output, EventEmitter } from '@angular/core';
import { IngredientVolume } from 'src/app/shopping-list/ingredientvolume.model';
import { Recipe } from '../recipe.model';
import { RecipeBook } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  constructor(public recipeBook: RecipeBook) {}
}
