import React from 'react'
import styles from './Results.scss'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import FetchedDataTable from '../../components/FetchedDataTable/FetchedDataTable'
import Loader from '../../components/UI/Loader/Loader'
import FacultyList from '../../components/FacultyList/FacultyList'
import { connect } from 'react-redux'
import { fetchEnrollees,  updateEnrollees } from '../../store/actions/enrollees'
import { fetchFacultys, updateFacultyData, updateSpecialityName } from '../../store/actions/faculties'
import {selectChangeHandler,selectSpecialtyHandler } from '../../utils/facultiesHandlers'

class Results extends React.Component {

  getNumberOfPlaces = () => {
    let numberOfPlaces = 0
    this.props.faculties[this.props.facultyName].forEach(faculty => {   
      if(faculty.name === this.props.specialtyName){  
        numberOfPlaces = faculty.numberOfPlaces      
      }
    })  
    return numberOfPlaces
  } 

  getFacultyDataFromKeys(enrollee) {
    let facultyName
    let specialtyName 
    Object.entries(this.props.facultiesFromRespoense).forEach(faculty => {
      if(enrollee.facultyName === faculty[0]) {
        specialtyName = Object.values(faculty[1])[0][enrollee.specialtyName].name      
        facultyName = Object.keys(faculty[1])[0]
      }
    })
    return [specialtyName, facultyName]
  }

  renderenrollee() {
    let numberOfPlaces = this.getNumberOfPlaces()
    let count = []  
    if(this.props.enrollees) {
      return Object.values(this.props.enrollees).sort((a, b) => a.avgMark < b.avgMark ?  1 : -1).map((enroll, index) => {     
        let [specialityName] = this.getFacultyDataFromKeys(enroll)
        if(specialityName === this.props.specialtyName && enroll.readyToResults === true && this.props.faculties[this.props.facultyName] ) {                      
          count.push(index)
          if(count.length <= numberOfPlaces ){
            return(
              <tr key={index}>
                <td>{enroll.name}</td>          
                <td>{enroll.avgMark}</td>             
              </tr>
            )
          }         
        } 
        return null
      })
    } 
 }
 
  componentDidMount(){
     if(this.props.enrollees === null) {
      this.props.fetchEnrollees()
    }
     if(this.props.faculties === null) {   
      this.props.fetchFacultys()
    }
  }

  render() {
    return (
      <div className={styles.results}>    
        {
          this.props.faculties !== null && this.props.faculties !== undefined  ?
            <Auxillary>        
              {
                this.props.faculties === null ? null : 
                  <FacultyList
                    facultiesList = {this.props.faculties}
                    defaultFacultyName = {Object.keys(this.props.faculties)[0]}
                    selectFacultyChangeHandler = {(event)=> {selectChangeHandler(event, this.props)}}
                    selectSpecialtyChangeHandler = {(event)=> {selectSpecialtyHandler(event, this.props)}}
                    enrolleeSpeciality = {this.props.specialtyName}
                    enrolleeFaculty = {this.props.facultyName}
                  />                           
              }              
              <FetchedDataTable
                tableHeads = {[{name: 'ФИО', colspan: ''},{name: 'Средний балл', colspan: ''}]}        
              >
              {
                this.props.loading === false && this.props.faculties !== null && this.props.faculties !== undefined ?  this.renderenrollee() : <Loader/>
              }              
              </FetchedDataTable>
            </Auxillary>        
          :<Loader/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    enrollees: state.enrollees.enrollees,
    faculties: state.faculties.faculties,
    specialtyName: state.faculties.specialtyName,
    facultyName: state.faculties.facultyName,
    loading: state.enrollees.loading,
    facultiesFromRespoense: state.faculties.facultiesFromRespoense
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEnrollees: () => dispatch(fetchEnrollees()),
    updateEnrollees: (enrollees) => dispatch(updateEnrollees(enrollees)),
    fetchFacultys: () => dispatch(fetchFacultys()),
    updateFacultyData:(facultyName, specialtyName ) => dispatch(updateFacultyData(facultyName, specialtyName)),
    updateSpecialityName:(specialtyName) => dispatch(updateSpecialityName(specialtyName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)