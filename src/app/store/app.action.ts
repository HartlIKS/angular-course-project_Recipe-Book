import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { RawRecipe } from "../recipes/recipe.model";
import { RawIngredientList } from "../shopping-list/ingredientvolume.model";

export const LOAD = "[global] load",
LOAD_PRE = "[global] preload",
LOAD_START = "[global] loadStart",
LOAD_END = "[global] loadEnd",
SAVE = "[global] save",
SAVE_END = "[global] saveEnd";

export type SaveData = {
  recipes?: RawRecipe[],
  shoppingList?: RawIngredientList
};

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public readonly data: SaveData) {}
}

export class PreloadAction implements Action {
  readonly type = LOAD_PRE;
  constructor(public readonly blob: Observable<Blob>) {}
}

export class StartLoadAction implements Action {
  readonly type = LOAD_START;
  constructor(public readonly blob: Blob) {}
}

export class EndLoadAction implements Action {
  readonly type = LOAD_END;
}

export class SaveAction implements Action {
  readonly type = SAVE;
  constructor(public readonly destination: (SaveData) => Observable<any>) {}
}

export class EndSaveAction implements Action {
  readonly type = SAVE_END;
  constructor(public readonly payload: any) {}
}

export type GlobalActions = LoadAction|StartLoadAction|EndLoadAction|SaveAction|EndSaveAction;