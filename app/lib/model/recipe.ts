import { ProductDetails } from "./product";
import { Unit } from "./unit";

export interface Ingredient {
    text: string;
    product?: ProductDetails;
    quantity_unit?: Unit;
    quantity_amount?: number;
    note?: string;
    group?: string;
}

export interface Recipe {
    url: string;
    name: string;
    recipe_yield?: number;
    description: string;
    image_url?: string;
    ingredients: Ingredient[]
}