import React from 'react'
import styles from './Results.scss'
import axios from '../../axios/axios-arm'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import EnrollsTable from '../../components/EnrollsTable/EnrollsTable'
import Loader from '../../components/UI/Loader/Loader'
import {getFacultys} from '../../utils/getFacultys'
import FacultyList from '../../components/FacultyList/FacultyList'

class Results extends React.Component {
  state = {
    facultys: null,
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
    specialtyName = this.state.facultys[facultyName][0]["speaciality"].name;
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
    this.state.facultys[this.state.facultyName].map(faculty => {   
      if(faculty.speaciality.name === this.state.specialtyName){  
        numberOfPlaces = faculty.speaciality.numberOfPlaces      
      }
    })  
    return numberOfPlaces
  }

  renderenrollee() {
    let numberOfPlaces = this.getNumberOfPlaces()
    let count = []
    console.log(this.state.enrollee)
    if(this.state.enrollee) {
      return Object.values(this.state.enrollee).sort((a, b) => a.avgMark < b.avgMark ? 1 : -1).map((enroll, index) => {             
    
        console.log(enroll.specialtyName.name + ' ' + enroll.name)
        if(enroll.specialtyName === this.state.specialtyName && enroll.readyToResults === true && this.state.facultys[this.state.facultyName] ) {     
                 
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
   
    const facultysResponse = await axios.get('/facultys.json') 
    const enrollsResponse = await axios.get('/enrolls.json')  
    let facultys = getFacultys(facultysResponse.data)   
    let enrollee = Object.entries(enrollsResponse.data).filter(enrollee => {
      if(enrollee[1].readyToResults) {
        return enrollee
      }
    })   
    enrollee = Object.fromEntries(enrollee)
    this.setState({
      enrollee,
      facultys, 
      facultyName: Object.entries(facultys)[0][0],
      specialtyName: Object.entries(facultys)[0][1][0]["speaciality"].name,   
    })  
  }

  render() {
    return (
      <div className={styles.results}> 
      {this.state.enrollee !== null ?
      <Auxillary>    
        {this.state.facultys === null ? null : 

          <FacultyList
              facultysList = {this.state.facultys}
              defaultFacultyName = {Object.keys(this.state.facultys)[0]}
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