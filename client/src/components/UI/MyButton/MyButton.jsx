import React from 'react';
import classes from './MyButton.module.css';

const MyButton = (props) => (
  <button className={classes.myButton} {...props}>
    {props.children}
  </button>
);

export default MyButton;
