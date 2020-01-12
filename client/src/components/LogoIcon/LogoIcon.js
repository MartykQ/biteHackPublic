import React from 'react';
import styles from './LogoIcon.module.css'
import logoSrc from '../../images/logo.png';

const logoIcon = (props) => {
    return (
        <div className={styles.Wrapper}>
            <img className={styles.imga} src={logoSrc}></img>
        </div>
    )
}

export default logoIcon;