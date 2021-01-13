import React from 'react';
import EditForm from './edit_form';
import styles from './editor.module.css';

const Editor = (props) => (
        <div className={styles.container}>
            <h1 className={styles.title}>Card Editor</h1>
            <EditForm/>
        </div>
    );

export default Editor;