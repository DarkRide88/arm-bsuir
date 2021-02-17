import React from 'react'
import {createControl} from '../form/formFramework'
import Auxillary from '../hoc/Auxiliary/Auxiliary'
import Input from '../components/UI/Input/Input'

export const createFormControls = (controlNames, validation) =>{   
  let form = controlNames.map(control => {      
   return createControl({
      maxlength:control.maxlength,
      name: control.name,
      label: control.label,
      type: control.type,
      errorMessage: control.errorMessage | 'Заполните поле',
      placeholder: control.placeholder,      
    }, {...validation, required: true})    
  })  
  return form 
}

export function  renderControls (controls, handler) {

  return Object.values(controls).map((targetControl,i) => {    
     
    return (
    <Auxillary key={i}>
      <Input
        maxlength={targetControl.maxlength}
        type={targetControl.type}
        label={targetControl.label}
        value={targetControl.value}
        valid={targetControl.valid}
        placeholder={targetControl.placeholder}
        shouldValidate={!!targetControl.validation}
        touched={targetControl.touched}
        errorMessage={targetControl.errorMessage}
        onChange={event => handler(event.target.value, targetControl ,i, controls)}
      />
   </Auxillary>
    )
  })
}

export function  createEnrolleeFormControls (controlsName,state) { 
  let form =[]
  controlsName.forEach(control => {   
   Object.entries(state).forEach(enrollee => {     
      if(enrollee[0] === control.name ){    
        form.push({
          maxlength:control.maxlength,
          name: control.name,
          label: control.label,
          type: control.type,
          value: enrollee[1],
          errorMessage: 'Неверные данные',         
          required: true,
          valid: true,
          touched: true,           
          validation: {required:true},
        })
      } 
    }) 
  })
 
  return form   
}