import React from 'react'
import styles from '../styles'

const CustomButton = ({title, handleClick, restStyles, type}) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${restStyles} text-gray-700 hover:bg-[#328A9A]`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default CustomButton