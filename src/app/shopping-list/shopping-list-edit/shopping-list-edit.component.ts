import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IngredientVolume, UnitMismatch, units } from '../ingredientvolume.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  private _ingredient: { name: string, amount: IngredientVolume } = null;
  get ingredient() {
    if(!this._ingredient) this._ingredient = {name: "", amount: new IngredientVolume(1, "")};
    return this._ingredient;
  }
  @Input() set editIngredient(ingredient: {name: string, amount: IngredientVolume}) {
    this._ingredient = ingredient;
    this.isEditing = !!ingredient;
  }
  isEditing: boolean;

  unitError: UnitMismatch = null;

  units = units;

  constructor(private shoppingList:ShoppingListService) { }

  public onSubmit(): void {
    if (!this.isEditing) {
      try{
        this.shoppingList.add(this.ingredient.name, this.ingredient.amount);
        this.clearForm();
      } catch(error) {
        if(error instanceof UnitMismatch) {
          this.unitError = error;
        } else {
          throw error;
        }
      }
    } else {
      this.clearForm();
    }
  }

  public clearForm(): void {
    this._ingredient = null;
    this.isEditing = false;
  }

  public onDeleteClicked(): void {
    if (this.isEditing) {
      this.shoppingList.remove(this.ingredient.name);
    }
    this.clearForm();
  }
}
