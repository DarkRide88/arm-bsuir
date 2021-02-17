import React from 'react'
import styles from './PopUp.scss'
import Button from '../UI/Button/Button'
class PopUp extends React.Component {

  render () {
    return (
      <div className={styles['popup']}>
        <div>
          <p>{this.props.text}</p>
          <Button
            onClick = {this.props.onAccept}
            type="signIn"
          >
            Да
          </Button>
          <Button
            type="signIn"
            onClick = {this.props.onRefuse}
          >
            Нет
          </Button>
        </div>   
      </div>
    )
   
  }
} 

export default PopUp