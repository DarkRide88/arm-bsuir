import styles from './FacultyList.scss'
import React from 'react'
import axios from '../../axios/axios-arm'
import Input from '../../components/UI/Input/Input'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import {createFormControls, renderControls} from '../CreateEnrolle/CreateEnrolle'

class FacultyList extends React.Component {

  render() {
    return (
      <div className={styles['faculty-list']}>
        <h1>Hi, it's FacultyList</h1>
   
      </div>
    )
  }
}

export default FacultyList