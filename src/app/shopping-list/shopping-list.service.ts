import { Injectable } from "@angular/core";
import { IngredientVolume } from "./ingredientvolume.model";

function mappingFunc<A, B>(kv: [A, B]): { name: A, amount: B } {
    return { name: kv[0], amount: kv[1] };
}

@Injectable(
    {providedIn: "root"}
)
export class ShoppingListService {
    items: { [item: string]: IngredientVolume } = {};
    private singleAdd(item: string, amount: IngredientVolume): void {
        if(item in this.items) {
            this.items[item].add(amount);
        } else {
            this.items[item] = amount;
        }
    }

    public add(item: string, amount: IngredientVolume): void {
        this.singleAdd(item, amount);
    }

    public addAll(items: { [item: string]: IngredientVolume }): void {
        this.addAllArray(Object.entries(items).map(mappingFunc));
    }

    public addAllArray(items: { name: string, amount: IngredientVolume }[]): void {
        for (let item of items) {
            this.singleAdd(item.name, item.amount);
        }
    }

    private singleRemove(item: string): void {
        delete this.items[item];
    }

    public remove(item: string): void {
        this.singleRemove(item);
    }

    public removeAll(items: string[]): void {
        for(let item of items) {
            this.singleRemove(item);
        }
    }
}