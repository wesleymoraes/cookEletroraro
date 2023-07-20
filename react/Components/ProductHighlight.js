import React from "react";
import useProduct from "vtex.product-context/useProduct";


export default function ProductHighlight() {
  const productContext = useProduct();
  const highlights = productContext.product.clusterHighlights;

  return (
    <div className="ContainerHighlight">
      <div className="row-1">
        <span>
          {
            highlights.find(hightlight => hightlight.id === '155')?.name || ''
          }
        </span>
        <span>
          {
            highlights.find(hightlight => ['223', '226', '227'].includes(hightlight.id))?.name || ''
          }
        </span>
      </div>
    </div>
  );
}
