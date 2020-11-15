export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  }
}

export function validate(value, validation = null) {  
  if (!validation) {
    return true
  }
  let isValid = true
  if(validation.required) {  
    isValid = value.trim() !== '' && isValid      
  }   
  return isValid 
}

export function validateForm(controls) {
  let isValid = true   
  Object.values(controls).forEach(control => 
    {      
      control.forEach(contolField => {
        if(contolField.valid !== true && contolField.type !== 'hidden') {          
            return isValid = false
        }       
      })     
    })
  return isValid
}

export function validateEnrollee (controls) {
  let isValid = true  
    Object.values(controls).forEach(control => 
      { 
        if(control.valid !== true && control.type !== 'hidden') {    
          return isValid = false
        }
      })
  return isValid
}