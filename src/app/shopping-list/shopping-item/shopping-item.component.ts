import { Component, Input } from '@angular/core';
import { IngredientVolume } from '../ingredientvolume.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent {
  @Input() ingredient: string;
  @Input() amount: IngredientVolume;

  constructor(public shoppingList: ShoppingListService) {}
}
