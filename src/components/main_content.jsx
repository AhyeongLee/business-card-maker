import React from 'react';
import Editor from './editor/editor';
import CardList from './card_list/card_list';
import styles from './main_content.module.css';

const MainContent = (props) => (
      <div className={styles.container}>
        <Editor />
        <CardList />
      </div>      
    );

export default MainContent;