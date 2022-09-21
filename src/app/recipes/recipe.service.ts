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

    constructor(private shoppingList: ShoppingListService, private router: Router) {
        this.loadFromLocalStorage();
    }

    addIngredientsToShoppingList(recipe: Recipe): void {
        this.shoppingList.addAll(recipe.ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.router.navigate(["/recipes", this.recipeSubject.value.push(recipe)-1]);
    }

    delete(recipe: Recipe): void {
        this.recipeSubject.value.splice(this.recipeSubject.value.indexOf(recipe), 1);
    }

    load(recipes: (Recipe|{name: string, imagePath: string, preparation: string, ingredients: {name: string, amount:IngredientVolume|{amount:number, unit:string}}[]})[]): void {
        this.recipeSubject.next(recipes.map(convertRecipe));
    }

    saveToLocalStorage(): void {
        localStorage.setItem("recipes", JSON.stringify(this.recipeSubject.value));
    }

    loadFromLocalStorage() {
        return this.load(JSON.parse(localStorage.getItem("recipes")));
    }
}