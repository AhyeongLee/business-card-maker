import React from 'react';
import styles from './loading.module.css';

const Loading = (props) => (
    <div className={styles.loading_container} >
        <div className={styles.spinner_container}>
            <i className={`fas fa-spinner ${styles.spinner}`}></i>
        </div>
    </div>
    );

export default Loading;