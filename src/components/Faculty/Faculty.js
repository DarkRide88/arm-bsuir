import styles from './Faculty.scss'
import React from 'react'
import {renderLinks} from '../../form/links'


const links = [
  {to: '/add-new-faculty', label: 'Добавить новый факультет', exact:true},
  {to: '/faculty-list', label: 'Список факультетов', exact:true},
]

const Faculty = () => {

return (
  <div className={styles['faculty']}>
      <ul>
        {renderLinks(links)}
      </ul>   
  </div>
)

}

export default Faculty