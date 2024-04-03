import { Receipt } from '@/app/lib/model/receipt'
import { Store } from '@/app/lib/model/store'
import Link from 'next/link'
import React from 'react'

interface Params {
  store: string
}

interface Props {
  request: Request
  params: Params
}

const PurchaseFromStorePage = async (props: Props) => {
  const store_url = `${process.env.API_URL}/api/stores/${props.params.store}`
  const receipts_url = `${process.env.API_URL}/api/stores/${props.params.store}/receipts`;

  const [store_res, receipts_res] = await Promise.all([fetch(store_url), fetch(receipts_url, {cache: 'no-store'})]);

  const store: Store = await store_res.json();

  const receipts: Receipt[] = await receipts_res.json();
  return (
    <>
      <h3>{store.name} receipts</h3>
      <span>select the receipt that you want to process.</span>
      <ul className="list-group">
        {receipts.map(receipt =>
          <li className='list-group-item' key={receipt.id}>
            <Link href={"/purchase/" + store.id + "/receipts/" + receipt.id}>
              <b>{receipt.transaction_time}</b>
              <br />
              {receipt.total_amount}{receipt.currency}
            </Link>
          </li>)}
      </ul>
    </>
  );
}

export default PurchaseFromStorePage