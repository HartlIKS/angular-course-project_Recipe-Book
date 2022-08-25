import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { IngredientVolume, UnitMismatch } from '../shopping-list/ingredientvolume.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnChanges {
  @Input() editIngredient: { name: string, amount: IngredientVolume };
  @Input() unitError: UnitMismatch = null;

  name: string;
  amount: number;
  unit: string;

  @Output() onAdd = new EventEmitter<{ name: string, amount: number, unit: string }>();
  @Output() onSet = new EventEmitter<{ ingredient: string, amount: IngredientVolume }>();
  @Output() onDelete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ("editIngredient" in changes) {
      let ingredient: { name: string, amount: IngredientVolume } = changes.editIngredient.currentValue;
      if (ingredient) {
        this.name = ingredient.name;
        this.amount = ingredient.amount.amount;
        this.unit = ingredient.amount.unit;
      }
    }
  }

  public defaultName(): string {
    if (this.editIngredient) return this.editIngredient.name;
    return "";
  }

  public defaultUnit(): string {
    if (this.editIngredient) return this.editIngredient.amount.unit;
    return "";
  }

  public onSubmit(): void {
    if (this.editIngredient) {
      this.onSet.emit({
        ingredient: this.name,
        amount: new IngredientVolume(this.amount, this.unit)
      });
    } else {
      this.onAdd.emit({
        name: this.name,
        amount: this.amount,
        unit: this.unit
      });
    }
  }

  public clearForm(): void {
    this.editIngredient = null;
    this.name = "";
    this.amount = 0;
    this.unit = "";
    this.unitError = null;
  }

  public onDeleteClicked(): void {
    if (this.editIngredient) this.onDelete.emit(this.editIngredient.name);
  }
}
