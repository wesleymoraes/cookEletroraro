import React, { useState } from 'react';
import { useProduct } from 'vtex.product-context';
import classNames from 'classnames';
import { getClusterDiscount } from './utils/getClusterDiscount';

const CustomInstallments = () => {
  const parcelasMaximas = 10;
  const productContext = useProduct();

  if (!productContext?.product) return null;

  const {
    product: { priceRange, clusterHighlights },
  } = productContext;

  const discountPercentage = getClusterDiscount(clusterHighlights);
  const price = priceRange.sellingPrice.lowPrice;

  const precoFinal = applyDiscount(price, discountPercentage);

  const renderInstallment = (installmentNumber) => (
    <p>
      {installmentNumber}x de <b>{formatCurrency(price / installmentNumber)}</b> sem juros
    </p>
  );

  return (
    <div className="CustomInstallmentsContainer">
      <div className="CustomInstallmentsColumn">
        <p>À vista: <b style={{ color: 'green' }}>{formatCurrency(precoFinal)}</b></p>
        {Array.from({ length: 4 }, (_, i) => renderInstallment(i + 2))}
      </div>
      <div className="CustomInstallmentsColumn">
        {Array.from({ length: 5 }, (_, i) => renderInstallment(i + 6))}
      </div>
    </div>
  );
};

const applyDiscount = (price, discountPercentage) => {
  const percentageDiscount = discountPercentage / 100;
  return price * (1 - percentageDiscount);
};

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ProductPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleInstallments = () => {
    setIsOpen(prevOpen => !prevOpen);
  };

  const linkClasses = classNames({
    'CustomInstallmentsOpen': isOpen,
    'CustomInstallmentsClosed': !isOpen,
  });

  const arrowStyle = {
    width: '15px',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.6s ease',
    marginLeft:'10px'
  };

  return (
    <div>
      <button href="#" className={linkClasses} onClick={handleToggleInstallments}>
        {isOpen ? 'Fechar opções de parcelamento ' : 'Ver opções de parcelamento '}
        <img src="https://cookeletroraro.vtexassets.com/assets/vtex/assets-builder/cookeletroraro.store-theme/0.0.0/icons/angulo-para-baixo___621e8f8f6218d053b5847b62646237d4.png" alt="Seta" style={arrowStyle} />
      </button>
      {isOpen && <CustomInstallments />}
    </div>
  );
};

export default ProductPage;
