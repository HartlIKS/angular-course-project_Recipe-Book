export class IngredientVolume {
    constructor(public amount: number, public unit: string) { }

    public add(other: IngredientVolume): IngredientVolume {
        other.convertTo(this.unit);
        this.amount += other.amount;
        return this;
    }

    public convertTo(unit: string): void {
        if (this.unit == unit) return;
        if (this.unit in units && unit in units) {
            this.amount = units[unit].convert(this.amount, units[this.unit]);
            this.unit = unit;
        } else {
            throw new UnitMismatch(this.unit, unit);
        }
    }
}

export class Unit {
    public get base() {
        return this._base;
    }

    public get factor() {
        return this._factor;
    }

    constructor(private _base: string, private _factor: number) { }

    public convert(amount: number, from: Unit): number {
        let toBase = 1;
        let fromBase = 1;
        let to: Unit = this;
        while (units[from.base] !== from) {
            toBase *= from.factor;
            from = units[from.base];
        }
        while (units[to.base] !== to) {
            fromBase *= to.factor;
            to = units[to.base];
        }
        if (from !== to) throw new UnitMismatch(from.base, to.base);
        return amount * fromBase / toBase;
    }
}

export const units: { [unit: string]: Unit } = {
    "kg": new Unit("kg", 1),
    "g": new Unit("kg", 1000),
    "l": new Unit("l", 1),
    "ml": new Unit("l", 1000)
};

export class UnitMismatch {
    constructor(private _originalUnit: string, private _newUnit: string) { }

    get originalUnit() {
        return this._originalUnit || "Number";
    }

    get newUnit() {
        return this._newUnit || "Number";
    }
}