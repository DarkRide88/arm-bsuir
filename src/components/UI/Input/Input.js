import React from 'react'
import styles from './Input.scss'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const inputType = props.type || 'text'
  const classes = [styles.input]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    classes.push(styles.invalid)
  }
  return (
    <div className={classes.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  )
}

export default Input
