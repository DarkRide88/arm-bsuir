import React from 'react'
import Input from '../components/UI/Input/Input'

export function selectChangeHandler  (event, props) {  
  let facultyName = props.facultyName
  let specialtyName = props.specialtyName
  facultyName = event.target.value; 
  specialtyName = props.faculties[facultyName][0]["name"];
  props.updateFacultyData(facultyName, specialtyName)
}  

export function selectSpecialtyHandler(event, props){      
  let specialtyName = props.specialtyName 
  specialtyName = event.target.value
  props.updateSpecialityName(specialtyName) 
}  

export function renderFacultyNameField (facultyControl, handler) {  
  let control = facultyControl   
  return (
    <Input
      maxlength={control.maxlength}
      type={control.type}
      label={control.label}
      value={control.value}
      valid={control.valid}
      shouldValidate={!!control.validation}
      touched={control.touched}
      placeholder={control.placeholder}
      errorMessage={control.errorMessage}
      onChange={event => handler(event.target.value, event.target)}    
    />
  )
}

export function  getFacultyNameFromKey(facultyNameKey , faculties) {
  let facultyName   
  Object.entries(faculties).forEach(faculty => {
    if(facultyNameKey === faculty[0]) {         
      facultyName = Object.keys(faculty[1])[0]
    }
  })
  return  facultyName
}