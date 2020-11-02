import React from 'react'
import styles from './Input.scss'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const inputType = props.type || 'text'
  const classes = [styles.input]
  const htmlFor = `${inputType}-${Math.random()}`
  classes.push(props.className)
  if (isInvalid(props)) {
    classes.push(styles.invalid)  
  }
  return (
    <div className={classes.join(' ') }>
      <label htmlFor={htmlFor} >{props.label}</label>
      <input
        
        maxLength={props.maxlength}
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
   
       
      />

      {
        isInvalid(props)
          ? <span className={styles['error-message']}>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  )
}

export default Input
