import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IngredientVolume } from 'src/app/shopping-list/ingredientvolume.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe : Recipe;

  constructor(private shoppingList:ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredients(): void {
    this.shoppingList.addAll(this.recipe.ingredients);
  }
}
