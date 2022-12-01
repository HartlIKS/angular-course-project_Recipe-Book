import { Action } from "@ngrx/store";
import { RawIngredientList, RawIngredientVolume } from "../ingredientvolume.model";

export const ADD = "[ShoppingList] add",
  CLEAR = "[ShoppingList] clear",
  SELECT = "[ShoppingList] select",
  DESELECT = "[ShoppingList] deselect",
  CONVERT = "[ShoppingList] convert",
  SET = "[ShoppingList] set",
  REMOVE = "[ShoppingList] remove",
  CLEAR_ERROR = "[ShoppingList] clearError",
  LOAD = "[ShoppingList] load";

export class AddAction implements Action {
  readonly type = ADD;
  constructor(public readonly ingredients: RawIngredientList) {}
}

export class ClearAction implements Action {
  readonly type = CLEAR;
};

export class SelectAction implements Action {
  readonly type = SELECT;
  constructor(public readonly name: string) {}
}

export class DeselectAction implements Action {
  readonly type = DESELECT;
};

export class ConvertAction implements Action {
  readonly type = CONVERT;
  constructor(public readonly unit: string) {}
}

export class SetAction implements Action {
  readonly type = SET;
  constructor(public readonly volume: RawIngredientVolume) {}
}

export class RemoveAction implements Action {
  readonly type = REMOVE;
};

export class ClearErrorAction implements Action {
  readonly type = CLEAR_ERROR;
}

export class LoadAction implements Action {
  readonly type = LOAD;
  constructor(public readonly ingredients: RawIngredientList) {}
}

export type Actions = AddAction|ClearAction|SelectAction|DeselectAction|ConvertAction|SetAction|RemoveAction|ClearErrorAction|LoadAction;