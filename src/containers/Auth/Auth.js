import styles from './Auth.scss'
import React, {Component} from 'react' 
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
export default class Auth extends Component {

  state = {
    formControls: {
      login: {

      },
      password: {
        
      }
    }
  }

  loginHangler = () => {

  }
  registerHangler = () => {

  }

  submitHandler (event) {
    event.preventDefault()
  }




  render() {
    return(
      <div className={styles.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form action="" onSubmit={this.submitHandler} className={styles.AuthForm}>
            <Input
             placeholder = 'Логин'
            ></Input>
            <Input
              placeholder = 'Пароль'
            ></Input>
            <Button 
              type="primary" 
              onClick={this.loginHangler}
            >
            Войти
            </Button>
            <Button 
              type="primary" 
              onClick={this.registerHangler}
            >
            Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}