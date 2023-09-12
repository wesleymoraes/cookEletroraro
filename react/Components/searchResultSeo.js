import React, { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import './SearchResultSEO.css';

const CSS_HANDLES = [
  'SearchResultSEO',
  'SearchResultSEO-mainTitle',
  'SearchResultSEO-mainContent',
  'SearchResultSEO-sectionContent',
  'SearchResultSEO-bold ',
  'SearchResultSEO-italic',
  'SearchResultSEO-link',
  'SearchResultSEO-h1',
  'SearchResultSEO-h2',
  'SearchResultSEO-h3',
  'SearchResultSEO-ul',
  'SearchResultSEO-li',
  'SearchResultSEO-toggleButton',
];

const convertMarkdown = (text) => {
  let converted = text;

  // Convertendo texto em negrito
  converted = converted.replace(/\*\*(.*?)\*\*/g, '<strong class="SearchResultSEO-bold">$1</strong>');

  // Convertendo texto em itálico
  converted = converted.replace(/_(.*?)_/g, '<em class="SearchResultSEO-italic">$1</em>');

  // Convertendo links
  converted = converted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="SearchResultSEO-link">$1</a>');

  // Convertendo títulos
  converted = converted.replace(/^# (.*$)/gm, '<h1 class="SearchResultSEO-h1">$1</h1>');
  converted = converted.replace(/^## (.*$)/gm, '<h2 class="SearchResultSEO-h2">$1</h2>');
  converted = converted.replace(/^### (.*$)/gm, '<h3 class="SearchResultSEO-h3">$1</h3>');

  // Convertendo bullet points
  converted = converted.replace(/^\* (.*$)/gm, '<ul class="SearchResultSEO-ul"><li class="SearchResultSEO-li">$1</li></ul>');

  return converted;
};

const SearchResultSEO = ({  mainContent = '', sectionContent = '', shouldDisplay = true }) => {
  const handles = useCssHandles(CSS_HANDLES);
  const [expanded, setExpanded] = useState(false);
  if (!shouldDisplay) {
    return null;
  }

  return (
    <div className="ContainerSearchResultSEO">
      {mainContent && <p className={handles.mainContent} dangerouslySetInnerHTML={{ __html: convertMarkdown(mainContent) }} />}
      {expanded && <p className={handles.sectionContent} dangerouslySetInnerHTML={{ __html: convertMarkdown(sectionContent) }} />}
      {sectionContent && (
        <span
          onClick={() => setExpanded(!expanded)}
          className="SearchResultSEOToggleButton"
        >
          {expanded ? 'Ver menos' : 'Ver mais'}
        </span>
      )}
    </div>
  );
};


SearchResultSEO.schema = {
  title: 'Search Result SEO',
  description: 'Um componente para inserir título, conteúdo principal e conteúdo da seção',
  type: 'object',
  properties: {
    mainContent: {
      title: 'Conteúdo Principal',
      type: 'string',
      default: '',
      widget: {
        'ui:widget': 'textarea'
      }
    },
    sectionContent: {
      title: 'Conteúdo da Seção',
      type: 'string',
      default: '',
      widget: {
        'ui:widget': 'textarea'
      }
    },
    shouldDisplay: {
      title: 'Exibir componente',
      type: 'boolean',
      default: true,
      'ui:widget': 'toggle',
    }
  }
};

export default SearchResultSEO;
