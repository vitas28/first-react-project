import React from 'react';
import classes from './MyTextArea.module.css';

const MyTextArea = (props) => (
  <textarea className={classes.MyTextArea} {...props} />
);

export default MyTextArea;
