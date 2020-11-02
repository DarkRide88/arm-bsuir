import React from 'react'
import styles from './Results.scss'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import EnrollsTable from '../../components/EnrollsTable/EnrollsTable'
import Loader from '../../components/UI/Loader/Loader'
import FacultyList from '../../components/FacultyList/FacultyList'
import { connect } from 'react-redux'
import { fetchEnrolledEnrollees,  updateEnrollees } from '../../store/actions/enrollees'
import { fetchFacultys, updateFacultyName, updateSpecialityName } from '../../store/actions/faculties'

class Results extends React.Component {


  selectChangeHandler = (event) => {  
    let facultyName = this.props.facultyName
    let specialtyName = this.props.specialtyName
    facultyName = event.target.value;
   
    specialtyName = this.props.faculties[facultyName][0]["speaciality"].name;
    console.log(specialtyName)
    this.props.updateFacultyName(facultyName, specialtyName)
  }  
  
  selectSpecialtyHandler = (event) => {      
    let specialtyName = this.props.specialtyName 
    specialtyName = event.target.value
    console.log(event.target.value)
    this.props.updateSpecialityName(specialtyName) 
  }  

  getNumberOfPlaces = () => {
    let numberOfPlaces = 0
    this.props.faculties[this.props.facultyName].forEach(faculty => {   
      if(faculty.speaciality.name === this.props.specialtyName){  
        numberOfPlaces = faculty.speaciality.numberOfPlaces      
      }
    })  
    return numberOfPlaces
  }

  renderenrollee() {
    let numberOfPlaces = this.getNumberOfPlaces()
    let count = []  
    if(this.props.enrollees) {
      return Object.values(this.props.enrollees).sort((a, b) => a.avgMark < b.avgMark ?  1 : -1).map((enroll, index) => {             
    
        
        if(enroll.specialtyName === this.props.specialtyName && enroll.readyToResults === true && this.props.faculties[this.props.facultyName] ) {     
                 
          count.push(index)
          if(count.length <= numberOfPlaces ){
            return(
              <tr  key={index}>
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
     this.props.fetchEnrolledEnrollees() 
     this.props.fetchFacultys()
  }

  render() {
    return (
      <div className={styles.results}>    
      {this.props.loading === false ||  this.props.faculties !== null  ?
      <Auxillary>    
     
        {this.props.faculties === null ? null : 

          <FacultyList
              facultiesList = {this.props.faculties}
              defaultFacultyName = {Object.keys(this.props.faculties)[0]}
              selectFacultyChangeHandler = {this.selectChangeHandler}
              selectSpecialtyChangeHandler = {this.selectSpecialtyHandler}
              enrolleeSpeciality = {this.props.specialtyName}
              enrolleeFaculty = {this.props.facultyName}
          />                           
        }   
           
        <EnrollsTable
          tableHeads = {['ФИО', 'Средний балл']}        
        >
        {
          this.props.loading === false ?  this.renderenrollee() : <Loader/>
        }
              
        </EnrollsTable>
      </Auxillary>        
      : <Loader/>}
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
    loading: state.enrollees.loading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchEnrolledEnrollees: () => dispatch(fetchEnrolledEnrollees()),
    updateEnrollees: (enrollees) => dispatch(updateEnrollees(enrollees)),
    fetchFacultys: () => dispatch(fetchFacultys()),
    updateFacultyName:(facultyName, specialtyName ) => dispatch(updateFacultyName(facultyName, specialtyName)),
    updateSpecialityName:(specialtyName) => dispatch(updateSpecialityName(specialtyName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)