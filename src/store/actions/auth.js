import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAILED} from './actionTypes'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,password,
      returnSecureToken:true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZZpOKmwiWcyMK9GjpODM4TwuSTQDDB9w'
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZZpOKmwiWcyMK9GjpODM4TwuSTQDDB9w'
    }
    try {
      const {data} = await axios.post(url, authData)     
      const expirationDate = new Date(new Date().getTime() + data.expiresIn *1000)
      console.log(data)
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)
      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))
    } catch (e) {    
      dispatch(authFailed(e))
    } 
     
      
  }
}

export function authFailed(error) {
  return {
    type: AUTH_FAILED,
    error
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
   
    if(!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))  
      if(expirationDate <= new Date()) {
      
        dispatch(logout())
      } else {
    
        dispatch(authSuccess(token))      
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())/1000))
      }
    }
  }
}

export function autoLogout(time) {
  return dispatch=> {
    setTimeout(()=> {    
      dispatch(logout())
    }, time* 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}