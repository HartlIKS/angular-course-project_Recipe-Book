import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model";
import { RecipeBook } from "./recipe.service";

@Injectable({
    providedIn: "root"
})
export class RecipeResolver implements Resolve<Recipe> {
    constructor(private recipeBook: RecipeBook, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        let ret = this.recipeBook.getCurrentRecipes()[route.params.id];
        if(!ret) this.router.navigate(["/recipes"]);
        return ret;
    }
}