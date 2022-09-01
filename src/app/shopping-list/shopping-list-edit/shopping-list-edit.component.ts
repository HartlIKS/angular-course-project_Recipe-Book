import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientVolume, UnitMismatch, units } from '../ingredientvolume.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  ingredient: { name: string, amount: IngredientVolume };

  unitError: UnitMismatch = null;

  units = units;

  private sub: Subscription;

  constructor(private shoppingList: ShoppingListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ingredient = this.route.snapshot.data.ingredient;
    this.sub = this.route.data.subscribe(
      d => {
        this.ingredient = d.ingredient;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onUnitChange(event: any) {
    try{
      this.ingredient.amount.convertTo(event.target.value);
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
