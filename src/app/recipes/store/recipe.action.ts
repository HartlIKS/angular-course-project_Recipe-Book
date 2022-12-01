import { Action } from "@ngrx/store";
import { RawRecipe, Recipe } from "../recipe.model";

export const ADD = "[RecipeBook] add",
CLEAR = "[RecipeBook] clr",
SELECT = "[RecipeBook] sel",
DESELECT = "[RecipeBook] dsl",
SET = "[RecipeBook] set",
REMOVE = "[RecipeBook] rmv",
ADD_TO_SHOPPING_LIST = "[RecipeBook] asl",
LOAD = "[RecipeBook] load";

export class AddAction implements Action {
  readonly type = ADD;
  constructor(public readonly recipes: RawRecipe[]) {}
}

export class ClearAction implements Action {
  readonly type = CLEAR;
}

export class SelectAction implements Action {
  readonly type = SELECT;
  constructor(public readonly index: number) {}
}

export class DeselectAction implements Action {
  readonly type = DESELECT;
}

export class SetAction implements Action {
  readonly type = SET;
  constructor(public readonly recipe: RawRecipe) {}
}

export class RemoveAction implements Action {
  readonly type = REMOVE;
}

export class AddToShoppingListAction implements Action {
  readonly type = ADD_TO_SHOPPING_LIST;
}

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public readonly recipes: RawRecipe[]) {}
}

export type Actions = AddAction|ClearAction|SelectAction|DeselectAction|SetAction|RemoveAction|AddToShoppingListAction|LoadAction;