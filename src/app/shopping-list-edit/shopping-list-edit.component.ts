import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IngredientVolume, UnitMismatch } from '../shopping-list/ingredientvolume.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  _ingredient: { name: string, amount: IngredientVolume };
  get ingredient() {
    if(!this._ingredient) this._ingredient = {name: "", amount: new IngredientVolume(0, "")};
    return this._ingredient;
  }
  @Input() set editIngredient(ingredient: {name: string, amount: IngredientVolume}) {
    this._ingredient = ingredient;
    this.isEditing = !!ingredient;
  }
  isEditing: boolean;
  @Input() unitError: UnitMismatch = null;

  @Output() onAdd = new EventEmitter<{ name: string, amount: IngredientVolume }>();
  @Output() onSet = new EventEmitter<{ name: string, amount: IngredientVolume }>();
  @Output() onDelete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.isEditing) {
      this.onSet.emit(this.ingredient);
    } else {
      this.onAdd.emit(this.ingredient);
    }
    this.clearForm();
  }

  public clearForm(): void {
    this._ingredient = null;
    this.isEditing = false;
  }

  public onDeleteClicked(): void {
    if (this.isEditing) this.onDelete.emit(this.ingredient.name);
    this.clearForm();
  }
}
