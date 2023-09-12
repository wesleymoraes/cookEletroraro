import React from "react";
import useProduct from "vtex.product-context/useProduct";
export default function ProductHighlight() {
  const productContext = useProduct();
  const highlights = productContext.product.clusterHighlights;
  console.log('highlights', highlights);
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
  const renderDiscountFlag = () => {
    const matchClusterDiscount = /a vista [0-9]*\% off/gi;
    const discountCluster = highlights.filter((highlight) => matchClusterDiscount.test(highlight.name));
    if (discountCluster.length > 0) {
      const [
        {
          id: clusterId,
          name: clusterName,
        }
      ] = discountCluster;
      const discountValue = parseInt(clusterName.match(/[0-9]+/g)[0]);
      if (discountValue <= 5) return null;
      renderHighlight(clusterId);
    }
    return null;
  }
  return (
    <div className="ContainerHighlight">
      {renderDiscountFlag()}
      {renderSingleHighlight('630')}
      {renderSingleHighlight('223')}
      {renderSingleHighlight('226')}
      {renderSingleHighlight('186')}
      {renderSingleHighlight('640')}
      {renderSingleHighlight('639')}
    </div>
  );
}