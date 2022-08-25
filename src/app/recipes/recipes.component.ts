import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { IngredientVolume } from '../shopping-list/ingredientvolume.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe = null;
  @Output() addToShoppingList = new EventEmitter<{[property: string]: IngredientVolume}>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSelectionChange(event: Recipe): void {
    this.selectedRecipe = event;
  }

  handleAddToShoppingList(ingredients: {[property: string]: IngredientVolume}): void {
    this.addToShoppingList.emit(ingredients);
  }
}
