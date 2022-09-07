import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model";
import { RecipeBook } from "./recipe.service";

@Injectable({
    providedIn: "root"
})
export class NewRecipeResolver implements Resolve<Recipe> {
    constructor(private recipeBook: RecipeBook, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        return new Recipe("New Recipe", "", "", []);
    }
}