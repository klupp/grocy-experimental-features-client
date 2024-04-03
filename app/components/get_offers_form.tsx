'use client'

import React from 'react'
import { Store } from '../lib/model/store'
import LoadingButton from './loading-button';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

interface Props {
    stores: Store[];
}

interface FormData {
    stores: number[];
    shopping_date: string;
}

const GetOffersForm = (props: Props) => {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<FormData>({
        mode: "all",
        defaultValues: {
            stores: [],
            shopping_date: new Date().toISOString().substring(0, 10)
        }
    });

    const handleCollect: SubmitHandler<FormData> = async (formData) => {
        try {
            const res = await fetch(`/api/offers`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        } catch (error) {
            alert('Offer collection failed. ' + error)
        }
    };

    return (
        <>
            <h4>Collect offers</h4>
            <form className='row' onSubmit={handleSubmit(handleCollect)}>
                <div className='col-12 col-xl-6 mb-2'>
                    <label htmlFor="offer_stores">Stores</label>
                    <select id="offer_stores" className='form-control' multiple {...register('stores')}>
                        {props.stores.map(store => {
                            return (<option key={store.id} value={store.name}>{store.name}</option>)
                        })}
                    </select>
                </div>
                <div className='col-9 col-xl-4 mb-2'>
                    <label htmlFor="offer_shopping_date">Shopping Date<span className='text-danger'>*</span></label>
                    <input id="offer_shopping_date" className={clsx("form-control", { "is-invalid": errors.shopping_date })} type="date" {...register("shopping_date", { required: "Date Required" })} />
                    <div className="invalid-feedback">
                        {errors.shopping_date?.message}
                    </div>
                </div>
                <div className='col-3 col-xl-2 mb-2'>
                    <LoadingButton loading={isSubmitting} title='Collect' loadingText='Collecting' type='submit' className='mt-4'></LoadingButton>
                </div>
            </form>
        </>
    )
}

export default GetOffersForm