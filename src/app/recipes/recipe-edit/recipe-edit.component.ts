import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { IngredientVolume, units } from 'src/app/shopping-list/ingredientvolume.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  units = units;
  currentRecipe: Recipe;
  private sub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.data.subscribe(
      d => this.currentRecipe = d.recipe
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  newIngredient(): void {
    this.currentRecipe.ingredients.push({ name: "New Ingredient", amount: new IngredientVolume(1, "") });
  }
}
