import react, {
    useLayoutEffect
} from 'react';
import styles from './GlobalStyles.css';

export default function GlobalStyles() {

    useLayoutEffect(() => {(function() {
        window._callbackSettings = {
          id: '5RKSwY'
        };
      
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            js = d.createElement(s); js.id = '5RKSwY';
            js.src = 'https://assets.callnow.com.br/widget.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', '5RKSwY');
      }());
    }, [])

    return <div className={styles.pixelStyle}></div>;
}