import React from 'react';
import styles from './Logo.module.css'
import logoSrc from '../../images/logo.png';

const logo = (props) => {
    return (
        <div className={styles.Wrapper}>
            <img src={logoSrc}></img>
        </div>
    )
}

export default logo;