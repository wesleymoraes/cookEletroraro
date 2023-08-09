import react, {
    useLayoutEffect
} from 'react';

const Ebit = () => {
    useLayoutEffect(() => {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<script type="text/javascript" id="getSelo" src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?11527"> </script>')

    }, [])

    return  <a id="seloEbit" href="http://www.ebit.com.br/11527" target="_blank" data-noop="redir(this.href);"> </a>
}

export default Ebit



//<script type="text/javascript" id="getSelo" src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?11527"> </script>