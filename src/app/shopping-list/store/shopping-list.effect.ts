import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATED } from "@ngrx/router-store";
import { map } from "rxjs";

import * as ShoppingList from "./shopping-list.action";

@Injectable()
export class ShoppingListEffects {
  constructor(private actions$: Actions) {}

  public readonly selectEffect = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATED),
    map((a: RouterNavigatedAction) => {
      let state = a.payload.routerState.root;
      while (state.firstChild && state.firstChild !== state) state = state.firstChild;
      const id = state.params.ingredient;
      if (id !== undefined && id !== null) return new ShoppingList.SelectAction(id);
      else return new ShoppingList.DeselectAction();
    })
  ));
}