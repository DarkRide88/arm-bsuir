import React from 'react'
import {createControl} from '../form/formFramework'
import Auxillary from '../hoc/Auxiliary/Auxiliary'
import Input from '../components/UI/Input/Input'





export const createFormControls = (controlNames) =>{ 
  console.log(controlNames)
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
