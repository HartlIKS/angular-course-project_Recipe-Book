import { IngredientVolume, convertIngredientVolume } from "../shopping-list/ingredientvolume.model";

type BaseRecipe = {
    name: string,
    imagePath: string,
    preparation: string,
};

export type Recipe = BaseRecipe & {
    ingredients: { name: string, amount: IngredientVolume }[],
};

export type RawRecipe = BaseRecipe & {
    ingredients: { name: string, amount: { amount: number, unit: string } }[],
};

export function convertRecipe(val: RawRecipe): Recipe {
    return {
        ...val,
        ingredients: val.ingredients.map(
            v => ({ name: v.name, amount: convertIngredientVolume(v.amount) })
        ),
    };
}