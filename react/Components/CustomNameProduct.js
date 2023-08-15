import React from "react";
import useProduct from "vtex.product-context/useProduct";

const CustomNameProduct = () => {
  const productContext = useProduct();

  const productName = productContext.product.productName.substring(0, 50);

  const formattedProductName =
    productContext.product.productName.length > 50
      ? `${productName}...`
      : productName;

  return (
    <div>
      <p
        style={{
          color: "#000000",
          textAlign: "center",
          font: "normal normal 600 14px/18px Manrope",
          letterSpacing: "0px",
          color: "#000000",
          opacity: 1,
        }}
      >
        {formattedProductName}
      </p>
    </div>
  );
};

export default CustomNameProduct;
