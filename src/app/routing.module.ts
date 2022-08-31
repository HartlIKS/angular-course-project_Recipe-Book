import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipes/recipe.resolver";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: "shoppingList", component: ShoppingListComponent },
    {
      path: "recipes", component: RecipesComponent, children: [
        { path: ":id", component: RecipeDetailComponent, resolve: {recipe: RecipeResolver} },
        { path: ":id/edit", component: RecipeEditComponent, resolve: {recipe: RecipeResolver} },
        { path: ":id/**", redirectTo: ":id" }
      ]
    },
    { path: "", pathMatch: "full", redirectTo: "recipes" },
    { path: "**", redirectTo: "recipes" }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}