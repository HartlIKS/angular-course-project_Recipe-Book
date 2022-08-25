import { IngredientVolume } from "../shopping-list/ingredientvolume.model";

export class Recipe {
    public name : string;
    public ingredients : {[property: string]: IngredientVolume};
    public imagePath : string;
    public preparation : string;

    constructor(name : string, imagePath : string, preparation : string, ingredients: {[property: string]: IngredientVolume} = {}) {
        this.name = name;
        this.imagePath = imagePath;
        this.preparation = preparation;
        this.ingredients = ingredients;
    }
}