import { ProductDetails } from "./product";
import { Unit } from "./unit";

export interface StoreLocation {
    id: string;
    name?: string;
    address?: string;
    postal_code?: string;
    locality?: string;
}

export interface Receipt {
    id: string;
    location: StoreLocation;
    transaction_time: string;
    currency: string;
    total_amount: number;
}

export interface PurchaseModel {
    product?: ProductDetails;
    barcode?: string;
    multiplier: number;
    price: number;
    note: string;
    quantity_unit?: Unit;
    quantity_amount?: number;
    due_date: string;
    store_id: number;
}

export interface ReceiptDetails extends Receipt {
    items: PurchaseModel[];
}