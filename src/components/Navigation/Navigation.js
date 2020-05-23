import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navigation.scss'

const links = [
  {to: '/', label: 'Список абитуриентов', exact:true},
  {to: '/create-enrolle', label: 'Зарегистрировать абитуриента', exact:true},
  {to: '/schedule', label: 'Расписание', exact:true},
  {to: '/exams', label: 'Экзамены', exact:true},
  {to: '/results', label: 'Результаты', exact:true},
]

class Navigation extends React.Component {
  
  
  renderLinks(links) {
    return links.map((link,index) => {
      return (
        <li key={index}>
         <NavLink 
          to={link.to} 
          exact={link.exact}       
          onClick={this.clickHandler}
        >
          {link.label}
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