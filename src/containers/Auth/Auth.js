import styles from './Auth.scss'
import React, {Component} from 'react' 
import Button from '../../components/UI/Button/Button'
import { renderControls} from '../../utils/formControlsUtils'
import { createControl, validate } from '../../form/formFramework'
import { connect } from 'react-redux'
import { auth, authFailed } from '../../store/actions/auth'


class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      login: createControl(
        {   
          placeholder:'Логин',       
          name:'login',         
          type:'email',
          errorMessage:'Некорректный email',                
        },
        {required:true, email:true}),
      password: createControl(
        {        
          placeholder:'Пароль',  
          name:'password',          
          type:'password',
          errorMessage:'Пароль должен содержать минимум 5 символов',             
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
    this.props.authFailed(null)
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
  componentDidMount() {  
    document.title = 'Вход'
  }


  render() {
    return(
      <div className={styles.Auth}>
        <div>
         
          <form action="" onSubmit={this.submitHandler} className={styles.AuthForm}>         
            <h1>Вход в АРМ</h1>         
            {renderControls(this.state.formControls,this.inputChangeHandler)}    
            {this.props.error != null ? <span className={styles.ErrorMessage}>Неверный логин или пароль</span> : null}               
            <Button 
              type="signIn" 
              onClick={this.loginHangler}
              disabled={!this.state.isFormValid}
            >           
            <span>Войти</span>
            </Button>
            {/* <Button 
              type="primary" 
              onClick={this.registerHangler}
              disabled={!this.state.isFormValid}
            >
            Зарегистрироваться
            </Button> */}
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.authReducer.error
  }
}
function mapDispatchToProps(dispatch) {
  return {
    auth: (email,password,isLogin) => dispatch(auth(email, password, isLogin)),
    authFailed: (error) => dispatch(authFailed(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)