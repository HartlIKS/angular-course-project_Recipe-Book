import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { IngredientVolume } from './ingredientvolume.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  items: {[ingredient: string]: IngredientVolume};
  private sub: Subscription;
  selectedIngredient: { name: string, amount: IngredientVolume } = null;

  constructor(public shoppingList:ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.shoppingList.items$.subscribe(
      v => this.items = v
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public deselectIngredient(): void {
    this.selectedIngredient = null;
  }

  public selectIngredient(ingredient: string) {
    this.selectedIngredient = {
      name: ingredient,
      amount: this.items[ingredient]
    };
  }
}
