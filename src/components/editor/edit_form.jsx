import React, { useRef, useState, memo } from 'react';
import styles from './edit_form.module.css';

const themes = ['default', 'black', 'green', 'gradient'];
const EditForm = memo(({ onChangeInput, card}) => {


    const handleChangeInput = (e) => {
        onChangeInput(e.target.name, e.target.value);
    }
    
    const handleRadioBtn = (e) => {
        e.target.dataset.for && onChangeInput('theme', e.target.dataset.for);
    }

    return (
    <>
        <div className={styles.container}>
            <div className={`${styles.name} ${styles.input_container}`}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input onChange={handleChangeInput} value={card.name} type="text" name="name" className={styles.input} />
            </div>
            <div className={styles.company}>
                <label htmlFor="company" className={styles.label}>Company</label>
                <input onChange={handleChangeInput} type="text" name="company" value={card.company} className={styles.input} />
            </div>
            <div className={styles.role}>
                <label htmlFor="role" className={styles.label}>Role</label>
                <input onChange={handleChangeInput} type="text" name="role" value={card.role} className={styles.input} />
            </div>
            <div className={styles.email}>
                <label htmlFor="email" className={styles.label}>E-Mail</label>
                <input onChange={handleChangeInput} type="text" name="email" value={card.email} className={styles.input}/>
            </div>
            <div className={styles.descriptions}>
                <label htmlFor="descriptions" className={styles.label}>Descriptions</label>
                <input onChange={handleChangeInput} type="text" name="descriptions" value={card.descriptions} className={styles.input} />
            </div>
            <div className={styles.theme}>
                <div className={styles.label}>Card Theme</div>
                <div className={styles.radios} onClick={handleRadioBtn}>
                {
                    themes.map(theme => {
                        if(theme === card.theme) {
                            return (
                                <div key={`${card.key}-${theme}`} className={styles.radio_container}>
                                    <div className={`${styles.radio_btn} ${styles.checked}`} data-for={theme}></div>
                                    <label className={styles.label} data-for={theme}>{theme}</label>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={`${card.key}-${theme}`} className={styles.radio_container}>
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
)});

export default EditForm;