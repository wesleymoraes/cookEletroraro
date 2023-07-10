import React from "react";
import { useProduct } from "vtex.product-context";

const ProductImage = () => {
  const productContext = useProduct();

  if (!productContext || !productContext.product) {
    return null;
  }

  const { product } = productContext;
  const { items } = product;
  const { imageUrl } = items[0].images[0];

  const floatBottomContainerStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const floatBottomWrapperStyles = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    maxWidth: "1252px",
    margin: "auto",
    padding: "15px",
    boxSizing: "border-box",
    marginRight: "10px",
  };

  const floatBottomImageStyles = {
    width: "70px",
    height: "70px",
  };

  const floatBottomH3Styles = {
    fontSize: "20px",
    margin: "0",
  };

  const floatBottomPricesStyles = {
    display: "flex",
    flexDirection: "column",
  };

  const floatBottomListPriceStyles = {
    margin: "0",
    textDecoration: "line-through",
    color: "red",
    fontSize: "16px",
  };

  const floatBottomSellingPriceStyles = {
    fontWeight: "bold",
    fontSize: "17px",
    margin: "0",
  };

  const listPrice = productContext.product.priceRange.listPrice.highPrice;
  const sellingPrice = productContext.product.priceRange.sellingPrice.highPrice;

  function limitarCaracteres(texto, limite) {
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  }

  const nomeItemLimitado = limitarCaracteres(
    productContext.selectedItem.name,
    30
  );

  return (
    <div className="FloatBottomContainer" style={floatBottomContainerStyles}>
      <div className="FloatBottomWrapper" style={floatBottomWrapperStyles}>
        <img
          className="FloatBottomImage"
          src={imageUrl}
          alt={productContext.selectedItem.images[0]}
          style={floatBottomImageStyles}
        />
        <h4 className="FloatBottomH4" style={floatBottomH3Styles}>
          {nomeItemLimitado}
        </h4>
        <div className="FloatBottomPrices" style={floatBottomPricesStyles}>
          {listPrice === sellingPrice ? (
            <p
              className="FloatBottomSellingPrice"
              style={floatBottomSellingPriceStyles}
            >
              {sellingPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              })}
            </p>
          ) : (
            <>
              <p
                className="FloatBottomListPrice"
                style={floatBottomListPriceStyles}
              >
                {listPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                })}
              </p>
              <p
                className="FloatBottomSellingPrice"
                style={floatBottomSellingPriceStyles}
              >
                {sellingPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                })}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
