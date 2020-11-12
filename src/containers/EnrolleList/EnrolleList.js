import React from 'react'
import styles from './EnrolleList.scss'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import Search from '../../components/Search/Search'
import FetchedDataTable from '../../components/FetchedDataTable/FetchedDataTable'
import PopUp from '../../components/PopUp/PopUp'

import { connect } from 'react-redux'
import { deleteEnrollee, fetchEnrollees, findEnrollee, hidePopUp, showPopUp, updateShoudUpdateEnrolleeStatus } from '../../store/actions/enrollees'
import { fetchFacultys } from '../../store/actions/faculties'
import {getFacultyNameFromKey} from '../../utils/facultiesHandlers'
class EnrolleList extends React.Component {


  

   renderEnrollers() {
     
    if(this.props.enrollees) {
    return Object.entries(this.props.enrollees).map((enroll, index) => {     
      return(      
      <tr  key={enroll[0] + index}>
        <td>
          <NavLink to={'/enrollee/' + enroll[0]}>
            {enroll[1].name}
          </NavLink>     
        </td>
        <td> {enroll[1].phoneNumber}</td>
        <td>{enroll[1].age}</td>     
        <td> {enroll[1].address}</td>
        <td>{getFacultyNameFromKey(enroll[1].facultyName,this.props.facultiesFromRespoense)}</td>
        <td>  <div><NavLink to={'/enrollee/' + enroll[0]}><i className={"fa fa-pencil fa-fw"}></i>     </NavLink> </div> </td>
        <td><Button  onClick={()=> {this.props.showPopUp(enroll[0])}}  type="delete">X</Button></td>
      </tr>
     )
   })
  } 
  }
  
 componentDidMount() { 
    if(this.props.facultiesFromRespoense === null) {       
      this.props.fetchFacultys()
    }
    if(this.props.enrollees === null || this.props.shouldUpdateEnrollee === true) {
      this.props.fetchEnrollees()
      this.props.updateShoudUpdateEnrolleeStatus(false)
    }
 
  }

  render() {  
    let content = 
     this.props.enrollees !== null  && this.props.facultiesFromRespoense!== null?
      <Auxillary>     
        <Search            
            type='search'
            placeholder='Найти абитуриента'  
            onChange={(event) => {this.props.findEnrollee(event, this.props.enrollees) }}
        />       
        {this.props.loading  ? <Loader/> :
          <FetchedDataTable tableHeads = {[{name: 'Имя', colspan: ''},{name: 'Телефон', colspan: ''},{name: 'Дата рождения', colspan: ''},{name: 'Адрес', colspan: ''},{name: 'Факультет', colspan: ''}]}>
            {this.renderEnrollers()}         
          </FetchedDataTable>
        }   
      </Auxillary>
      : <h1 style={{textAlign:'center'}}>Нет зарегистрированных абитуриентов</h1>         
   
    if (!this.props.enrollees) {
      content = <Loader/>
    }

    return (
      <div className={styles['enrolle-list']}>      
        {this.props.popUp === false ? null : 
          <PopUp         
            onAccept = {() => {this.props.deleteEnrollee(this.props.enrollees, this.props.userToDelteId)}}  
            onRefuse = {this.props.hidePopUp}
            text = 'Вы уверены, что хотите удалить данного абитуриента?'  
        />
        }  
        {content}         
      </div>      
    )
  }
}

function mapStateToProps(state) {
  return {
    enrollees: state.enrollees.enrollees,
    loading: state.enrollees.loading,
    popUp: state.enrollees.popUp,
    userToDelteId: state.enrollees.userToDelteId,
    facultiesFromRespoense: state.faculties.facultiesFromRespoense,
    shouldUpdateEnrollee: state.enrollees.shouldUpdateEnrollee,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFacultys: () => dispatch(fetchFacultys()),
    fetchEnrollees: () => dispatch(fetchEnrollees()),
    hidePopUp: () => dispatch(hidePopUp()),
    showPopUp: (enrollee) => dispatch(showPopUp(enrollee)),
    deleteEnrollee: (enrollees, userToDelteId) => dispatch(deleteEnrollee(enrollees, userToDelteId)),
    findEnrollee: ( event, enrollees ) => dispatch(findEnrollee(event, enrollees ))  ,
    updateShoudUpdateEnrolleeStatus:(shouldUpdate) => dispatch(updateShoudUpdateEnrolleeStatus(shouldUpdate)) 
     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrolleList)
