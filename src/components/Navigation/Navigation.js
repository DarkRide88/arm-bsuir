import React from 'react'
import styles from './Navigation.scss'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import  DarkenMode  from '../DarkenMode/DarkenMode'



class Navigation extends React.Component {

 renderLinks(links) {
  return links.map((link,index) => {
    return (
      <li key={index}>
       <NavLink 
        to={link.to} 
        exact={link.exact}   
        className={link.className}
        activeClassName={link.activeClassName}
      >
        {link.label}
        <div></div>
      </NavLink>     
      </li>
    )
  })
}

  render () {
    const links = [      
      {to: '/schedule', label: 'Расписание', exact:true, className:styles['inactive'], activeClassName:styles['active']},     
      {to: '/results', label: 'Результаты', exact:true, className:styles['inactive'], activeClassName:styles['active']},      
    ]
    if(this.props.isAuthentificated) {    
      links.push( {to: '/faculties', label: 'Факультеты', exact:true, className:styles['inactive'], activeClassName:styles['active']})
      links.push({to: '/', label: 'Список абитуриентов', exact:true, className:styles['inactive'], activeClassName:styles['active']})
      links.push( {to: '/create-enrolle', label: 'Зарегистрировать абитуриента', exact:true, className:styles['inactive'], activeClassName:styles['active']})
      links.push({to: '/exams', label: 'Экзамены', exact:true, className:styles['inactive'], activeClassName:styles['active']})
      links.push({to: '/logout', label: 'Выйти', exact:true, className:styles['inactive'], activeClassName:styles['active']})
     
    } else {
      links.push({to: '/auth', label: 'Войти', exact:true, className:styles['inactive'], activeClassName:styles['active']})
    }
    return (
      <nav className={styles['nav']}>
        <ul>
          { this.renderLinks(links) }          
        </ul>
        <DarkenMode></DarkenMode>
      </nav>
    )   
  }
}

function mapStateToProps(state) {
  return {
    isAuthentificated: state.authReducer.token
  }
}

export default connect(mapStateToProps)(Navigation)