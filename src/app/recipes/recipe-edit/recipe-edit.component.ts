import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { IngredientVolume, units } from 'src/app/shopping-list/ingredientvolume.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

import * as RecipeBook from '../store/recipe.action';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  units = units;
  currentRecipe?: Recipe;
  isNew: boolean = true;
  private sub?: Subscription;

  recipeForm: FormGroup<{
    "recipeName": FormControl<string>,
    "recipeImage": FormControl<string>,
    "ingredients": FormArray<
      FormGroup<{
        "name": FormControl<string>,
        "amount": FormControl<number>,
        "unit": FormControl<string>
      }>
    >,
    preparation: FormControl<string>
  }>;
  get ingredients() {
    return this.recipeForm.get("ingredients") as FormArray
  }

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      "recipeName": new FormControl<string>(this.currentRecipe.name, Validators.required),
      "recipeImage": new FormControl<string>(this.currentRecipe.imagePath),
      "ingredients": new FormArray<
        FormGroup<{
          "name": FormControl<string>,
          "amount": FormControl<number>,
          "unit": FormControl<string>
        }>
      >(this.currentRecipe.ingredients?.map(v => this.newIngredientFormGroup(v.name, v.amount)) || [], Validators.required),
      "preparation": new FormControl<string>(this.currentRecipe.preparation, Validators.required)
    });
    this.sub = this.store.select("recipes").subscribe(
      d => {
        this.isNew = !d.selected;
        this.currentRecipe = d.selected?.recipe;
        this.recipeForm.setValue({
          "recipeName": this.currentRecipe?.name,
          "recipeImage": this.currentRecipe?.imagePath,
          "ingredients": this.currentRecipe?.ingredients?.map(i => ({ "name": i.name, "amount": i.amount.amount, "unit": i.amount.unit })) || [],
          "preparation": this.currentRecipe?.preparation
        });
      }
    );
  }

  private newIngredientFormGroup(name?: string, amount?: IngredientVolume) {
    return new FormGroup({
      "name": new FormControl(name, Validators.required),
      "amount": new FormControl(amount?.amount, [Validators.required, Validators.min(0)]),
      "unit": new FormControl(amount?.unit, Validators.required)
    });
  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  newIngredient(): void {
    this.ingredients.push(this.newIngredientFormGroup(), { emitEvent: true });
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index, { emitEvent: true });
  }

  onSubmit(): void {
    this.currentRecipe.name = this.recipeForm.value.recipeName;
    this.currentRecipe.imagePath = this.recipeForm.value.recipeImage;
    this.currentRecipe.ingredients = this.recipeForm.value.ingredients.map(v => ({
      name: v.name,
      amount: new IngredientVolume(v.amount, v.unit)
    }));
    this.currentRecipe.preparation = this.recipeForm.value.preparation;
    if(this.isNew) this.store.dispatch(new RecipeBook.AddAction([this.currentRecipe]));
    else {
      this.store.dispatch(new RecipeBook.SetAction(this.currentRecipe))
      this.router.navigate(["/recipes"]);
    }
  }
}
