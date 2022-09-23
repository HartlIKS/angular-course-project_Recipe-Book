import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewRecipeResolver } from "./newrecipe.resolver";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe.resolver";
import { RecipesComponent } from "./recipes.component";

const recipeRoutes: Routes = [
    {
        path: "", component: RecipesComponent, children: [
            { path: "new", component: RecipeEditComponent, resolve: { recipe: NewRecipeResolver } },
            { path: ":id", component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
            { path: ":id/edit", component: RecipeEditComponent, resolve: { recipe: RecipeResolver } },
            { path: ":id/**", redirectTo: ":id" }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }