import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientVolume, UnitMismatch, units } from '../ingredientvolume.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements AfterViewInit {
  private _ingredient: { name: string, amount: IngredientVolume } = null;
  get ingredient() {
    if (!this._ingredient) this._ingredient = { name: "", amount: new IngredientVolume(1, "") };
    return this._ingredient;
  }

  unitError: UnitMismatch = null;

  units = units;

  private sub: Subscription;

  @ViewChild("reset", {static:false}) resetButton: ElementRef;

  constructor(private shoppingList: ShoppingListService) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.resetButton.nativeElement.click(), 1);
    ;
  }

  public onSubmit(): void {
      try {
        this.shoppingList.add(this.ingredient.name, this.ingredient.amount);
        this._ingredient = null;
        this.resetButton.nativeElement.click();
      } catch (error) {
        if (error instanceof UnitMismatch) {
          this.unitError = error;
        } else {
          throw error;
        }
      }
  }
}
