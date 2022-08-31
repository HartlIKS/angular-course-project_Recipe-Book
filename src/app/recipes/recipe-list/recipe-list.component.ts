import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeBook } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private sub: Subscription;
  constructor(public recipeBook: RecipeBook) {}

  ngOnInit(): void {
    this.sub = this.recipeBook.recipes$.subscribe(
      v => this.recipes = v
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
