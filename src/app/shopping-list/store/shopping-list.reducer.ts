import { convertIngredientVolume, IngredientList, IngredientVolume, UnitMismatch } from "../ingredientvolume.model";
import * as ShoppingList from "./shopping-list.action";

export type ShoppingListState = {
  ingredients: IngredientList,
  selected?: { name: string, amount: IngredientVolume },
  conversionError?: UnitMismatch,
};

const initialState: ShoppingListState = {
  ingredients: {},
  selected: null,
  conversionError: null,
};

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingList.Actions): ShoppingListState {
  switch (action.type) {
    case ShoppingList.ADD:
      state = {
        ...state,
        ingredients: {
          ...state.ingredients
        },
      };
      for (const name in action.ingredients) {
        const nv: IngredientVolume = convertIngredientVolume(action.ingredients[name]);
        if (state.ingredients[name]) {
          try {
            state.ingredients[name] = state.ingredients[name].add(nv);
            if (state.selected && state.selected.name == name) {
              state.selected = {
                ...state.selected,
                amount: state.ingredients[name],
              }
            }
          } catch (error) {
            if (error instanceof UnitMismatch) {
              state.conversionError = error;
            } else {
              throw error;
            }
          }
        }
        else state.ingredients[name] = nv;
      }
      return state;
    case ShoppingList.LOAD: {
      const nv = {};
      for (const [name, volume] of Object.entries(action.ingredients)) {
        nv[name] = convertIngredientVolume(volume);
      }
      return {
        ...state,
        ingredients: nv,
        selected: null,
      };
    }
    case ShoppingList.CLEAR:
      return initialState;
    case ShoppingList.SELECT:
      return {
        ...state,
        selected: state.ingredients[action.name] ? {
          ...state.selected,
          name: action.name,
          amount: state.ingredients[action.name],
        } : null,
      };
    case ShoppingList.DESELECT:
      if (!state.selected) return state;
      return {
        ...state,
        selected: null,
      };
    case ShoppingList.REMOVE:
      if (!state.selected) return state;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [state.selected.name]: undefined,
        },
        selected: null,
      };
    case ShoppingList.CONVERT: {
      if (!state.selected) return state;
      try {
        const nv: IngredientVolume = state.selected.amount.convertTo(action.unit);
        return state = {
          ...state,
          ingredients: {
            ...state.ingredients,
            [state.selected.name]: nv,
          },
          selected: {
            ...state.selected,
            amount: nv,
          },
        };
      } catch (error) {
        if (error instanceof UnitMismatch) {
          return {
            ...state,
            conversionError: error,
          };
        } else {
          throw error;
        }
      }

    }
    case ShoppingList.SET: {
      if (!state.selected) return state;
      const nv = convertIngredientVolume(action.volume);
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [state.selected.name]: nv,
        },
        selected: {
          ...state.selected,
          amount: nv,
        },
      };
    }
    case ShoppingList.CLEAR_ERROR:
      return {
        ...state,
        conversionError: null,
      }
    default:
      return state;
  }
}