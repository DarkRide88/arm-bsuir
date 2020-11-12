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
  console.log('hi')
  if (!validation) {
    return true
  }

  let isValid = true

  if(validation.required) {  
    isValid = value.trim() !== '' && isValid   
    console.log(isValid)
  }   
  return isValid 
}

export function validateForm(controls) {
    let isValid = true
    console.log(controls)
    Object.values(controls).forEach(control => 
      {
        console.log(control)
        control.forEach(contolField => {
          if(contolField.valid !== true && contolField.type !== 'hidden') {
            console.log(contolField)
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