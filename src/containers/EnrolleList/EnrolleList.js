import React from 'react'
import styles from './EnrolleList.scss'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import Search from '../../components/Search/Search'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import EnrollsTable from '../../components/EnrollsTable/EnrollsTable'
import PopUp from '../../components/PopUp/PopUp'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import { deleteEnrollee, fetchEnrollees, findEnrollee, hidePopUp, showPopUp } from '../../store/actions/enrollees'

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
        <td>{enroll[1].facultyName}</td>
        <td>  <div><NavLink to={'/enrollee/' + enroll[0]}><i className={"fa fa-pencil fa-fw"}></i>     </NavLink> </div> </td>
        <td><Button  onClick={()=> {this.props.showPopUp(enroll[0])}}  type="delete">X</Button></td>
      </tr>
     )
   })
  } 
  }
  
 componentDidMount() { 
    this.props.fetchEnrollees()
  }

  render() {  
    let content = 
     this.props.enrollees !== null ?
      <Auxillary>     
        <Search            
            type='search'
            placeholder='Найти абитуриента'  
            onChange={(event) => {this.props.findEnrollee(event, this.props.enrollees) }}
        />       
        <EnrollsTable
           tableHeads = {['Имя','Телефон','Дата рождения','Адрес','Факультет']}
        >
          { this.props.loading  ? <tr><td></td><td></td><Loader/></tr> : this.renderEnrollers()}
        </EnrollsTable>
   
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
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchEnrollees: () => dispatch(fetchEnrollees()),
    hidePopUp: () => dispatch(hidePopUp()),
    showPopUp: (enrollee) => dispatch(showPopUp(enrollee)),
    deleteEnrollee: (enrollees, userToDelteId) => dispatch(deleteEnrollee(enrollees, userToDelteId)),
    findEnrollee: ( event, enrollees ) => dispatch(findEnrollee(event, enrollees ))
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EnrolleList)
