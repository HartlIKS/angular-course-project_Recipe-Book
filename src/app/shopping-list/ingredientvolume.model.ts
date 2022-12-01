export class IngredientVolume {
    constructor(public readonly amount: number, public readonly unit: string) { }

    public add(other: IngredientVolume): IngredientVolume {
        return new IngredientVolume(this.amount + other.convertTo(this.unit).amount, this.unit);
    }

    public convertTo(unit: string): IngredientVolume {
        if (this.unit == unit) return this;
        if (this.unit in units && unit in units) {
            return new IngredientVolume(units[unit].convert(this.amount, units[this.unit]), unit);
        } else {
            throw new UnitMismatch(this.unit, unit);
        }
    }
}

export type RawIngredientVolume = {amount: number, unit: string};

export type IngredientList = {[name: string]: IngredientVolume};

export type RawIngredientList = {[name: string]: RawIngredientVolume};

export function convertIngredientVolume(vol: IngredientVolume|RawIngredientVolume): IngredientVolume {
    if(vol instanceof IngredientVolume) return vol;
    return new IngredientVolume(vol.amount, vol.unit);
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

    public convertable(from: Unit): boolean {
        while (units[from.base] !== from) {
            from = units[from.base];
        }
        let to: Unit = this;
        while (units[to.base] !== to) {
            to = units[to.base];
        }
        return from === to;
    }
}

export const units: { [unit: string]: Unit } = {
    "kg": new Unit("kg", 1),
    "g": new Unit("kg", 1000),
    "l": new Unit("l", 1),
    "ml": new Unit("l", 1000)
};

export function convertable(from: string, to: string): boolean {
    if(from == to) return true;
    if(!(from in units)) return false;
    if(!(to in units)) return false;
    return units[to].convertable(units[from]);
}

export class UnitMismatch {
    constructor(private _originalUnit: string, private _newUnit: string) { }

    get originalUnit() {
        return this._originalUnit || "Number";
    }

    get newUnit() {
        return this._newUnit || "Number";
    }
}