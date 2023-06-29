import React from "react";
import useProduct from "vtex.product-context/useProduct";


export default function ProductHighlight() {
  const productContext = useProduct();
  const highlights = productContext.product.clusterHighlights;

  const handleButtonClick = () => {
    console.log("Contexto de Produto:", productContext);
    console.log("Cluster", highlights);
  };

  return (
    <div>
      <div className="ContainerHighlight">
        {highlights.slice(0, 3).map((highlight, index) => (
          <p key={index} className={`highlight-item-${highlight.name.toString().replace(" | ", "algumaCoisa").replace("5%", "Cinco").replace("10%", "Dez")}`}>
            {highlight.name}
          </p>
        ))}

        <button onClick={handleButtonClick}></button>
      </div>
    </div>
  );
}
