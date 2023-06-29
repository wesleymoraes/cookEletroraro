import useProduct from "vtex.product-context/useProduct";
import React, { useEffect, useState } from "react";
//import style from "../styles/ProductImage.css"

export default function ProductDescription() {
  const productContext = useProduct();
  const [sanitizedDescription, setSanitizedDescription] = useState("");

  useEffect(() => {
    if (productContext && productContext.product) {
      const description = productContext.product.description;
      const sanitizedHTML = sanitizeHTML(description);
      setSanitizedDescription(sanitizedHTML);
    }
  }, [productContext]);

  if (!productContext || !productContext.product) {
    return null;
  }

  const descriptionStyle = {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const containerStyle = {
    maxWidth: "100%",
    width: "100%",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#333",
    backgroundColor: "#f5f5f5",
  };

  const sanitizeHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const sanitizedHTML = tempDiv.innerHTML;
    return sanitizedHTML;
  };

  return (
    <div style={containerStyle}>
      {sanitizedDescription && (
        <>
          <span style={descriptionStyle}></span>
          <div
            className="description-container"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          ></div>
        </>
      )}
    </div>
  );
}