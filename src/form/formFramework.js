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
    console.log(isValid)
  }   
  return isValid 
}

export function validateForm(controls) {
    let isValid = true
    console.log(controls)
    Object.values(controls).forEach(control => 
      {
        control.forEach(contolField => {
          if(contolField.valid !== true && contolField.type !== 'hidden') {
            console.log(contolField)
            return isValid = false
          }
       
        })
     
      })

  return isValid
}

