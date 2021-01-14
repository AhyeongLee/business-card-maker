import React, { useRef, useState } from 'react';
import styles from './edit_form.module.css';

const themes = ['default', 'black'];
const EditForm = (props) => {

    const handleChangeInput = (e) => {
        props.onChangeInput(e.target.name, e.target.value);
    }
    

    return (
    <>
        <div className={styles.container}>
            <div className={styles.name}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input onChange={handleChangeInput} value={props.card.name} type="text" name="name" className={styles.input} />
            </div>
            <div className={styles.company}>
                <label htmlFor="company" className={styles.label}>Company</label>
                <input onChange={handleChangeInput} type="text" name="company" value={props.card.company} className={styles.input} />
            </div>
            <div className={styles.role}>
                <label htmlFor="role" className={styles.label}>Role</label>
                <input onChange={handleChangeInput} type="text" name="role" value={props.card.role} className={styles.input} />
            </div>
            <div className={styles.email}>
                <label htmlFor="email" className={styles.label}>E-Mail</label>
                <input onChange={handleChangeInput} type="text" name="email" value={props.card.email} className={styles.input}/>
            </div>
            <div className={styles.descriptions}>
                <label htmlFor="descriptions" className={styles.label}>Descriptions</label>
                <input onChange={handleChangeInput} type="text" name="descriptions" value={props.card.descriptions} className={styles.input} />
            </div>
            <div className={styles.theme}>
                <div className={styles.label}>Card Theme</div>
                <div className={styles.radios}>
                    {
                        themes.map(theme => {
                            if(theme === props.card.theme) {
                                return (
                                    <div className={styles.radio_container}>
                                        <div className={`${styles.radio_btn} ${styles.checked}`} data-for={theme}></div>
                                        <label className={styles.label}>{theme}</label>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className={styles.radio_container}>
                                        <div className={styles.radio_btn} data-for={theme}></div>
                                        <label className={styles.label}>{theme}</label>
                                    </div>
                                )
                            }
                            
                        })
                    }
                    
                </div>
            </div>
        </div>
    </>
)};

export default EditForm;