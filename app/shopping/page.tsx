import React from 'react'
import { Store } from '../lib/model/store'
import GetOffersForm from '../components/get_offers_form'
import CreateShoppingListForm from '../components/create_shopping_list_form'
import ShoppingListNotesForm from '../components/shopping_list_notes_form'

const ShoppingList = async () => {
  const stores_response = await fetch(`${process.env.API_URL}/api/stores`, { next: { revalidate: 3600 } })
  const stores: Store[] = await stores_response.json()

  return (
    <div>
      <h5>Manage Shopping List</h5>
      <div className="card mb-3">
        <div className="card-body">
          <GetOffersForm stores={stores}></GetOffersForm>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <CreateShoppingListForm></CreateShoppingListForm>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <ShoppingListNotesForm></ShoppingListNotesForm>
        </div>
      </div>
    </div>

  )
}

export default ShoppingList