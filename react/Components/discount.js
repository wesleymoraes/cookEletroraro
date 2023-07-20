import React from 'react';
import { useProduct } from 'vtex.product-context';

const localePriceSettings = {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
};

const classHandles = {
  plp: {
    container: 'discount-container-shelf plp',
    message: 'discount-message-shelf plp-message',
    price: 'discount-price-shelf plp-price',
  },
  pdp: {
    container: 'discount-container pdp',
    message: 'discount-message pdp-message',
    price: 'discount-price pdp-price',
  },
};

export default function Discount({ context }) {
  const productContext = useProduct();

  if (!productContext || productContext.product === null) return null;

  const product = productContext.product;

  if (!product.priceRange) return null;

  const {
    priceRange: { sellingPrice },
  } = product;


  if (!sellingPrice || sellingPrice.lowPrice === null) return null;

  const price = sellingPrice.lowPrice;
  const result = price - price * 0.05;

  const classHandle = classHandles[context];

  if (!classHandle) {
    console.error(`Invalid context: ${context}`);
    return null;
  }

  return (
    <div className={classHandle.container}>
      {context === 'plp' && (
        <>
          <p className={classHandle.message}>
            {result.toLocaleString('pt-BR', localePriceSettings)} à vista com 5% de desconto ou em até
          </p>
        </>
      )}
      {context === 'pdp' && (
        <>
          <p className="pdp-message">
            5% de desconto à vista
          </p>
          <p className="pdp-price">
            {result.toLocaleString('pt-BR', localePriceSettings)}
          </p>
          <p className="pdp-message-2">
            Preço a prazo
          </p>
          <p className="pdp-messageParcelado">
            {price.toLocaleString('pt-BR', localePriceSettings)}
          </p>
        </>
      )}
    </div>
  );
}
