import React from 'react'
import styles from './Results.scss'
import axios from '../../axios/axios-arm'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import EnrollsTable from '../../components/EnrollsTable/EnrollsTable'
import Loader from '../../components/UI/Loader/Loader'
import {getFaculties} from '../../utils/getFaculties'
import FacultyList from '../../components/FacultyList/FacultyList'

class Results extends React.Component {
  state = {
    faculties: null,
    enrollee:null,
    facultyName: null,
    specialtyName: null,
  }

  changeHandler = (event) => {
    
  }
  selectChangeHandler = (event) => {  
    let facultyName = this.state.facultyName
    let specialtyName = this.state.specialtyName
    facultyName = event.target.value;
    specialtyName = this.state.faculties[facultyName][0]["speaciality"].name;
    this.setState({
      facultyName,
      specialtyName
    })    
  }  
  
  selectSpecialtyHandler = (event) => {      
    let specialtyName = this.state.specialtyName 
    specialtyName = event.target.value
    this.setState({
      specialtyName,       
    })    
  
  }  
  getNumberOfPlaces = () => {
    let numberOfPlaces = 0
    this.state.faculties[this.state.facultyName].forEach(faculty => {   
      if(faculty.speaciality.name === this.state.specialtyName){  
        numberOfPlaces = faculty.speaciality.numberOfPlaces      
      }
    })  
    return numberOfPlaces
  }

  renderenrollee() {
    let numberOfPlaces = this.getNumberOfPlaces()
    let count = []
  
    if(this.state.enrollee) {
      return Object.values(this.state.enrollee).sort((a, b) => a.avgMark < b.avgMark ? 1 : -1).map((enroll, index) => {             
    
        console.log(enroll.specialtyName.name + ' ' + enroll.name)
        if(enroll.specialtyName === this.state.specialtyName && enroll.readyToResults === true && this.state.faculties[this.state.facultyName] ) {     
                 
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
      
      })
    } 
 }
  sortenrolleeByAvgMark = () => {
   
    
  }

  async componentDidMount(){
   
    const facultiesResponse = await axios.get('/facultys.json') 
    const enrollsResponse = await axios.get('/enrolls.json')  
    console.log(facultiesResponse)
    let faculties = getFaculties(facultiesResponse.data)   
    let enrollee = Object.entries(enrollsResponse.data).filter(enrollee => {
      if(enrollee[1].readyToResults) {
        return enrollee
      }
    })   
    enrollee = Object.fromEntries(enrollee)
    this.setState({
      enrollee,
      faculties, 
      facultyName: Object.entries(faculties)[0][0],
      specialtyName: Object.entries(faculties)[0][1][0]["speaciality"].name,   
    })  
  }

  render() {
    return (
      <div className={styles.results}> 
      {this.state.enrollee !== null ?
      <Auxillary>    
        {this.state.faculties === null ? null : 

          <FacultyList
              facultiesList = {this.state.faculties}
              defaultFacultyName = {Object.keys(this.state.faculties)[0]}
              selectFacultyChangeHandler = {this.selectChangeHandler}
              selectSpecialtyChangeHandler = {this.selectSpecialtyHandler}
              enrolleeSpeciality = {this.state.specialtyName}
              enrolleeFaculty = {this.state.facultyName}
          />                           
        }   
           
        <EnrollsTable
          tableHeads = {['ФИО', 'Средний балл']}        
        >
         {this.renderenrollee()}        
        </EnrollsTable>
      </Auxillary>        
      : <Loader/>}
      </div>
    )
  }
}

export default Results