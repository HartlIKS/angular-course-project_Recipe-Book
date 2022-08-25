import { Component, OnInit } from '@angular/core';
import { IngredientVolume, UnitMismatch } from './ingredientvolume.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: { [property: string]: IngredientVolume } = {};
  selectedIngredient: { name: string, amount: IngredientVolume } = null;
  unitError: UnitMismatch = null;

  constructor() { }

  ngOnInit(): void {
  }

  public onAddIngredient(event: { name: string, amount: number, unit: string }): void {
    if (this.ingredients[event.name]) {
      if (this.ingredients[event.name].unit != event.unit) {
        this.unitError = new UnitMismatch(this.ingredients[event.name].unit, event.unit);
      } else {
        this.ingredients[event.name].amount += event.amount;
      }
    } else {
      this.ingredients[event.name] = new IngredientVolume(event.amount, event.unit);
    }
  }

  public onChangeIngredientAmount(event: { ingredient: string, amount: IngredientVolume }): void {
    this.ingredients[event.ingredient] = event.amount;
    this.selectedIngredient = null;
  }

  public onDeleteIngredient(event: string): void {
    delete this.ingredients[event];
    this.selectedIngredient = null;
  }

  public selectIngredient(ingredient: string) {
    this.selectedIngredient = {
      name: ingredient,
      amount: this.ingredients[ingredient]
    };
  }
}
