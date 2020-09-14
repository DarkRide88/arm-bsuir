import React from 'react'
import styles from './Results.scss'
import axios from '../../axios/axios-arm'
import Select from '../../components/UI/Select/Select'
import {faculty} from '../CreateEnrolle/DataToEnrolle'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import EnrollsTable from '../../components/EnrollsTable/EnrollsTable'
import Loader from '../../components/UI/Loader/Loader'

class Results extends React.Component {
  state = {
    enrollers:null,
    facultyName: Object.entries(faculty)[0][0],
    specialtyName: Object.entries(faculty)[0][1][0]["speaciality"].name,
  }

  changeHandler = (event) => {
    
  }
  selectChangeHandler = (event) => {  
    let facultyName = this.state.facultyName
    let specialtyName = this.state.specialtyName
    facultyName = event.target.value;
 
    specialtyName = faculty[event.target.value][0]["speaciality"].name;
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
    faculty[this.state.facultyName].map(faculty => {   
      if(faculty.speaciality.name === this.state.specialtyName){  
        numberOfPlaces = faculty.speaciality.numberOfPlaces
        console.log(numberOfPlaces)
      }
    })  
    return numberOfPlaces
  }

  renderEnrollers() {
    let numberOfPlaces = this.getNumberOfPlaces()
    let count = []
    if(this.state.enrollers) {
      return Object.values(this.state.enrollers).sort((a, b) => a.avgMark < b.avgMark ? 1 : -1).map((enroll, index) => {             
      
        if(enroll.specialtyName === this.state.specialtyName && enroll.readyToResults === true && faculty[this.state.facultyName] ) {                    
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

  renderSelect = () => {
    return (
      <Auxillary>
        <Select 
            label="Выберите факультет"      
            onChange={this.selectChangeHandler}          
            options={
              Object.keys(faculty).map((faculty, index)=> { 
                return {text: faculty, value: faculty}   
              })          
            }
            
        />    
        <Select      
          label="Выберите cпециальность"      
          onChange={this.selectSpecialtyHandler}      
          options={
            faculty[this.state.facultyName].map((faculty, index)=> { 
            return {text: faculty['speaciality'].name, value: faculty['speaciality'].name}   
          })          
          }    
          /> 
      </Auxillary>   
    )
  }

  sortEnrollersByAvgMark = () => {
   
    
  }

  async componentDidMount(){
   

   
    const response = await axios.get('/enrolls.json')  
    console.log(response.data)
    let enrollers = Object.entries(response.data).filter(enrollee => {
      if(enrollee[1].readyToResults) {
        return enrollee
      }
    })   
    enrollers = Object.fromEntries(enrollers)
    this.setState({
      enrollers,    
    })  
  }

  render() {
    return (
      <div className={styles.results}> 
      {this.state.enrollers !== null ?
      <Auxillary>       
        {this.renderSelect()}               
        <EnrollsTable
          tableHeads = {['ФИО', 'Средний балл']}        
        >
         {this.renderEnrollers()}        
        </EnrollsTable>
      </Auxillary>        
      : <Loader/>}
      </div>
    )
  }
}

export default Results