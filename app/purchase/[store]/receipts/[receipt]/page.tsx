import PurchaseForm from '@/app/components/purchase-form'
import { ReceiptDetails } from '@/app/lib/model/receipt'
import { Product } from "@/app/lib/model/product"
import { Store } from '@/app/lib/model/store'
import React from 'react'

interface Params {
    store: string
    receipt: string
}

interface Props {
    request: Request
    params: Params
}

const ReceiptPurchasePage = async (props: Props) => {
    const receipt_url = `${process.env.API_URL}/api/stores/${props.params.store}/receipts/${props.params.receipt}`;
    const products_url = `${process.env.API_URL}/api/products`;
    const store_url = `${process.env.API_URL}/api/stores/${props.params.store}`

    const [res, store_response, product_response] = await Promise.all([fetch(receipt_url, {cache: 'no-store'}), fetch(store_url), fetch(products_url)]);

    const store: Store = await store_response.json();
    const products: Product[] = await product_response.json();
    const receipt: ReceiptDetails = await res.json();

    return (
        <>
            <div className='mb-5'>
            <h3>{store.name} receipt processing</h3>
            <span>{receipt.location.name} {receipt.location.address}, {receipt.location.postal_code} {receipt.location.locality}</span> <br />
            <span>Purchased on {receipt.transaction_time}</span>
            </div>
            <datalist id="OptionsProduct">
                {products.map(product => 
                    <option key={product.id} data-value={product.id}>{product.name}</option>
                )}
            </datalist>
            {receipt.items.map(item =>
                <div key={item.barcode} className="card mb-3 ingredient-card">
                    <div className="card-body">
                        <PurchaseForm item={item} products={products} purchaseDate={receipt.transaction_time}></PurchaseForm>
                    </div>
                </div>
            )}
        </>
    );
}

export default ReceiptPurchasePage