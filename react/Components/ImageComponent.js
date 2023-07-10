import styles from './GlobalStyles.css';

const ImageComponent = ({
  exibirImagem = true,
  imageUrl,
  imageUrlMobile,
  imageStyle = {},
  loadingType = 'lazy',
  alt = 'Imagem',
  className = '',
}) => {
  const isMobile = window.innerWidth <= 768;

  if (!exibirImagem) {
    return null;
  }

  const placeholderImageUrl = isMobile ? 'https://via.placeholder.com/320x240' : 'https://via.placeholder.com/640x480';

  // Adicione o prefixo "custom-image-component" à classe CSS
  const customClass = `${styles["custom-image-component"]} ${className}`;

  return (
    <div>
      <img
        src={isMobile ? imageUrlMobile || placeholderImageUrl : imageUrl || placeholderImageUrl}
        alt={alt}
        loading={loadingType}
        className={customClass}
        style={imageStyle}
      />
    </div>
  );
};

ImageComponent.schema = {
  title: 'Componente de Imagem',
  type: 'object',
  properties: {
    exibirImagem: {
      title: 'Exibir Imagem',
      type: 'boolean',
      default: true,
      'ui:widget': 'toggle',
    },
    imageUrl: {
      title: 'URL da Imagem',
      type: 'string',
      default: '',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    imageUrlMobile: {
      title: 'URL da Imagem (Mobile)',
      type: 'string',
      default: '',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    imageStyle: {
      title: 'Estilo Adicional da Imagem',
      type: 'object',
      properties: {
        margin: {
          title: 'Margem',
          type: 'string',
          default: '',
        },
        // Adicione outras propriedades CSS conforme necessário
      },
    },
    loadingType: {
      title: 'Tipo de Carregamento',
      type: 'string',
      enum: ['lazy', 'eager'],
      enumNames: ['Carregamento Lento', 'Carregamento Rápido'],
      default: 'lazy',
    },
    alt: {
      title: 'Texto Alternativo',
      type: 'string',
      default: 'Imagem',
    },
    className: {
      title: 'Classe CSS',
      type: 'string',
      default: '',
    },
  },
};

export default ImageComponent;
