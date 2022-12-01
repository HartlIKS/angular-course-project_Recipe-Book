import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { UnitMismatch, units } from '../ingredientvolume.model';
import * as ShoppingList from '../store/shopping-list.action';


@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements AfterViewInit, OnInit, OnDestroy {
  unitError?: UnitMismatch;

  units = units;

  private sub?: Subscription;

  @ViewChild("reset", { static: false }) resetButton: ElementRef;

  constructor(private store: Store<AppState>) { }

  public ngAfterViewInit(): void {
    setTimeout(() => this.resetButton.nativeElement.click(), 1);
    ;
  }

  public ngOnInit(): void {
    this.sub = this.store.select("shoppingList").subscribe(
      v => this.unitError = v.conversionError
    )
  }

  public ngOnDestroy(): void {
    this.sub!.unsubscribe();
  }

  public onSubmit(form: NgForm): void {
    this.store.dispatch(new ShoppingList.AddAction({
      [form.value.name]: {
        amount: form.value.amount,
        unit: form.value.unit,
      },
    }));
    this.resetButton.nativeElement.click();
  }
}
