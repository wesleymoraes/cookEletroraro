import React from 'react';
import styles from './GlobalStyles.css';

const CustomInfoCard = (data) => {
  return (
    <div className={styles["custom-info-card"]} style={{
      backgroundImage: `url(${
        window.innerWidth <= 768 ? data.imageUrlMobile : data.imageUrl
      })`
    }}>
      <div className={styles["custom-info-card__content"]}>
        <h2 className={styles["custom-info-card__title"]}>{data.title}</h2>
        <h3 className={styles["custom-info-card__subtitle"]}>{data.subtitle}</h3>
        <p className={styles["custom-info-card__description"]}>{data.description}</p>
        <a href={data.ctaUrl} className={styles["custom-info-card__cta"]}>{data.ctaText}</a>
      </div>
    </div>
  );
};

export default CustomInfoCard;

CustomInfoCard.schema = {
  title: 'Custom Info Card',
  type: 'object',
  properties: {
    title: {
      title: 'Título',
      type: 'string',
      default: 'Título do Info Card'
    },
    subtitle: {
      title: 'Subtítulo',
      type: 'string',
      default: 'Subtítulo do Info Card'
    },
    description: {
      title: 'Descrição',
      type: 'string',
      default: 'Descrição do Info Card'
    },
    imageUrl: {
      title: 'Imagem',
      type: 'string',
      default: '',
      widget: {
        'ui:widget': 'image-uploader'
      }
    },
    imageUrlMobile: {
      title: 'Imagem',
      type: 'string',
      default: '',
      widget: {
        'ui:widget': 'image-uploader'
      }
    },
    ctaText: {
      title: 'Texto do Botão CTA',
      type: 'string',
      default: 'Call to Action'
    },
    ctaUrl: {
      title: 'URL do Botão CTA',
      type: 'string',
      default: ''
    }
  }
};
