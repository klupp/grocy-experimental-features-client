'use client'

import React from 'react'
import LoadingButton from '../components/loading-button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

type CrawlFormData = {
    url: string
}

const RecipesPage = () => {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<CrawlFormData>();
    const router = useRouter()

    const handleCrawl: SubmitHandler<CrawlFormData> = async (formData) => {
        try {
            router.push(`/recipes/crawl?url=${encodeURIComponent(formData.url)}`);
        } catch (error) {
            alert('Purchase failed. ' + error)
        }
    };

    return (
        <>
        <h3>Crawl Recipe From URL</h3>
        <form onSubmit={handleSubmit(handleCrawl)} className='row'>
            <div className="col-12 col-xl-11 col-xxl-11">
                <input className={clsx("form-control", {
                    "is-invalid": errors.url
                })} id="recipe_url" placeholder="Recipe URL" {...register("url", { required: "Recipe Url Required." })} />
                <div className="invalid-feedback">
                    {errors.url?.message}
                </div>
            </div>
            <div className="col-12 col-xl-1 col-xxl-1">
                <LoadingButton loading={isSubmitting} title='Crawl' loadingText='Crawl' type="submit" />
            </div>
        </form>
        </>
    )
}

export default RecipesPage