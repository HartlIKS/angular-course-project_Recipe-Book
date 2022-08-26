import { Component } from '@angular/core';
import { IngredientVolume, units } from 'src/app/shopping-list/ingredientvolume.model';
import { RecipeBook } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  editing: boolean = false;
  units = units;

  constructor(public recipeBook: RecipeBook) { }

  newIngredient(): void {
    if(this.editing) this.recipeBook.selectedRecipe.ingredients.push({name: "New Ingredient", amount: new IngredientVolume(1, "")});
  }
}
