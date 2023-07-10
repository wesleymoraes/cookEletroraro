import React from 'react';

const TituloVitrine = ({ paragraph, span1, span2 }) => {
  return (
    <div className="text-block-container">
      <p className="text-block-paragraph">
        {paragraph}
      </p>
        <span className="text-block-span1">{span1}</span>
        <span className="text-block-span2">{span2}</span>
    </div>
  );
};

TituloVitrine.schema = {
  title: 'Text Block',
  type: 'object',
  properties: {
    paragraph: {
      title: 'Parágrafo',
      type: 'string',
      default: 'Texto do parágrafo',
    },
    span1: {
      title: 'Span 1',
      type: 'string',
      default: 'Texto do span 1',
    },
    span2: {
      title: 'Span 2',
      type: 'string',
      default: 'Texto do span 2',
    },
  },
};

export default TituloVitrine;
