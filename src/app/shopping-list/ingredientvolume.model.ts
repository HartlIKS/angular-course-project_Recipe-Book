export class IngredientVolume {
    amount: number;
    unit: string;

    constructor(amount: number, unit: string) {
        this.amount = amount;
        this.unit = unit;
    }
}

export class UnitMismatch {
    constructor(private _originalUnit: string, private _newUnit: string) {}

    get originalUnit() {
        return this._originalUnit || "Number";
    }

    get newUnit() {
        return this._newUnit || "Number";
    }
}