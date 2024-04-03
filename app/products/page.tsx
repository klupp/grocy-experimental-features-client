"use client";

import clsx from "clsx";
import { useState } from "react";
import LoadingButton from "../components/loading-button";

export default function Products() {
    const [loading, setLoading] = useState(false);

    const updateProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:8000/api/products/update');
            setLoading(false)
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    ;}

    return (
        <>
        <span>Click Fix Products to update products with OpenFoodFacts data.</span>
        <LoadingButton loading={loading} title="Fix Products" loadingText="Fixing..." onClick={updateProducts}></LoadingButton>
        </>
    )
}
