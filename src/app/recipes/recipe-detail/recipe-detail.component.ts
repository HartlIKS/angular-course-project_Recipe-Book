import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
}
