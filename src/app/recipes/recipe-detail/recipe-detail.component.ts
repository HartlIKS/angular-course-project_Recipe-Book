import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import * as RecipeBook from '../store/recipe.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  currentRecipe?: Recipe;
  private sub?: Subscription;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.store.select(state => state.recipes.selected?.recipe).subscribe(
      d => this.currentRecipe = d
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  delete() {
    this.store.dispatch(new RecipeBook.RemoveAction())
    this.router.navigate(["/recipes"]);
  }

  addIngredientsToShoppingList() {
    this.store.dispatch(new RecipeBook.AddToShoppingListAction());
  }
}
