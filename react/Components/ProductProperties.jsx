import React from "react";
import useProduct from "vtex.product-context/useProduct";

function ProductProperties() {
  const { product } = useProduct();

  if (!product || !product.properties) {
    return null;
  }

  const styles = {
    propertiesContainer: {},
    propertiesTable: {
      width: '80vw',
      margin:'10px auto',
      borderCollapse: 'collapse',
    },
    propertyRow: {},
    propertyKey: {
      border: '1px solid #ccc',
      padding: '8px 12px',
      fontWeight: 'bold',
    },
    propertyValue: {
      border: '1px solid #ccc',
      padding: '8px 12px',
    },
  };

  return (
    <div style={styles.propertiesContainer}>
      <table style={styles.propertiesTable}>
        <tbody>
          {product.properties.map((property, index) => (
            <tr className="rowTable" key={index} style={styles.propertyRow}>
              <td style={styles.propertyKey}>{property.name}</td>
              <td style={styles.propertyValue}>{property.values.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductProperties;
