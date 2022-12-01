import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes.component";

const recipeRoutes: Routes = [
    {
        path: "", component: RecipesComponent, children: [
            { path: "new", component: RecipeEditComponent },
            { path: ":id", component: RecipeDetailComponent },
            { path: ":id/edit", component: RecipeEditComponent },
            { path: ":id/**", redirectTo: ":id" }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }