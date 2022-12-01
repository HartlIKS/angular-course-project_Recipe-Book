import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { IngredientVolume, UnitMismatch, units, convertable } from '../ingredientvolume.model';
import * as ShoppingList from '../store/shopping-list.action';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy, AfterViewInit {
  ingredient?: { name: string, amount: IngredientVolume };

  unitError?: UnitMismatch = null;

  units = units;

  @ViewChild('form', { static: true, read: NgForm }) unitForm: NgForm;

  private sub?: Subscription;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.store.select("shoppingList").subscribe(
      d => {
        this.ingredient = d.selected;
        this.unitError = d.conversionError;
        if (this.ingredient) setTimeout(() => this.unitForm.setValue({
          amount: this.ingredient.amount.amount,
          unit: this.ingredient.amount.unit
        }), 0);
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.unitForm.setValue({
      amount: this.ingredient.amount.amount,
      unit: this.ingredient.amount.unit
    }), 0);
  }

  ngOnDestroy(): void {
    this.sub!.unsubscribe();
  }

  public isConvertable(from: string, to: string): boolean {
    return convertable(from, to);
  }

  public onSubmit(form: NgForm) {
    this.store.dispatch(new ShoppingList.SetAction(form.value));
    this.router.navigate(["/shoppingList"]);
  }

  public onUnitChange(form: NgForm) {
    this.store.dispatch(new ShoppingList.ConvertAction(form.value.unit));
  }

  public onDeleteClicked(): void {
    this.store.dispatch(new ShoppingList.RemoveAction());
  }
}
