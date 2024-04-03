"use client"

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import LoadingButton from './loading-button';

const ShoppingListNotesForm = () => {
    const { register, formState: {isSubmitting }, handleSubmit } = useForm();


    const handleCreate: SubmitHandler<any> = async (formData) => {
        try {
            const res = await fetch(`/api/shopping_list/notes`);
        } catch (error) {
            alert('Creating shopping list notes failed. ' + error)
        }
    };

    return (
        <>
            <h5>Add Shopping List Notes</h5>
            <p>Needed only for android app until user fields are enabled</p>
            <form onSubmit={handleSubmit(handleCreate)}>
                <LoadingButton loading={isSubmitting} title='Add Notes' loadingText='Adding Notes' type="submit"></LoadingButton>
            </form>
        </>
    )
}

export default ShoppingListNotesForm