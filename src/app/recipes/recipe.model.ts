import { IngredientVolume, convertIngredientVolume } from "../shopping-list/ingredientvolume.model";

export class Recipe {
    constructor(
        public name : string = null,
        public imagePath : string = null,
        public preparation : string = null,
        public ingredients: { name: string, amount: IngredientVolume }[] = []
        ) {}
}

export function convertRecipe(val: Recipe|{name: string, imagePath: string, preparation: string, ingredients: {name: string, amount:IngredientVolume|{amount:number, unit:string}}[]}): Recipe {
    if(val instanceof Recipe) return val;
    return new Recipe(
        val.name,
        val.imagePath,
        val.preparation,
        val.ingredients.map(
            v => ({name: v.name, amount: convertIngredientVolume(v.amount)})
        ));
}