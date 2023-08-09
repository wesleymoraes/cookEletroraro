import React from 'react'
import { useProduct } from 'vtex.product-context';

const CustomPrice = () => {
    const localePriceSettings = {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
    };

    const productContext = useProduct();
    const value = productContext.product.priceRange.listPrice.highPrice
    const endPrice = value - value * 0.05;

    console.log(productContext)
    return (
        <div style={{
            fontSize: '24px',
            fontWeight: 'Bold',
            marginBottom: '13px',
        }}>
            {endPrice.toLocaleString('pt-BR', localePriceSettings)}

        </div>
    )
}

export default CustomPrice