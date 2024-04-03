"use client";
import React, { useEffect, useState } from 'react'
import { PurchaseModel } from '../lib/model/receipt'
import { ProductDetails } from "../lib/model/product";
import { Product } from "../lib/model/product";
import LoadingButton from './loading-button';
import clsx from 'clsx';
import QuOptions from './qu-options';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface Props {
    item: PurchaseModel;
    products: Product[];
    purchaseDate: string;
}

type PurchaseFormData = {
    barcode: string;
    productName: string;
    productId: number;
    quantityAmount: number;
    quantityUnitId: number;
    multiplier: number;
    price: number;
    purchaseDate: string;
    dueDate: string;
    note: string;
    storeId: number;
}

const PurchaseForm = ({ item, products, purchaseDate }: Props) => {
    const [product, setProduct] = useState(item.product)
    const [submitted, setSubmitted] = useState(false);
    console.log(purchaseDate);
    const { register, setValue, formState: { errors, isSubmitting, dirtyFields }, handleSubmit } = useForm<PurchaseFormData>({
        mode: "all",
        defaultValues: {
            barcode: item.barcode,
            productName: product?.name || "",
            productId: item.product?.id,
            quantityAmount: item.quantity_amount,
            quantityUnitId: item.quantity_unit?.id,
            multiplier: item.multiplier,
            price: item.price,
            purchaseDate: purchaseDate.split("T")[0],
            dueDate: item.due_date || "",
            note: item.note || "",
            storeId: item.store_id
        }
    });

    const handlePurchase: SubmitHandler<PurchaseFormData> = async (formData) => {
        try {
            const res = await fetch("/api/stores/purchase", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            setSubmitted(true);
        } catch (error) {
            alert('Purchase failed. ' + error)
        }
    };

    const validateProductName = async (newProductName: string) => {
        if (newProductName == product?.name)
            return true;
        for (var p of products) {
            if (p.name == newProductName) {
                setValue("productId", p.id)
                var product_details_response = await fetch('/api/products/' + p.id);
                var product_details: ProductDetails = await product_details_response.json();
                setProduct(product_details);
                if (!dirtyFields.dueDate && product_details.average_shelf_life_days !== undefined) {
                    var dueDate = new Date(purchaseDate)
                    dueDate.setDate(dueDate.getDate() + Math.round(product_details.average_shelf_life_days));
                    setValue("dueDate", dueDate.toISOString().split("T")[0])
                }
                return true;
            }
        }
        setProduct(undefined)
        return "Pick one from the list."
    };

    return (
        <form className='row' onSubmit={handleSubmit(handlePurchase)}>
            <div className="col-12 col-xl-6 col-xxl-1">
                <label htmlFor={item.barcode + "ProductGroup"}>Barcode</label>
                <div className="input-group" id={item.barcode + "ProductGroup"}>
                    <input className="form-control" type="text" placeholder="Type to search products..." {...register("barcode")} />
                </div>
            </div>
            <div className="col-12 col-xl-6 col-xxl-2">
                <label htmlFor={item.barcode + "ProductGroup"}>Product<span className='text-danger'>*</span></label>
                <div className="input-group" id={item.barcode + "ProductGroup"}>
                    <input className={clsx("form-control", {
                        "is-invalid": errors.productName
                    })} list="OptionsProduct" placeholder="Type to search products..." {...register("productName", { required: "Product required.", validate: validateProductName })} />
                    <input hidden {...register("productId")} />
                    <div className="invalid-feedback">
                        {errors.productName?.message}
                    </div>
                </div>
            </div>
            <div className="col-12 col-xl-6 col-xxl-3">
                <label htmlFor={item.barcode + "QuantityGroup"}>Quantity<span className='text-danger'>*</span></label>
                <div className="input-group" id={item.barcode + "QuantityGroup"}>
                    <input autoComplete="off" className={clsx("form-control", { "is-invalid": errors.quantityAmount })} placeholder="amount..." step="0.01" type="number" {...register("quantityAmount", { required: "Quantity Amount Required." })} />
                    <select className="form-select qu-name w-25" aria-label="unit..." {...register("quantityUnitId", { required: "Quantity Unit Required." })}>
                        <QuOptions product={product}></QuOptions>
                    </select>
                    <span className="input-group-text">x</span>
                    <input autoComplete="off" className="form-control" placeholder="multiplier..." step="0.01" type="number" {...register("multiplier", { required: "Multiplier Required." })} />
                    <div className="invalid-feedback">
                        {errors.quantityAmount?.message} {errors.quantityUnitId?.message} {errors.multiplier?.message}
                    </div>
                </div>
            </div>
            <div className="col-5 col-xl-2 col-xxl-1">
                <label htmlFor={item.barcode + "PriceGroup"}>Price<span className='text-danger'>*</span></label>
                <div className="input-group" id={item.barcode + "PriceGroup"}>
                    <span className="input-group-text">€</span>
                    <input autoComplete="off" className={clsx("form-control", { "is-invalid": errors.price })} placeholder="price..."
                        step="0.01" type="number" {...register("price", { required: "Price Required." })} />
                    <div className="invalid-feedback">
                        {errors.price?.message}
                    </div>
                </div>
            </div>
            <div className="col-7 col-xl-4 col-xxl-2">
                <label htmlFor={item.barcode + "DueDate"}>Due Date<span className='text-danger'>*</span></label>
                <input className={clsx("form-control", { "is-invalid": errors.dueDate })} id={item.barcode + "DueDate"} type="date"
                    {...register("dueDate", { required: "Due Date Required." })} />
                <div className="invalid-feedback">
                    {errors.dueDate?.message}
                </div>
            </div>
            <div className="col-12 col-xl-4 col-xxl-2">
                <label htmlFor={item.barcode + "Note"}>Note</label>
                <input className="form-control" id={item.barcode + "Note"} type="text"
                    {...register("note")} />
            </div>
            <div className="col-12 col-xl-2 col-xxl-1">
                <LoadingButton loading={isSubmitting} title='Purchase' loadingText='Purchase' className={clsx('mt-4', { "btn-success": submitted })} type="submit" />
            </div>
            <input type="text" hidden {...register("barcode")} />
            <input type="date" hidden {...register("purchaseDate")} />
            <input type="number" hidden {...register("storeId")} />
        </form>
    )
}

export default PurchaseForm