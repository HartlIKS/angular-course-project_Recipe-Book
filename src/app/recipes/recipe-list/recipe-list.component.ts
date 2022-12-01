import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private sub?: Subscription;
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.sub = this.store.select("recipes").subscribe(
      v => this.recipes = v.recipes
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
