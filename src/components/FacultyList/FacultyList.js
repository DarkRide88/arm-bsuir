import React from 'react'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import Select from '../../components/UI/Select/Select'

 const FacultyList = ({facultiesList,selectFacultyChangeHandler,selectSpecialtyChangeHandler,enrolleeSpeciality,enrolleeFaculty}) => { 
  return (  
    <Auxillary>
    <Select 
        label="Выберите факультет"      
        onChange={(event) => {selectFacultyChangeHandler(event)}}    
        value = {enrolleeFaculty}     
        options={
          Object.keys(facultiesList).map((faculty, index)=> { 
            return {text: faculty, value: faculty}   
          })          
        }        
    />          
    <Select      
        label="Выберите cпециальность"      
        onChange={(event) => {selectSpecialtyChangeHandler(event)}} 
        value= {enrolleeSpeciality}
        options={
          facultiesList[enrolleeFaculty].map((faculty, index)=> { 
          return {text: faculty['speaciality'].name, value: faculty['speaciality'].name}   
        })          
        }    
      /> 
  
    </Auxillary>    
  )     
}

export default FacultyList