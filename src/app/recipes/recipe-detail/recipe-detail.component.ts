import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IngredientVolume } from 'src/app/shopping-list/ingredientvolume.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe : Recipe;
  @Output() addToShoppingList = new EventEmitter<{[property: string]: IngredientVolume}>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredients(): void {
    this.addToShoppingList.emit(this.recipe.ingredients);
  }
}
