import React from 'react'

import styles from './Navigation.scss'
import {renderLinks} from '../../form/links'
const links = [
  {to: '/', label: 'Список абитуриентов', exact:true},
  {to: '/create-enrolle', label: 'Зарегистрировать абитуриента', exact:true},
  {to: '/schedule', label: 'Расписание', exact:true},
  {to: '/exams', label: 'Экзамены', exact:true},
  {to: '/results', label: 'Результаты', exact:true},
  {to: '/faculty', label: 'Факультеты', exact:true},
]

class Navigation extends React.Component {

  render () {
    return (
      <nav className={styles['nav']}>
        <ul>
          { renderLinks(links) }
        </ul>
      </nav>
    )
   
  }
}


export default Navigation