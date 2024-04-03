"use client";

import React, { useEffect } from 'react'
import { Recipe } from '../lib/model/recipe';
import { Product, ProductDetails } from '../lib/model/product';
import { useFieldArray, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { Unit } from '../lib/model/unit';
import clsx from 'clsx';
import LoadingButton from './loading-button';

export interface Props {
    recipe: Recipe;
    products: Product[];
}

export interface NewIngredientRequest {
    text?: string;
    product?: ProductDetails;
    product_name?: string;
    quantity_amount?: number;
    quantity_unit_id?: number;
    note?: string;
    group?: string;
}

export interface NewRecipeRequest {
    name: string;
    description: string;
    recipe_yield?: number;
    url: string;
    image_url?: string;
    ingredients: NewIngredientRequest[]
}

const RecipeForm = ({ recipe, products }: Props) => {
    const { register, control, setValue, watch, formState: { errors, isSubmitting, dirtyFields }, handleSubmit } = useForm<NewRecipeRequest>({
        mode: "all",
        defaultValues: {
            name: recipe.name,
            description: recipe.description,
            recipe_yield: recipe.recipe_yield,
            url: recipe.url,
            image_url: recipe.image_url,
            ingredients: recipe.ingredients.map(i => {
                return {
                    text: i.text,
                    product_name: i.product?.name,
                    product: i.product,
                    quantity_amount: i.quantity_amount,
                    quantity_unit_id: i.quantity_unit?.id,
                    note: i.note,
                    group: i.group
                }
            })
        }
    });

    useEffect(() => {
        register("description", { required: true, minLength: 15 });
    }, [register]);

    const onEditorStateChange = (editorState: string) => {
        setValue("description", editorState);
    };

    const { fields, append, remove, update } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "ingredients", // unique name for your Field Array
    });

    const editorContent = watch("description");

    const createRecipe = async (recipe: NewRecipeRequest) => {
        try {
            const res = await fetch("/api/recipes/", {
                method: "POST",
                body: JSON.stringify(recipe),
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        } catch (error) {
            alert('Recipe creation failed. ' + error)
        }
    }

    const validateProductName = async (newProductName: string | undefined, formValues: NewRecipeRequest, index: number) => {
        const ingredient = formValues.ingredients[index]
        if (ingredient.product && ingredient.product.name == newProductName) {
            return true;
        }
        for (var p of products) {
            if (p.name == newProductName) {
                
                var product_details_response = await fetch('/api/products/' + p.id);
                var product_details: ProductDetails = await product_details_response.json();

                ingredient.product = product_details;
                update(index, ingredient);
                return true;
            }
        }
        setValue(`ingredients.${index}.product`, undefined)
        return "Pick one from the list."
    };

    return (
        <form onSubmit={handleSubmit(createRecipe)}>
            <div className="row">
                <div className="col=12 col-lg-5 mb-2">
                    <label htmlFor='name'>Name</label>
                    <input className={clsx("form-control", { "is-invalid": errors.name })} type="text" {...register("name", { required: "Recipe name required." })} />
                    <div className="invalid-feedback">
                        {errors.name?.message}
                    </div>
                </div>
                <div className="col=12 col-lg-2 mb-2">
                    <label htmlFor='yield'>servings</label>
                    <input id="yield" className={clsx("form-control", { "is-invalid": errors.recipe_yield })} type="number" {...register("recipe_yield", { required: "Yield required.", min: 1 })} />
                    <div className="invalid-feedback">
                        {errors.recipe_yield?.message}
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3 mb-2">
                    <img className="img-fluid img-thumbnail" src={recipe.image_url} />
                    <input className="form-control" hidden {...register("image_url", { required: "Image URL required." })} />
                </div>
                <div className="col-12 col-lg-9 mb-2">
                    <ReactQuill theme="snow" value={editorContent} onChange={onEditorStateChange} />
                </div>
            </div>
            <div className='row me-3'>
                <h4 className='col-11'>Ingredients</h4>
                <div className='col-1 text-end'>
                    <button type="button" className='btn btn-success mb-3' onClick={() => append({text: ""})}>+</button>
                </div>
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="card mb-1 ingredient-card">
                    <div className="card-body row">
                        <p className='col-12'><b>{field.text}</b></p>
                        <div className="col-12 col-xl-8 col-xxl-4 mb-1">
                            <label htmlFor={`ingredients.${index}.product`}>Product<span className='text-danger'>*</span></label>
                            <input id={`ingredients.${index}.product`} className={clsx("form-control", { "is-invalid": errors.ingredients?.[index]?.product_name })} list="OptionsProduct" placeholder="Type to search products..." {...register(`ingredients.${index}.product_name`, { required: "Product required.", validate: (value, formValues) => validateProductName(value, formValues, index) })} />
                            <div className="invalid-feedback">
                                {errors.ingredients?.[index]?.product_name?.message}
                            </div>
                        </div>
                        <div className="col-12 col-xl-4 col-xxl-2 mb-1">
                            <label htmlFor={`ingredients.${index}.quantity`}>Quantity<span className='text-danger'>*</span></label>
                            <div className="input-group" id={`ingredients.${index}.quantity`}>
                                <input placeholder='amount...' className={clsx("form-control", { "is-invalid": errors.ingredients?.[index]?.quantity_amount })} step="0.01" type="number" {...register(`ingredients.${index}.quantity_amount`, { required: "Amount required." })} />
                                <select className={clsx("form-control", { "is-invalid": errors.ingredients?.[index]?.quantity_unit_id })} aria-placeholder='select' {...register(`ingredients.${index}.quantity_unit_id`, { required: "Unit required." })}>
                                    {field.product && field.product.conversions.map(c => {
                                        return (
                                            <option key={c.from_unit.id} value={c.from_unit.id}>{c.from_unit.name}</option>
                                        )
                                    })}
                                </select>
                                <div className="invalid-feedback">
                                    {errors.ingredients?.[index]?.quantity_amount?.message}
                                    {errors.ingredients?.[index]?.quantity_unit_id?.message}
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-xl-4 col-xxl-2 mb-1'>
                            <label htmlFor={`ingredients.${index}.group`}>Group</label>
                            <input className="form-control" id={`ingredients.${index}.group`} type="text" {...register(`ingredients.${index}.group`)} />
                        </div>
                        <div className="col-12 col-xl-7 col-xxl-3 mb-1">
                            <label htmlFor={`ingredients.${index}.note`}>Note</label>
                            <input className="form-control" id={`ingredients.${index}.note`} type="text" {...register(`ingredients.${index}.note`)} />

                        </div>
                        <div className='col-12 col-xl-1 col-xxl-1 mb-1 text-end'>
                            <button type="button" className='btn btn-danger mt-4' onClick={() => remove(index)}>x</button>
                        </div>
                    </div>
                </div>
            ))}
            <LoadingButton loading={isSubmitting} title='Save' loadingText='Saving' type="submit" />
        </form>
    )
}

export default RecipeForm