import RecipeForm from '@/app/components/recipe-form'
import { Product } from '@/app/lib/model/product'
import { Recipe } from '@/app/lib/model/recipe'
import React from 'react'

interface Params {
    url: string
}

interface Props {
    request: Request
    searchParams: Params
}

const CrawlRecipePage = async (props: Props) => {
    const [products_res, recipe_res] = await Promise.all([fetch(`${process.env.API_URL}/api/products`, {cache: 'no-store'}), fetch(`${process.env.API_URL}/api/recipes/crawl?url=${encodeURIComponent(props.searchParams.url)}`, {cache: 'no-store'})]);
    const products: Product[] = await products_res.json();
    const recipe: Recipe = await recipe_res.json();

    return (
        <div>
            <h3>Crawl <a href={recipe.url}>{recipe.name}</a></h3>
            <datalist id="OptionsProduct">
                {products.map(product => 
                    <option key={product.id} data-value={product.id}>{product.name}</option>
                )}
            </datalist>
            <RecipeForm products={products} recipe={recipe} />
        </div>
    );
}

export default CrawlRecipePage