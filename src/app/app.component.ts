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
  page: string;
  @ViewChild(ShoppingListComponent, {read:ShoppingListComponent, static:false}) shoppingList: ShoppingListComponent;

  addToShoppingList(ingredients: {[property: string]: IngredientVolume}): void {
    for(let keyval of Object.entries(ingredients)) {
      this.shoppingList.onAddIngredient({
        name: keyval[0],
        amount: keyval[1].amount,
        unit: keyval[1].unit
      });
    }
  }
}
