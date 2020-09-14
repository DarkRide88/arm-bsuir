import styles from './Faculty.scss'
import React from 'react'
import {renderLinks} from '../../form/links'
import axios from '../../axios/axios-arm'
import Input from '../../components/UI/Input/Input'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import {createFormControls, renderControls} from '../CreateEnrolle/CreateEnrolle'

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