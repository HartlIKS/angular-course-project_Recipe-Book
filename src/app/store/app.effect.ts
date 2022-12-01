import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, from, map, Observable, switchMap, withLatestFrom } from "rxjs";

import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import * as RecipeBook from "../recipes/store/recipe.action";
import * as ShoppingList from "../shopping-list/store/shopping-list.action";
import * as App from "./app.action";
import { AppState } from "./app.reducer";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) { }

  public readonly preloadEffect = createEffect(() => this.actions$.pipe(
    ofType(App.LOAD_PRE),
    switchMap((ls: App.PreloadAction) => ls.blob),
    map(b => new App.StartLoadAction(b))
  ));

  public readonly loadStartEffect = createEffect(() => this.actions$.pipe(
    ofType(App.LOAD_START),
    switchMap((b: App.StartLoadAction) => from(b.blob.text())),
    map(parsed => new App.LoadAction(JSON.parse(parsed)))
  ));

  public readonly loadEffect = createEffect(() => this.actions$.pipe(
    ofType(App.LOAD),
    switchMap((v: App.LoadAction) => new Observable<Action>(o => {
      if (v.data) {
        if (v.data.recipes) {
          o.next(new RecipeBook.LoadAction(v.data.recipes));
        }
        if (v.data.shoppingList) {
          o.next(new ShoppingList.LoadAction(v.data.shoppingList));
        }
      }
      o.next(new App.EndLoadAction());
      o.complete();
    }))
  ));

  public readonly saveEffect = createEffect(() => this.actions$.pipe(
    ofType(App.SAVE),
    withLatestFrom(this.store),
    exhaustMap(([a, s]: [App.SaveAction, AppState]) => a.destination({
      recipes: s.recipes.recipes,
      shoppingList: s.shoppingList.ingredients,
    })),
    map(v => new App.EndSaveAction(v))
  ));
}