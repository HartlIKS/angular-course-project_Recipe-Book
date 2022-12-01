import { RecipeBookState, recipeBookReducer } from "../recipes/store/recipe.reducer";
import { shoppingListReducer, ShoppingListState } from "../shopping-list/store/shopping-list.reducer";

export type AppState = {shoppingList: ShoppingListState, recipes: RecipeBookState};

export const AppReducers = {shoppingList: shoppingListReducer, recipes: recipeBookReducer};