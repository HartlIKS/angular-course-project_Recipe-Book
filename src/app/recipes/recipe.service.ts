import { Injectable } from "@angular/core";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: "root"
})
export class RecipeBook {
    private _recipes: Recipe[] = [];
    get recipes() {
        return this._recipes;
    }
    private _selectedRecipe: Recipe = null;
    get selectedRecipe() {
        return this._selectedRecipe;
    }

    constructor(private shoppingList: ShoppingListService) {}

    select(index: number): void {
        this._selectedRecipe = this.recipes[index];
    }

    deselect(): void {
        this._selectedRecipe = null;
    }

    addIngredientsToShoppingList(): void {
        this.shoppingList.addAll(this.selectedRecipe.ingredients);
    }

    newRecipe(): void {
        this.recipes.push(new Recipe());
    }
}