import React from 'react';
import styles from './edit_form.module.css';

const EditForm = (props) => (
    <>
        <div className={styles.container}>
            <label htmlFor="theme" className={styles.label}>Card Theme</label>
            <input type="text" name="theme" className={`${styles.input} ${styles.choice} ${styles.theme}`}/>
            
            <label htmlFor="name" className={styles.label}>Name</label>
            <input type="text" name="name" className={`${styles.input} ${styles.name}`} />
            
            <label htmlFor="company" className={styles.label}>Company</label>
            <input type="text" name="company" className={`${styles.input} ${styles.company}`} />
            
            <label htmlFor="role" className={styles.label}>Role</label>
            <input type="text" name="role" className={`${styles.input} ${styles.role}`} />
            
            <label htmlFor="email" className={styles.label}>E-Mail</label>
            <input type="text" name="email" className={`${styles.input} ${styles.email}`} />
            
            <label htmlFor="descriptions" className={styles.label}>Descriptions</label>
            <input type="text" name="descriptions" className={`${styles.input} ${styles.descriptions}`} />
        </div>
    </>
);

export default EditForm;