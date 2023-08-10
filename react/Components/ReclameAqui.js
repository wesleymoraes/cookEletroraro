import React from "react";
import RAregular from '../../assets/RAregular.png';

const ReclameAqui = () => {

    const styles = {
        link: {
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        container: {
            backgroundColor: '#fff',
            borderRadius: '4px',
            border: '1px solid #a4c929',
            alignContent: 'center',
            userSelect: 'none',
            cursor: 'pointer'
        },
        mainImage: {
            height: '48px',
            width: 'auto',
            display: 'flex',
            margin: '6px auto 0',
        },
        reputationContainer: {},
        logoImage: {
            height: '10.75px',
            width: 'auto',
            marginBottom: '2px',
            padding: '2px',
        },
        reputationContent: {
            display: 'flex',
            margin: '2px auto 2px',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 'bold'
        }
    };

    return (
        <a style={styles.link} target="_blank" href="https://www.reclameaqui.com.br/empresa/cozinhas-cook-eletroraro/">
            <div style={styles.container}>
                <img style={styles.mainImage} src={RAregular} alt="Reclame Aqui Rating" />
                <div style={styles.reputationContainer} id="reputation-ra">
                    <p style={styles.reputationContent}>Regular</p>
                    <img style={styles.logoImage} src="https://s3.amazonaws.com/raichu-beta/selos/assets/images/reclame-aqui-logo.svg" alt="Reclame Aqui Logo" />
                </div>
            </div>
        </a>
    );
};

export default ReclameAqui;
