import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { IngredientVolume } from './ingredientvolume.model';
import * as ShoppingList from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  items: {[ingredient: string]: IngredientVolume} = {};
  private sub: Subscription;
  hasSelected: boolean = false;

  constructor(public store:Store<AppState>) { }

  ngOnInit(): void {
    this.sub = this.store.select("shoppingList").subscribe(
      v => {
        this.items = v.ingredients;
        this.hasSelected = !!v.selected;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public deselectIngredient(): void {
    this.store.dispatch(new ShoppingList.DeselectAction());
  }

  public selectIngredient(ingredient: string) {
    this.store.dispatch(new ShoppingList.SelectAction(ingredient));
  }
}
