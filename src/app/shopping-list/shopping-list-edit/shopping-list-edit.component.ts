import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientVolume, UnitMismatch, units, convertable } from '../ingredientvolume.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy, AfterViewInit {
  ingredient: { name: string, amount: IngredientVolume };

  unitError: UnitMismatch = null;

  units = units;

  @ViewChild('form', {static: true, read: NgForm}) unitForm: NgForm;

  private sub: Subscription;

  constructor(private shoppingList: ShoppingListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ingredient = this.route.snapshot.data.ingredient;
    this.sub = this.route.data.subscribe(
      d => {
        this.ingredient = d.ingredient;
        this.unitForm.value.unit = this.ingredient.amount.unit;
        this.unitForm.value.amount = this.ingredient.amount.amount;
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
    this.sub.unsubscribe();
  }

  public isConvertable(from: string, to:string): boolean {
    return convertable(from, to);
  }

  public onSubmit(form: NgForm) {
    this.ingredient.amount = form.value.amount;
    this.router.navigate([".."], {relativeTo: this.route});
  }

  public onUnitChange(form: NgForm) {
    try{
      this.ingredient.amount.convertTo(form.value.unit);
      form.value.amount = this.ingredient.amount;
      this.unitError = null;
    } catch(error) {
      if(error instanceof UnitMismatch) {
        this.unitError = error;
      } else {
        throw error;
      }
    }
  }

  public onDeleteClicked(): void {
    this.shoppingList.remove(this.ingredient.name);
    this.router.navigate([".."], {relativeTo: this.route});
  }
}
