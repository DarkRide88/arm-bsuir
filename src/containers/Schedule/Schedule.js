import React from 'react'
import styles from './Schedule.scss'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import { fetchFacultys, updateFacultyName } from '../../store/actions/faculties'
import FacultyList from '../../components/FacultyList/FacultyList'
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable'
import { connect } from 'react-redux'
import {selectChangeHandler,selectSpecialtyHandler } from '../../utils/facultiesHandlers'

class Schedule extends React.Component{

  async componentDidMount() {
    this.props.fetchFacultys()
  
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
              <ScheduleTable
                 tableHeads= {[{name: 'Консультации', colspan: '3'}] }
              >
                 <tr>
                    <td></td>
                    <td>Дата</td>
                    <td>Время</td>   
                                   
                  
                  </tr>
                  <tr>
                    <td>{this.props.faculties[this.props.facultyName][0].exam1}</td>                                      
                    <td> {this.props.faculties[this.props.facultyName][0].exam1ConsDate }</td>
                    <td> {this.props.faculties[this.props.facultyName][0].exam1ConsTime}</td>
                  
                  </tr>
                  <tr>
                    <td>{this.props.faculties[this.props.facultyName][0].exam2}</td>                     
                    <td>{this.props.faculties[this.props.facultyName][0].exam2ConsDate }</td> 
                    <td>{this.props.faculties[this.props.facultyName][0].exam2ConsTime}</td>
                    
               
                  </tr>
                  <tr>
                    <td>{this.props.faculties[this.props.facultyName][0].exam3}</td>                 
                    <td>{this.props.faculties[this.props.facultyName][0].exam3ConsDate}</td> 
                    <td>{this.props.faculties[this.props.facultyName][0].exam3ConsTime}</td>                     
                   
                  </tr>
              </ScheduleTable> 
              <ScheduleTable
                 tableHeads= {[{name: 'Экзамен', colspan: '3'}] }
              >  
                  <tr>
                    <td></td>
                    <td>Дата</td>
                    <td>Время</td> 
                  </tr>
                  <tr>
                    <td>{this.props.faculties[this.props.facultyName][0].exam1}</td>
                    <td>{this.props.faculties[this.props.facultyName][0].exam1ExamDate }</td>
                    <td> {this.props.faculties[this.props.facultyName][0].exam1ExamTime}</td>  
                  </tr>
                  <tr>
                    <td>{this.props.faculties[this.props.facultyName][0].exam2}</td>
                    <td>{this.props.faculties[this.props.facultyName][0].exam2ExamDate }</td>    
                    <td> {this.props.faculties[this.props.facultyName][0].exam2ExamTime}</td>
                  </tr>
                  <tr>
                    <td>{this.props.faculties[this.props.facultyName][0].exam3}</td>
                    <td>{this.props.faculties[this.props.facultyName][0].exam3ExamDate }</td>  
                    <td>{this.props.faculties[this.props.facultyName][0].exam3ExamTime}</td> 
                  </tr>
              </ScheduleTable>  
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
    updateFacultyName:(facultyName, specialtyName ) => dispatch(updateFacultyName(facultyName, specialtyName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)