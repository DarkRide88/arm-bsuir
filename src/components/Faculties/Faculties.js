import styles from './Faculties.scss'
import React from 'react'
import {renderLinks} from '../../form/links'


const links = [
  {to: '/add-new-faculty', label: 'Добавить  факультет', exact:true},
  {to: '/faculty-list', label: 'Список факультетов', exact:true},
]

const Faculties = () => {
  document.title = 'Факультеты'
return (
  <div className={styles['faculty']}>
      <ul>
        {renderLinks(links)}
      </ul>   
  </div>
)
}

export default Faculties