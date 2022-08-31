import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeBook } from '../recipe.service';
import { IngredientVolume, units } from 'src/app/shopping-list/ingredientvolume.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  units = units;
  private recipes: Recipe[];
  private id: number;
  currentRecipe: Recipe;
  private subs: Subscription[] = [];

  constructor(public recipeBook: RecipeBook, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.id;
    this.recipes = this.recipeBook.getCurrentRecipes();
    this.subs.push(this.route.params.subscribe(
      v => {
        this.id = +v.id;
        this.currentRecipe = this.recipes[this.id];
        if(!this.currentRecipe) this.router.navigate(["/recipes"]);
      }
    ));
    this.subs.push(this.recipeBook.recipes$.subscribe(
      v => {
        this.recipes = v;
        this.currentRecipe = this.recipes[this.id];
        if(!this.currentRecipe) this.router.navigate(["/recipes"]);
      }
    ));
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }

  newIngredient(): void {
    this.currentRecipe.ingredients.push({ name: "New Ingredient", amount: new IngredientVolume(1, "") });
  }
}
