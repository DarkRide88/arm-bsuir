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
    isValid = value.trim() !== '' & isValid
  } 
  return isValid === 1
}

export function validateForm(control1, control2) {
  console.log(control1)
  console.log(control2)
  let controls = control1.concat(control2)
  let isFormValid = true
  for (let control in controls) {
    if (controls.hasOwnProperty(control)) {
      isFormValid = controls[control].valid && isFormValid
    }
  }
  return isFormValid
}