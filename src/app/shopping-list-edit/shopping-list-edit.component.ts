import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IngredientVolume, UnitMismatch, units } from '../shopping-list/ingredientvolume.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  _ingredient: { name: string, amount: IngredientVolume } = null;
  get ingredient() {
    if(!this._ingredient) this._ingredient = {name: "", amount: new IngredientVolume(1, "")};
    return this._ingredient;
  }
  @Input() set editIngredient(ingredient: {name: string, amount: IngredientVolume}) {
    this._ingredient = ingredient;
    this.isEditing = !!ingredient;
  }
  isEditing: boolean;

  units = units;

  @Input() unitError: UnitMismatch = null;

  @Output() onAdd = new EventEmitter<{ name: string, amount: IngredientVolume }>();
  @Output() onSet = new EventEmitter<{ name: string, amount: IngredientVolume }>();
  @Output() onDelete = new EventEmitter<string>();

  constructor(private shoppingList:ShoppingListService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.isEditing) {
      this.onSet.emit(this.ingredient);
    } else {
      this.shoppingList.add(this.ingredient.name, this.ingredient.amount);
      this.onAdd.emit(this.ingredient);
    }
    this.clearForm();
  }

  public clearForm(): void {
    this._ingredient = null;
    this.isEditing = false;
  }

  public onDeleteClicked(): void {
    if (this.isEditing) {
      this.shoppingList.remove(this.ingredient.name);
      this.onDelete.emit(this.ingredient.name);
    }
    this.clearForm();
  }
}
