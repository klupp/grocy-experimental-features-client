import { Conversion } from "./unit";
import { Unit } from "./unit";

export interface Product {
    id: number;
    name: string;
}

export interface ProductDetails extends Product {
    average_shelf_life_days?: number;
    stock_unit: Unit;
    purchase_unit: Unit;
    consume_unit: Unit;
    price_unit: Unit;
    conversions: Conversion[];
}

