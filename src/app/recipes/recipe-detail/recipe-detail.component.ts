import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeBook } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  currentRecipe: Recipe;
  private sub: Subscription;

  constructor(private recipeBook: RecipeBook, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.data.subscribe(
      d => this.currentRecipe = d.recipe
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  delete() {
    this.recipeBook.delete(this.currentRecipe);
    this.router.navigate(["/recipes"]);
  }

  addIngredientsToShoppingList() {
    this.recipeBook.addIngredientsToShoppingList(this.currentRecipe);
  }
}
