import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { IngredientVolume, units } from 'src/app/shopping-list/ingredientvolume.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  units = units;
  currentRecipe: Recipe;
  private sub: Subscription;

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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentRecipe = this.route.snapshot.data.recipe;
    this.sub = this.route.data.subscribe(
      d => {
        this.currentRecipe = d.recipe;
        this.recipeForm.setValue({
          "recipeName": this.currentRecipe.name,
          "recipeImage": this.currentRecipe.imagePath,
          "ingredients": this.currentRecipe.ingredients.map(i => ({"name": i.name, "amount": i.amount.amount, "unit": i.amount.unit})),
          "preparation": this.currentRecipe.preparation
        });
      }
    );
    this.recipeForm = new FormGroup({
      "recipeName": new FormControl<string>(this.currentRecipe.name, Validators.required),
      "recipeImage": new FormControl<string>(this.currentRecipe.imagePath),
      "ingredients": new FormArray<
        FormGroup<{
          "name": FormControl<string>,
          "amount": FormControl<number>,
          "unit": FormControl<string>
        }>
      >(this.currentRecipe.ingredients.map(v => this.newIngredientFormGroup(v.name, v.amount)), Validators.minLength(1)),
      "preparation": new FormControl<string>(this.currentRecipe.preparation, Validators.required)
    });
  }

  private newIngredientFormGroup(name = "New Ingredient", amount= new IngredientVolume(1, "")) {
    return new FormGroup({
      "name": new FormControl(name),
      "amount": new FormControl(amount.amount),
      "unit": new FormControl(amount.unit)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  newIngredient(): void {
    this.ingredients.push(this.newIngredientFormGroup(), {emitEvent: true});
  }

  onSubmit(): void {
    this.currentRecipe.name = this.recipeForm.value.recipeName;
    this.currentRecipe.imagePath = this.recipeForm.value.recipeImage;
    this.currentRecipe.ingredients = this.recipeForm.value.ingredients.map(v => ({
      name: v.name,
      amount: new IngredientVolume(v.amount, v.unit)
    }));
    this.currentRecipe.preparation = this.recipeForm.value.preparation;

    this.router.navigate([".."], {relativeTo: this.route});
  }
}
