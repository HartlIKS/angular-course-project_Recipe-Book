import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "recipes" },
  { path: "recipes", loadChildren: () => import("./recipes/recipes.module").then(mod => mod.RecipeModule) },
  { path: "shoppingList", loadChildren: () => import("./shopping-list/shopping-list.module").then(mod => mod.ShoppingListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }