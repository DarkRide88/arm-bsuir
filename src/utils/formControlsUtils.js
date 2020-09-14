import React from 'react'
import {createControl, validate, validateForm} from '../form/formFramework'
import Auxillary from '../hoc/Auxiliary/Auxiliary'
import Select from '../components/UI/Select/Select'
import Input from '../components/UI/Input/Input'

export const createFormControls = (controlNames) =>{ 
  let form = controlNames.map(control => {   
   return createControl({
      maxlength:control[3],
      name: control[2],
      label: control[0],
      type: control[1],
      errorMessage: 'Неверные данные',
      placeholder: control[4],
      
    }, {required: true})
    
  })
  
  return form 
}

export const renderOptions = (faculty,facultyName, changeHandler,specialtyHandler, state ) => { 
  console.log(facultyName)
  return (  
  <Auxillary>
  <Select 
      label="Выберите факультет"      
      onChange={(event) => {changeHandler(event)}}    
      value = {state.enrollee.facultyName}     
      options={
        Object.keys(faculty).map((faculty, index)=> { 
          return {text: faculty, value: faculty}   
        })          
      }
      
  />    
  <Select      
    label="Выберите cпециальность"      
    onChange={(event) => {specialtyHandler(event)}} 
    value= {state.enrollee.specialtyName}
    options={
      faculty[facultyName].map((faculty, index)=> { 
      return {text: faculty['speaciality'].name, value: faculty['speaciality'].name}   
    })          
    }    
    /> 
 
  </Auxillary>    
  )     
}

export function renderControls(controls, handler) {    
  const controll = [...controls]; 
  return controll.map((control,index) => {     
    return(
      <Auxillary key={index}>
        <Input
        maxlength={control.maxlength}
        type={control.type}
        label={control.label}
        value={control.value}
        valid={control.valid}
        shouldValidate={!!control.validation}
        touched={control.touched}
        errorMessage={control.errorMessage}
        onChange={event => handler(event.target.value, index, controll)}

      />
     </Auxillary>
    )
  })
   
  
}
