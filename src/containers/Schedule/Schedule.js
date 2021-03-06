import React from 'react'
import styles from './Schedule.scss'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import { fetchFacultys, updateFacultyData, updateSpecialityName } from '../../store/actions/faculties'
import FacultyList from '../../components/FacultyList/FacultyList'
import FetchedDataTable from '../../components/FetchedDataTable/FetchedDataTable'
import { connect } from 'react-redux'
import {selectChangeHandler,selectSpecialtyHandler } from '../../utils/facultiesHandlers'

class Schedule extends React.Component{

  async componentDidMount() { 
    document.title = 'Расписание'
    if(this.props.faculties === null) {   
      this.props.fetchFacultys()
    }  
  }

  renderShedule = () =>{
    let schedule = Object.values(this.props.faculties[this.props.facultyName]).map((speciality, index) => {
      if(speciality.name === this.props.specialtyName) {        
        return (
          <Auxillary key = {index}>       
            <FetchedDataTable
              tableHeads= {[{name: 'Консультации', colspan: '3'}] }
            >
              <tr>
                <td></td>
                <td>Дата</td>
                <td>Время</td>   
              </tr>
              <tr>                      
                <td>{speciality.exam1}</td>                                      
                <td> {speciality.exam1DateCons }</td>
                <td> {speciality.exam1TimeCons}</td>                      
              </tr>
              <tr>
                <td>{speciality.exam2}</td>                     
                <td>{speciality.exam2DateCons }</td> 
                <td>{speciality.exam2TimeCons}</td>        
              </tr>
              <tr>
                <td>{speciality.exam3}</td>                 
                <td>{speciality.exam3DateCons}</td> 
                <td>{speciality.exam3TimeCons}</td>                     
              </tr>                       
            </FetchedDataTable>
            <FetchedDataTable
              tableHeads= {[{name: 'Экзамен', colspan: '3'}] }
            >  
              <tr>
                <td>Предмет</td>
                <td>Дата</td>
                <td>Время</td> 
              </tr>
              <tr>
                <td>{speciality.exam1}</td>
                <td>{speciality.exam1DateExam }</td>
                <td> {speciality.exam1TimeExam}</td>  
              </tr>
              <tr>
                <td>{speciality.exam2}</td>
                <td>{speciality.exam2DateExam }</td>    
                <td> {speciality.exam2TimeExam}</td>
              </tr>
              <tr>
                <td>{speciality.exam3}</td>
                <td>{speciality.exam3DateExam }</td>  
                <td>{speciality.exam3TimeExam}</td> 
              </tr>
            </FetchedDataTable>  
          </Auxillary>             
        )        
      }   
      return true
    })
    return schedule
  }

  render() {
    return(
      <div className={styles.schedule}>
        {this.props.faculties === null ? null : 
          <Auxillary>        
            <FacultyList
              facultiesList = {this.props.faculties}
              defaultFacultyName = {Object.keys(this.props.faculties)[0]}
              selectFacultyChangeHandler = {(event)=> {selectChangeHandler(event, this.props)}}
              selectSpecialtyChangeHandler = {(event)=> {selectSpecialtyHandler(event, this.props)}}
              enrolleeSpeciality = {this.props.specialtyName}
              enrolleeFaculty = {this.props.facultyName}
            />        
            {this.renderShedule()}            
          </Auxillary>   
        }   
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    faculties: state.faculties.faculties,
    specialtyName: state.faculties.specialtyName,
    facultyName: state.faculties.facultyName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFacultys: () => dispatch(fetchFacultys()),
    updateFacultyData:(facultyName, specialtyName ) => dispatch(updateFacultyData(facultyName, specialtyName)),
    updateSpecialityName:(specialtyName) => dispatch(updateSpecialityName(specialtyName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)