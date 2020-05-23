import React from 'react'
import styles from './Loader.scss'

const Loader = props => (
  <div className={styles.center}>
    <div className={styles['lds-ripple']}>
      <div/><div/>
    </div>
  </div>
 
)

export default Loader