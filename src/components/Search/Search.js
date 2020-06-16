import React from 'react'
import styles from './Search.scss'



const Search = props => {
  const inputType = props.type || 'text'
  const classes = [styles.search]

  return (
    <div className={classes.join(' ')}>   
      <input    
        type={inputType}       
        onChange={props.onChange}
        placeholder={props.placeholder}
      />

      {/* {
        isInvalid(props)
          ? <span className={styles['error-message']}>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      } */}
    </div>
  )
}

export default Search
