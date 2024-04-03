import React from 'react'
import { Unit } from "../lib/model/unit";
import { ProductDetails } from "../lib/model/product";

const QuOptions = ({ product}: { product?: ProductDetails}) => {
    if (product != null && product !== undefined) {
        const result = (
            <>
                <option value={-1}></option>
                {product.conversions.map(c => 
                    <option key={c.from_unit.id} value={c.from_unit.id}>{c.from_unit.name}</option>
                )}
            </>
        );
        return result;
    } else {
        return (<option disabled value={-1}></option>);
    }
}

export default QuOptions