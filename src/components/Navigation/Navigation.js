import React from 'react'
import styles from './Navigation.scss'
import {NavLink} from 'react-router-dom'

const links = [
  {to: '/create-enrolle', label: 'Зарегистрировать абитуриента', exact:true, className:styles['inactive'], activeClassName:styles['active']},
  {to: '/', label: 'Список абитуриентов', exact:true, className:styles['inactive'], activeClassName:styles['active']}, 
  {to: '/schedule', label: 'Расписание', exact:true, className:styles['inactive'], activeClassName:styles['active']},
  {to: '/exams', label: 'Экзамены', exact:true, className:styles['inactive'], activeClassName:styles['active']},
  {to: '/results', label: 'Результаты', exact:true, className:styles['inactive'], activeClassName:styles['active']},
  {to: '/faculties', label: 'Факультеты', exact:true, className:styles['inactive'], activeClassName:styles['active']},
]

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
    return (
      <nav className={styles['nav']}>
        <ul>
          { this.renderLinks(links) }          
        </ul>
      </nav>
    )   
  }
}

export default Navigation