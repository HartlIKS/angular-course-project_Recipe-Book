import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientVolume, units } from 'src/app/shopping-list/ingredientvolume.model';
import { Recipe } from '../recipe.model';
import { RecipeBook } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  editing: boolean = false;
  units = units;
  currentRecipe: Recipe;
  private sub: Subscription;

  constructor(public recipeBook: RecipeBook) { }

  ngOnInit(): void {
    this.sub = this.recipeBook.selectedRecipe$.subscribe(
      v => this.currentRecipe = v
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  newIngredient(): void {
    if(this.editing) this.currentRecipe.ingredients.push({name: "New Ingredient", amount: new IngredientVolume(1, "")});
  }
}
