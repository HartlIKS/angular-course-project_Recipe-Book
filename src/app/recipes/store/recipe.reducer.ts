import { convertRecipe, Recipe } from "../recipe.model";
import * as RecipeBook from "./recipe.action";

export type RecipeBookState = {
  recipes: Recipe[],
  selected?: {index: number, recipe: Recipe},
};

const initialState: RecipeBookState = {
  recipes: [],
  selected: null,
};

export function recipeBookReducer(state: RecipeBookState = initialState, action: RecipeBook.Actions): RecipeBookState {
  switch (action.type) {
    case RecipeBook.ADD:
      return {
        ...state,
        recipes: [
          ...state.recipes,
          ...action.recipes.map(convertRecipe),
        ],
      };
    case RecipeBook.LOAD:
      return  {
        ...state,
        recipes: action.recipes.map(convertRecipe),
        selected: null,
      }
    case RecipeBook.CLEAR:
      return initialState;
    case RecipeBook.SELECT:
      return {
        ...state,
        selected: {
          index: action.index,
          recipe: state.recipes[action.index],
        }
      };
    case RecipeBook.SET: {
      if(!state.selected) return state;
      const nv = convertRecipe(action.recipe);
      return {
        ...state,
        recipes: state.recipes.map((r, i) => i == state.selected.index ? nv : r),
        selected: {
          ...state.selected,
          recipe: nv,
        }
      };
    }
    case RecipeBook.REMOVE:
      if(!state.selected) return state;
      return {
        ...state,
        recipes: state.recipes.filter((r, i) => i != state.selected.index),
        selected: null,
      };
    case RecipeBook.DESELECT:
      return {
        ...state,
        selected: null,
      };
    default:
      return state;
  }
}