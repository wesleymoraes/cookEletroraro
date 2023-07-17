import React, { useState } from 'react';
import { useProduct } from 'vtex.product-context';
import classNames from 'classnames';

const CustomInstallments = () => {
  const parcelasMaximas = 10;
  const productContext = useProduct();

  if (!productContext || !productContext.product) return null;

  const {
    product: { priceRange },
  } = productContext;

  const { sellingPrice } = priceRange;
  const price = sellingPrice.lowPrice;
  const valorParcelaSemJuros = (price / parcelasMaximas).toFixed(2);

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const renderParcelas = (inicio, fim) => {
    const parcelas = [];
    for (let i = inicio; i <= fim; i++) {
      const valorParcela = (price / i).toFixed(2);
      parcelas.push(
        <p key={i}>{i}x de <b>{formatCurrency(valorParcela)}</b> sem juros</p>
      );
    }
    return parcelas;
  };

  return (
    <div className="CustomInstallmentsContainer">
      <div className="CustomInstallmentsColumn">
        <p>À vista: <b style={{ color: 'green' }}>{formatCurrency(price)}</b></p>
        <p>2x de <b>{formatCurrency(price / 2)}</b> sem juros</p>
        <p>3x de <b>{formatCurrency(price / 3)}</b> sem juros</p>
        <p>4x de <b>{formatCurrency(price / 4)}</b> sem juros</p>
        <p>5x de <b>{formatCurrency(price / 5)}</b> sem juros</p>
      </div>
      <div className="CustomInstallmentsColumn">
        {renderParcelas(6, 10)}
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleInstallments = () => {
    setIsOpen(!isOpen);
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
      <hr />
      {isOpen && <CustomInstallments />}
      {/* Outros componentes e informações da página */}
    </div>
  );
};

export default ProductPage;