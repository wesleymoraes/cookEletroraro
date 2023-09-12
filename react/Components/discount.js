import React from 'react';
import { useProduct } from 'vtex.product-context';
import { getClusterDiscount } from './utils/getClusterDiscount';

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

export default function Discount({ context = "plp" }) {
  const productContext = useProduct();

  if (!productContext || productContext.product === null) return null;

  const product = productContext.product;

  if (!product.priceRange) return null;

  const {
    priceRange: { sellingPrice },
    clusterHighlights
  } = product;

  if (!sellingPrice || sellingPrice.lowPrice === null) return null;

  const classHandle = classHandles[context];

  if (!classHandle) {
    console.error(`Invalid context: ${context}`);
    return null;
  }

  const discount = getClusterDiscount(clusterHighlights);

  const price = sellingPrice.lowPrice;
  const result = price - price * (discount / 100);

  return (
    <div className={classHandle.container}>
      {context === 'plp' && (
        <>
          <p className={classHandle.message}>
            {
              discount > 0 && `${price.toLocaleString('pt-BR', localePriceSettings)} à prazo ou`
            } em até 
          </p>
        </>
      )}
      {context === 'pdp' && (
        <>
          {
            discount > 0 && (
              <p className="pdp-message">
                {
                  discount >= 6 
                      ? `${discount}% de desconto à vista` 
                      : `preço à vista`
                }
              </p>
            )
          }
          {
            discount > 0 && (
              <>
                <p className="pdp-price">
                  {result.toLocaleString('pt-BR', localePriceSettings)}
                </p>
                <p className="pdp-message-2">
                  Preço a prazo
                </p>
              </>
            )
          }
          <p className="pdp-messageParcelado" style={{
            fontSize: discount > 0 ? "19px" : "25.5px",
          }}>
            {price.toLocaleString('pt-BR', localePriceSettings)}
          </p>
        </>
      )}
    </div>
  );
}
