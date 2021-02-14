import styles from './Auth.scss'
import React, {Component} from 'react' 
import Button from '../../components/UI/Button/Button'
import { renderControls} from '../../utils/formControlsUtils'
import { createControl, validate } from '../../form/formFramework'
// import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'
import { Redirect } from 'react-router-dom'


class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      login: createControl(
        {   
          placeholder:'Логин',       
          name:'login',         
          type:'text',
          errorMessage:'Введите логин',                
        },
        {required:true, login:true}),
      password: createControl(
        {        
          placeholder:'Пароль',  
          name:'password',          
          type:'password',
          errorMessage:'Введите пароль',             
        }
      , {required:true, password:true})       
    }
  }

  loginHangler = () => {
    this.props.auth(
      this.state.formControls.login.value,
      this.state.formControls.password.value,
      true
    )       
   
  }
  registerHangler = () => {
    
    this.props.auth(
      this.state.formControls.login.value,
      this.state.formControls.password.value,
      false
    )    
  }

  submitHandler (event) {
    event.preventDefault()
  }

  inputChangeHandler = (value,targetControl) => {  
    const formControls = {...this.state.formControls}   
    const control = {...formControls[targetControl.name] }

    control.value = value 
    control.touched = true
    control.valid = validate(value, targetControl.validation)

    let isFormValid = true

    Object.keys(formControls).forEach(name=> {
      isFormValid = formControls[name].valid && isFormValid   
    })
    

    formControls[targetControl.name]  = control    
    this.setState({
      formControls,
      isFormValid
    })

  };

  renderAuthInputs = ()  => { 
    return Object.values(this.state.formControls).map(control => {         
      return renderControls(control, this.inputChangeHandler)
    })
  }



  render() {
    return(
      <div className={styles.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form action="" onSubmit={this.submitHandler} className={styles.AuthForm}>         
            {renderControls(this.state.formControls,this.inputChangeHandler)}                   
            <Button 
              type="primary" 
              onClick={this.loginHangler}
              disabled={!this.state.isFormValid}
            >
            Войти
            </Button>
            <Button 
              type="primary" 
              onClick={this.registerHangler}
              disabled={!this.state.isFormValid}
            >
            Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}
function mapDispatchToProps(dispatch) {
  return {
    auth: (email,password,isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)