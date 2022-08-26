import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IngredientVolume, UnitMismatch } from './ingredientvolume.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  selectedIngredient: { name: string, amount: IngredientVolume } = null;
  unitError: UnitMismatch = null;

  constructor(public shoppingList:ShoppingListService, private changeDetector: ChangeDetectorRef) { }

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
