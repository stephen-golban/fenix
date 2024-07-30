import React from 'react';
import styles from './index.module.css';

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => {
  return <input ref={ref} className={styles.input} {...props} />;
});

export default CustomInput;
