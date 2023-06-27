import React, { useState } from 'react';
import { useProduct } from 'vtex.product-context';
import classNames from 'classnames';

const CustomInstallments = () => {
    const parcelasMaximas = 10;
    const productContext = useProduct();

    const localePriceSettings = {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
    };
    if (!productContext || !productContext.product) return null;
    
    const {
        product: { priceRange },
    } = productContext;
    
    const { sellingPrice } = priceRange;
    const price = sellingPrice.lowPrice;
    
    const valorParcelaSemJuros = (price / parcelasMaximas).toFixed(2);
    const valorParcelaComJuros = (price / parcelasMaximas * 1.1).toFixed(2);
    
 
    return (
        <div className="CustomInstallmentsContainer">
            <div>
                <p>À vista: R$ {price.toFixed(2).toLocaleString('pt-BR', localePriceSettings).toString().replace(".", ",")}</p>
                {[2, 3, 4, 5].map((parcela) => (
                    <p key={parcela}>{parcela}x de <b>R$ {valorParcelaSemJuros.toLocaleString('pt-BR', localePriceSettings).toString().replace(".", ",")}</b> sem juros</p>
                ))}
            </div>
            <div>
                {[6, 7, 8, 9, 10].map((parcela) => (
                    <p key={parcela}>{parcela}x de <b>R$ {valorParcelaComJuros.toLocaleString('pt-BR', localePriceSettings).toString().replace(".", ",")}</b> com juros</p>
                ))}
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

    return (
        <div>
            <button href="#" className={linkClasses} onClick={handleToggleInstallments}>
                {isOpen ? 'Fechar opções de parcelamento' : 'Ver opções de parcelamento'}
            </button>
            <hr></hr>
            {isOpen && <CustomInstallments />}
            {/* Outros componentes e informações da página */}
        </div>
    );
};

export default ProductPage;
