import { Component, Output, EventEmitter } from '@angular/core';
import { IngredientVolume } from 'src/app/shopping-list/ingredientvolume.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [new Recipe("Ratatouille", "https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066", "bla")];
  @Output() selectionChange = new EventEmitter<Recipe>();

  constructor() {
    this.recipes[0].ingredients["Aubergine"]=new IngredientVolume(1, "");
  }

  public selectRecipe(index:number): void {
    this.selectionChange.emit(this.recipes[index] || null);
  }
}
