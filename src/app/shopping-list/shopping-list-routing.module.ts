import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingListRoutes: Route[] = [
    {
        path: "", component: ShoppingListComponent
    },
    {
        path: ":ingredient", component: ShoppingListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule { }