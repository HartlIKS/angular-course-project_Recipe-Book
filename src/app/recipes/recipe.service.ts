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
    private _selectedIndex: number;
    private _selectedRecipe: Recipe = null;
    get selectedRecipe() {
        return this._selectedRecipe;
    }

    constructor(private shoppingList: ShoppingListService) {}

    select(index: number): void {
        this._selectedIndex = index;
        this._selectedRecipe = this.recipes[index];
    }

    deselect(): void {
        this._selectedIndex = null;
        this._selectedRecipe = null;
    }

    addIngredientsToShoppingList(): void {
        this.shoppingList.addAll(this.selectedRecipe.ingredients);
    }

    newRecipe(): void {
        this.select(this.recipes.push(new Recipe())-1);
    }

    deleteSelected(): void {
        this.recipes.splice(this._selectedIndex, 1);
        this.deselect();
    }
}