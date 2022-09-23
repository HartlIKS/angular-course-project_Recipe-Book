import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { IngredientResolver } from "./ingredient.resolver";
import { ShoppingListAddComponent } from "./shopping-list-add/shopping-list-add.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingListRoutes: Route[] = [
    {
        path: "", component: ShoppingListComponent, children: [
            { path: ":ingredient", component: ShoppingListEditComponent, resolve: { ingredient: IngredientResolver } },
            { path: "", pathMatch: "full", component: ShoppingListAddComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule { }