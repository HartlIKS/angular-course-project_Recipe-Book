import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IngredientVolume, convertIngredientVolume } from "./ingredientvolume.model";

function mappingFunc<A, B>(kv: [A, B]): { name: A, amount: B } {
    return { name: kv[0], amount: kv[1] };
}

@Injectable(
    { providedIn: "root" }
)
export class ShoppingListService {
    private itemSubject = new BehaviorSubject<{ [item: string]: IngredientVolume }>({});
    get items$() {
        return this.itemSubject.asObservable();
    }
    getCurrentItems() {
        return this.itemSubject.value;
    }
    private singleAdd(item: string, amount: IngredientVolume): void {
        if (item in this.itemSubject.value) {
            this.itemSubject.value[item].add(amount);
        } else {
            this.itemSubject.value[item] = amount.copy();
        }
    }

    public add(item: string, amount: IngredientVolume): void {
        this.singleAdd(item, amount);
    }

    public addAllMap(items: { [item: string]: IngredientVolume }): void {
        this.addAll(Object.entries(items).map(mappingFunc));
    }

    public addAll(items: { name: string, amount: IngredientVolume }[]): void {
        for (let item of items) {
            this.singleAdd(item.name, item.amount);
        }
    }

    private singleRemove(item: string): void {
        delete this.itemSubject.value[item];
    }

    public remove(item: string): void {
        this.singleRemove(item);
    }

    public removeAll(items: string[]): void {
        for (let item of items) {
            this.singleRemove(item);
        }
    }

    public load(items: { [item: string]: IngredientVolume | { amount: number, unit: string } }): void {
        for (let item in this.itemSubject.value) {
            this.itemSubject.value[item] = convertIngredientVolume(this.itemSubject.value[item]);
        }
        this.itemSubject.next(items as { [item: string]: IngredientVolume });
    }
}