
export interface Unit {
    id: number;
    name: string;
}

export interface Conversion {
    from_unit: Unit;
    to_unit: Unit;
    factor: number;
}

