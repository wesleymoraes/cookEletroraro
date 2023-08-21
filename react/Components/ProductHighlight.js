import React from "react";
import useProduct from "vtex.product-context/useProduct";

export default function ProductHighlight() {
  const productContext = useProduct();
  const highlights = productContext.product.clusterHighlights;

  const renderHighlight = (id) => {
    const highlight = highlights.find(hightlight => hightlight.id === id);
    return highlight ? <p className={`highlight-${id}`}>{highlight.name}</p> : null;
  };

  console.log(productContext.product)

  const renderInlineHighlights = (ids) => {
    return (
      <div className="inline-highlights">
        {ids.map(id => renderHighlight(id))}
      </div>
    );
  };

  const renderSingleHighlight = (id) => {
    return (
      <div className="single-highlight">
        {renderHighlight(id)}
      </div>
    );
  };

  return (
    <div className="ContainerHighlight">
      { renderInlineHighlights(['155', '227', '226', '223','630']) }
      { renderSingleHighlight('186') }
      { renderSingleHighlight('640') }
      { renderSingleHighlight('639') }
    </div>
  );
}
