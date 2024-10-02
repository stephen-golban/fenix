import React from 'react';
import styles from './index.module.css';
import DisabledContext from 'antd/es/config-provider/DisabledContext';

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ disabled, ...props }, ref) => {
  const contextDisabled = React.useContext(DisabledContext);
  return <input ref={ref} disabled={disabled || contextDisabled} className={styles.input} {...props} />;
});

export default CustomInput;
