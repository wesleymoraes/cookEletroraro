import React from 'react'
import { useProduct } from 'vtex.product-context';
import { getClusterDiscount } from './utils/getClusterDiscount';

const CustomPrice = () => {
    const localePriceSettings = {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
    };

    const productContext = useProduct();

    if (!productContext || productContext.product === null) return null;

    const product = productContext.product;
  
    if (!product.priceRange) return null;

    const {
      priceRange: {
        sellingPrice: {
            highPrice: value
        }
      },
      clusterHighlights
    } = product;

    const discount = getClusterDiscount(clusterHighlights);
    const endPrice = value - value * (discount / 100);

    return (
        <div style={{
            fontSize: '24px',
            fontWeight: 'Bold',
            marginBottom: '13px',
            color: discount > 0 ? '#1B9A28' : '#000'
        }}
        className='custom-price'>
            {endPrice.toLocaleString('pt-BR', localePriceSettings)} {discount > 0 && <span>à vista</span>}
        </div>
    )
}

export default CustomPrice