import React from 'react'
import styles from '../styles';

const InputField = ( {label, placeHolder, value, handleValueChange }) => {
  return (
    <>
      <label htmlFor="name" className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeHolder}
        value={value}
        onChange={handleValueChange}
        className={styles.input}
      />
    </>
  );
}

export default InputField