import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientVolume, UnitMismatch, units } from '../ingredientvolume.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements AfterViewInit {
  unitError: UnitMismatch = null;

  units = units;

  private sub: Subscription;

  @ViewChild("reset", {static:false}) resetButton: ElementRef;

  constructor(private shoppingList: ShoppingListService) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.resetButton.nativeElement.click(), 1);
    ;
  }

  public onSubmit(form: NgForm): void {
      try {
        this.shoppingList.add(form.value.name, new IngredientVolume(form.value.amount, form.value.unit));
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
