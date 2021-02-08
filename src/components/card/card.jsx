import React, { memo, useRef } from 'react';
import styles from './card.module.css';
import { Image } from 'cloudinary-react';
import sha1 from 'sha1';

const Card = memo(({ card, onChangeInput, imageService }) => {
    const frontRef = useRef();
    const imageContainerRef = useRef();
    const inputFileRef = useRef();

    /**
     * Click input[type="file"] manually
     */
    const uploadImage = () => {
        inputFileRef.current.click();
    }

    /**
     * @param {files} files - files from input[type="file"]
     * Create FormData and pass it to ImageService.uploadImageToCloudinary()
     */
    const handleImageUpload = (files) => {
        if (files.length === 0) return;
        
        const FILE = files[0];
        if (FILE.type !== 'image/png' && FILE.type !== 'image/jpeg') {
            alert('png, jpeg 이미지 파일만 업로드 가능합니다.');
            return;
        }
        
        const TIMESTAMP = Math.floor(new Date().getTime() / 1000);
        const SIGN = sha1(`timestamp=${TIMESTAMP}${imageService.apiSecret}`);
        
        const formData = new FormData();
        formData.append('file', FILE);
        formData.append('api_key', imageService.apiKey);
        formData.append('timestamp', TIMESTAMP);
        formData.append('signature', SIGN);

        imageContainerRef.current.classList.add(styles.loading);

        imageService.uploadImageToCloudinary(formData)
        .then((public_id) => {
            onChangeInput('photo', public_id);
            imageContainerRef.current.classList.remove(styles.loading);
        });
    }

    // Upload profile photo by drag & drop
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
    // Upload profile photo by drag & drop END

    /**
     * @param {event} e 
     * For flip card animation
     */
    const handleClickCard = (e) => {
        const target = e.target;
        if (target.closest(`#${imageContainerRef.current.id}`) || target === imageContainerRef.current) {
            uploadImage();
            return;
        }
        if (target.closest(`#${frontRef.current.id}`) || target === frontRef.current) {
            frontRef.current.classList.toggle(styles.flipped);
        }
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
            <div ref={imageContainerRef} className={styles.photo_container} id="card-image" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} onDragExit={handleDragLeave} onDragStart={e => e.preventDefault()} onDragEnd={handleDragLeave} onDrag={e => e.preventDefault()} onDragOver={e => e.preventDefault()}>
                {card.photo ?
                <Image cloudName="ahyeong" publicId={card.photo} className={`${styles.photo}`} crop="scale" /> : 
                <Image cloudName="ahyeong" publicId="business_card_maker/business-cards_we9t9u.png" className={`${styles.photo}`} crop="scale" />}
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
)});

export default Card;