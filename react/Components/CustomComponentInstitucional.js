import React from 'react';
import styles from './GlobalStyles.css';

const Title = ({ text }) => {
  return <h1 className={styles['custom-card__title']}>{text}</h1>;
};

const Image = ({ src, alt }) => {
  return <img className={styles['custom-card__image']} src={src} alt={alt} />;
};

const Paragraph = ({ text, boldWord, className, before }) => {
  const iconBeforeStyle = {
    marginRight: '10px',
    position: 'relative',
    content: '""',
    backgroundSize: 'contain',
    width: '21px',
    display: 'block',
    height: '21px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: before && before.backgroundImage ? `url(${before.backgroundImage})` : 'none',
  };
  const paragraphStyle = {
   // display: 'flex',
    //alignItems: 'center',
  };

  const parts = boldWord ? text.split(boldWord) : [text];

  return (
    <p className={styles['custom-card__paragraph']} style={paragraphStyle}>
      {before && before.backgroundImage && <span className={styles['custom-card__icon-before']} style={iconBeforeStyle}></span>}
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>&nbsp;</span>}
          {index > 0 && <span className={styles['custom-card__boldWord']}>{boldWord}</span>}
          {index > 0 && <span>&nbsp;</span>}
          {part}
        </React.Fragment>
      ))}
    </p>
  );
};

const desktopPlaceholder = 'https://via.placeholder.com/623x250';
const mobilePlaceholder = 'https://via.placeholder.com/340x200';

const CustomCardLojas = ({ title, showImage, imageUrlDesktop, imageUrlMobile, sections }) => {
  const desktopImageUrl = imageUrlDesktop || desktopPlaceholder;
  const mobileImageUrl = imageUrlMobile || (imageUrlDesktop ? imageUrlDesktop : mobilePlaceholder);

  return (
    <div className={styles['custom-card']}>
      <Title text={title} />
      {showImage && <Image src={window.innerWidth <= 768 ? mobileImageUrl : desktopImageUrl} alt="Imagem" />}
      {sections &&
        sections.map((section, index) => {
          if (section.type === 'subtitle') {
            const subtitleStyle = {
              color: section.subtitleColor || '#000000',
            };
            return (
              <h2 key={index} className={styles['custom-card__subtitle']} style={subtitleStyle}>
                {section.text}
              </h2>
            );
          } else if (section.type === 'paragraph') {
            const paragraphClassName = styles[`custom-card__paragraph${index + 1}`];
            return (
              <Paragraph
                key={index}
                text={section.text}
                boldWord={section.boldWord}
                className={paragraphClassName}
                before={section.before}
              />
            );
          }
          return null;
        })}
    </div>
  );
};

CustomCardLojas.schema = {
  title: 'Componente CustomCardLojas',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Título',
      default: 'Título do Card',
    },
    showImage: {
      type: 'boolean',
      title: 'Mostrar Imagem',
      default: true,
    },
    imageUrlDesktop: {
      title: 'Imagem (Desktop)',
      type: 'string',
      default: desktopPlaceholder,
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    imageUrlMobile: {
      title: 'Imagem (Mobile)',
      type: 'string',
      default: '',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    sections: {
      title: 'Seções',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            title: 'Tipo',
            enum: ['subtitle', 'paragraph'],
            default: 'paragraph',
          },
          text: {
            type: 'string',
            title: 'Texto',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          boldWord: {
            type: 'string',
            title: 'Palavra em negrito',
          },
          before: {
            type: 'object',
            title: 'Ícone antes do parágrafo',
            properties: {
              backgroundImage: {
                type: 'string',
                title: 'URL da imagem do ícone',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
            },
          },
          subtitleColor: {
            type: 'string',
            title: 'Cor do Subtítulo',
            default: '#000000',
            widget: {
              'ui:widget': 'color',
            },
          },
        },
      },
    },
  },
};

export default CustomCardLojas;