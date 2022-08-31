import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { convertRecipe, Recipe } from "./recipe.model";
import { IngredientVolume } from "../shopping-list/ingredientvolume.model";

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
    private _selectedIndex: number;
    private selectedSubject = new BehaviorSubject<Recipe>(null);
    get selectedRecipe$() {
        return this.selectedSubject.asObservable();
    }

    constructor(private shoppingList: ShoppingListService) {}

    select(index: number): void {
        this._selectedIndex = index;
        this.selectedSubject.next(this.recipeSubject.value[index]);
    }

    deselect(): void {
        this._selectedIndex = null;
        this.selectedSubject.next(null);
    }

    addIngredientsToShoppingList(): void {
        this.shoppingList.addAll(this.selectedSubject.value.ingredients);
    }

    newRecipe(): void {
        this.select(this.recipeSubject.value.push(new Recipe())-1);
    }

    deleteSelected(): void {
        this.recipeSubject.value.splice(this._selectedIndex, 1);
        this.deselect();
    }

    load(recipes: (Recipe|{name: string, imagePath: string, preparation: string, ingredients: {name: string, amount:IngredientVolume|{amount:number, unit:string}}[]})[]): void {
        this.deselect();
        this.recipeSubject.next(recipes.map(convertRecipe));
    }
}