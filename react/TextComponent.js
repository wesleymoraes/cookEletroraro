import React from 'react';

const TextComponent = ({ text, exibirText, align, color, fontSize, margin, tag, center, bold, blockClass }) => {
  if (exibirText === false) {
    return null;
  }

  const Tag = tag || 'p';

  const textStyle = {
    textAlign: align,
    color: color,
    fontSize: fontSize,
    margin: margin,
    fontWeight: bold ? 'bold' : 'normal',
    display: center ? 'flex' : 'block',
    justifyContent: center ? 'center' : 'inherit',
    alignItems: center ? 'center' : 'inherit'
  };

  const componentClass = `TextComponent ${blockClass || ''}`;

  return (
    <div className={componentClass}>
      <Tag style={textStyle}>{text}</Tag>
    </div>
  );
};

TextComponent.schema = {
  title: "Componente de Texto",
  type: "object",
  properties: {
    text: {
      type: "string"
    },
    tag: {
      type: 'string',
      enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      default: 'p'
    },
    exibirText: {
      title: "Exibir Título",
      type: "boolean",
      default: false,
      "ui:widget": "toggle"
    },
    align: {
      title: "Alinhamento",
      type: "string",
      default: "left",
      enum: ["left", "center", "right"]
    },
    color: {
      title: "Cor do Texto",
      type: "string",
      default: "black"
    },
    fontSize: {
      title: "Tamanho da Fonte",
      type: "string",
      default: "16px"
    },
    margin: {
      title: "Margem",
      type: "string",
      default: "0"
    },
    center: {
      title: "Centralizar Texto",
      type: "boolean",
      default: false,
      "ui:widget": "toggle"
    },
    bold: {
      title: "Negrito",
      type: "boolean",
      default: false,
      "ui:widget": "toggle"
    },
    blockClass: {
      title: "Classe do Bloco (blockClass)",
      type: "string",
      default: ""
    }
  }
};

export default TextComponent;
