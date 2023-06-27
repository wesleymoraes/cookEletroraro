import React from 'react';
import { InfoCard } from 'vtex.store-components';

const CustomInfoCard = ({ title = 'Título do Info Card', description = 'Descrição do Info Card', paragraph1 = 'Parágrafo 1', paragraph2 = 'Parágrafo 2', paragraph3 = 'Parágrafo 3', imageUrl = '', ctaText = 'Call to Action', ctaUrl = '' }) => {
  return (
    <InfoCard
      title={title}
      description={description}
      imageUrl={imageUrl}
      href={ctaUrl}
      ctaText={ctaText}
    >
      <p>{paragraph1}</p>
      <p>{paragraph2}</p>
      <p>{paragraph3}</p>
    </InfoCard>
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
    description: {
      title: 'Descrição',
      type: 'string',
      default: 'Descrição do Info Card'
    },
    paragraph1: {
      title: 'Parágrafo 1',
      type: 'string',
      default: 'Parágrafo 1'
    },
    paragraph2: {
      title: 'Parágrafo 2',
      type: 'string',
      default: 'Parágrafo 2'
    },
    paragraph3: {
      title: 'Parágrafo 3',
      type: 'string',
      default: 'Parágrafo 3'
    },
    imageUrl: {
      title: 'URL da Imagem',
      type: 'string',
      default: ''
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
