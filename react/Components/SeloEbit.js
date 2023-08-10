import React from 'react'
//import styles from './styles.css'

const SeloEbit = () => {
  return (
    <>
      <a
        id="seloEbit"
        href="http://www.ebit.com.br/cook-eletroraro"
        target="_blank"
        data-noop="redir(this.href);"
        rel="noreferrer"
      >
        <img 
        //className={styles['ebit-img']} 
        src="https://newimgebit-a.akamaihd.net/ebitBR/selo/img_91003.png" />
      </a>

      <script
        type="text/javascript"
        id="getSelo"
        src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?cook-eletroraro"
      >
      </script>
    </>
  )
}

export default SeloEbit
