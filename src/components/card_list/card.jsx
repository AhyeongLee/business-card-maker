import React, { useRef } from 'react';
import styles from './card.module.css';
import imgSrc from '../images/business-cards.png';


const Card = ({ card, onChangeInput }) => {
    const frontRef = useRef();
    const imageRef = useRef();
    const inputFileRef = useRef();

    const uploadImage = () => {
        console.log(inputFileRef.current);
        inputFileRef.current.click();
    }

    const handleClickCard = (e) => {
        const target = e.target;
        if (target.closest(`#${imageRef.current.id}`) || target === imageRef.current) {
            uploadImage();
            return;
        }
        if (target.closest(`#${frontRef.current.id}`) || target === frontRef.current) {
            frontRef.current.classList.toggle(styles.flipped);
        }
    }

    const handleImageUpload = (files) => {
        // const files = e.target.files;
        if (files.length === 0) return;
        
        console.log(files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            console.log(imageRef.current.firstChild);
            // onImageUpload(reader.result);
            onChangeInput('photo', reader.result);
        }, false);
    
        reader.readAsDataURL(files[0]);
        
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.target.classList.add(styles.dragover);
    }
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.target.classList.remove(styles.dragover);
    }
    const handleDrop = (e) => {
        e.preventDefault();
        console.log(e.dataTransfer.files);
        handleImageUpload(e.dataTransfer.files);
        e.target.classList.remove(styles.dragover);

    }
    return (
    <div className={styles.container} id={styles[card.theme]}>
        <input 
            ref={inputFileRef} 
            className={styles.input_file} 
            type="file" name="" id="" 
            accept="image/png, image/jpeg"
            onChange={e => {handleImageUpload(e.target.files)}}/>
        <div className={styles.background}></div>
        <div ref={frontRef} className={styles.front} id="flip" onClick={handleClickCard} >
            <div ref={imageRef} className={styles.photo_container} id="card-image" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} onDragExit={handleDragLeave} onDragStart={e => e.preventDefault()} onDragEnd={handleDragLeave} onDrag={e => e.preventDefault()} onDragOver={e => e.preventDefault()}>
                <img src={card.photo ? card.photo : imgSrc} alt="" className={`${styles.photo}`}/>
            </div>
            <h1 className={styles.name}>{card.name}</h1>
            <p className={styles.company}>{card.company}</p>
            <div className={styles.back}>
            
                <h1 className={styles.role}>{card.role}</h1>
                <p className={styles.email}>{card.email}</p>
                <p className={styles.descriptions}>{card.descriptions}</p>
            </div>
        </div>
        

    </div>
)};

export default Card;