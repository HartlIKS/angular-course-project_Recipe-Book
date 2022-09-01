import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IngredientVolume } from "./ingredientvolume.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({
    providedIn: "root"
})
export class IngredientResolver implements Resolve<{name: string, amount: IngredientVolume}> {
    constructor(private shoppingList: ShoppingListService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): { name: string; amount: IngredientVolume; } | Observable<{ name: string; amount: IngredientVolume; }> | Promise<{ name: string; amount: IngredientVolume; }> {
        let name: string = route.params.ingredient;
        let amount = this.shoppingList.getCurrentItems()[name];
        if(!amount) this.router.navigate(["shoppingList"]);
        return {
            name,
            amount
        };
    }
}