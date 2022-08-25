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

  public onAddIngredient(event: { name: string, amount: IngredientVolume }): void {
    if (this.ingredients[event.name]) {
      if (this.ingredients[event.name].unit != event.amount.unit) {
        this.unitError = new UnitMismatch(this.ingredients[event.name].unit, event.amount.unit);
      } else {
        this.ingredients[event.name].amount += event.amount.amount;
      }
    } else {
      this.ingredients[event.name] = event.amount;
    }
  }

  public onChangeIngredientAmount(event: { name: string, amount: IngredientVolume }): void {
    this.ingredients[event.name] = event.amount;
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

  public getUnit(ingredient: string): string {
    return this.ingredients[ingredient]?.unit;
  }
}
