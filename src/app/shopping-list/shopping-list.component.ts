import { Component } from '@angular/core';
import { IngredientVolume } from './ingredientvolume.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  selectedIngredient: { name: string, amount: IngredientVolume } = null;

  constructor(public shoppingList:ShoppingListService) { }

  public deselectIngredient(): void {
    this.selectedIngredient = null;
  }

  public selectIngredient(ingredient: string) {
    this.selectedIngredient = {
      name: ingredient,
      amount: this.shoppingList.items[ingredient]
    };
  }
}
