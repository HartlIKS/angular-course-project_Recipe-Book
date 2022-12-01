import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATED } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { EMPTY, exhaustMap, map, Observable, of, OperatorFunction, withLatestFrom } from "rxjs";
import { AppState } from "src/app/store/app.reducer";

import * as RecipeBook from "./recipe.action";
import * as ShoppingList from "../../shopping-list/store/shopping-list.action";
import { AppComponent } from "src/app/app.component";
import { Action } from "rxjs/internal/scheduler/Action";

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) { }

  public readonly selectEffect = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATED),
    map((a: RouterNavigatedAction) => {
      let state = a.payload.routerState.root;
      while (state.firstChild && state.firstChild !== state) state = state.firstChild;
      const id = state.params.id;
      if (id !== undefined && id !== null) return new RecipeBook.SelectAction(id);
      else return new RecipeBook.DeselectAction();
    })
  ));

  public readonly addToShoppingListEffect = createEffect(() => this.actions$.pipe(
    ofType(RecipeBook.ADD_TO_SHOPPING_LIST),
    concatLatestFrom(() => this.store.select("recipes")),
    exhaustMap(([a, v]) => new Observable<ShoppingList.AddAction>(o => {
      for (const ingredient of v.selected?.recipe?.ingredients || []) {
        o.next(new ShoppingList.AddAction({ [ingredient.name]: ingredient.amount }));
      }
      o.complete();
    }))
  ));
}