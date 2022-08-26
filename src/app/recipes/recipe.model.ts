import { IngredientVolume } from "../shopping-list/ingredientvolume.model";

export class Recipe {
    constructor(
        public name : string = "Unnamed Recipe",
        public imagePath : string = "",
        public preparation : string = "Enter preparation steps here",
        public ingredients: {[property: string]: IngredientVolume} = {}
        ) {}
}