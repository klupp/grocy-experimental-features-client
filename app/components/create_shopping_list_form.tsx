"use client"

import React from 'react'
import LoadingButton from './loading-button'
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

interface FormData {
    max_stock_days: number;
}

const CreateShoppingListForm = () => {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<FormData>({
        mode: "all",
        defaultValues: {
            max_stock_days: 180
        }
    });


    const handleCreate: SubmitHandler<FormData> = async (formData) => {
        try {
            const res = await fetch(`/api/shopping_list?max_stock_days=${formData.max_stock_days}`);
        } catch (error) {
            alert('Offer collection failed. ' + error)
        }
    };

    return (
        <>
        <h5>Create Shopping List</h5>
        <form className='row' onSubmit={handleSubmit(handleCreate)}>
            <div className='col-9 col-xl-10'>
                <label htmlFor="max_stock_days">Max Stock Days<span className='text-danger'>*</span></label>
                <input className={clsx("form-control", { "is-invalid": errors.max_stock_days })} id="max_stock_days" type="number" step="1" {...register("max_stock_days", { required: "Max stock days required", min: 3 })} />
                <div className="invalid-feedback">
                    {errors.max_stock_days?.message}
                </div>
            </div>
            <div className='col-3 col-xl-2'>
                <LoadingButton loading={isSubmitting} title='Create' loadingText='Creating' type="submit" className='mt-4'></LoadingButton>
            </div>
        </form>
        </>
    );
}

export default CreateShoppingListForm