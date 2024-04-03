import Link from 'next/link';
import React from 'react'
import { Store } from '../lib/model/store';

const PurchasePage = async () => {
    const res = await fetch(`${process.env.API_URL}/api/stores?can_fetch_receipts=true`, {cache: 'no-store'});
    const stores: Store[] = await res.json();
    return (
        <>
        <h3>Stores</h3>
        <span>select the store from which you made your purchase.</span>
        <ul className="list-group">
            {stores.map(store =>
                <li className='list-group-item' key={store.id}>
                    <Link href={"/purchase/" + store.id}>{store.name}</Link>
                </li>)}
        </ul>
        </>
    );
}

export default PurchasePage