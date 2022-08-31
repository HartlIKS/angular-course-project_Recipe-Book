import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { convertRecipe, Recipe } from "./recipe.model";
import { IngredientVolume } from "../shopping-list/ingredientvolume.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class RecipeBook {
    private recipeSubject = new BehaviorSubject<Recipe[]>([]);
    get recipes$() {
        return this.recipeSubject.asObservable();
    }
    getCurrentRecipes(): Recipe[] {
        return this.recipeSubject.value;
    }

    constructor(private shoppingList: ShoppingListService, private router: Router) {}

    addIngredientsToShoppingList(recipe: Recipe): void {
        this.shoppingList.addAll(recipe.ingredients);
    }

    newRecipe(): void {
        this.router.navigate(["/recipes", this.recipeSubject.value.push(new Recipe())-1, "edit"]);
    }

    delete(recipe: Recipe): void {
        this.recipeSubject.value.splice(this.recipeSubject.value.indexOf(recipe), 1);
    }

    load(recipes: (Recipe|{name: string, imagePath: string, preparation: string, ingredients: {name: string, amount:IngredientVolume|{amount:number, unit:string}}[]})[]): void {
        this.recipeSubject.next(recipes.map(convertRecipe));
    }
}