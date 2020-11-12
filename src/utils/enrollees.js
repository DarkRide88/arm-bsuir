export function updateEnrolleData  (speaciality, facultyName, facultyNameKey, specialityNameKey, props)  {    

  props.faculties[facultyName].forEach(faculty => {        
  if(faculty.name=== speaciality){       
    let enrollee = {...props.enrollee}      
    enrollee.facultyName = facultyNameKey
    enrollee.specialtyName = specialityNameKey
    enrollee.readyToResults = false
    enrollee.exams = {
      exam1: {name:faculty['exam1'],mark: ''},
      exam2: {name:faculty['exam2'],mark: ''},
      exam3: {name:faculty['exam3'],mark: ''}
    }     
    console.log(enrollee.facultyName)
    props.updateEnrolleeData(enrollee)
    console.log(enrollee.facultyName)
  }
})  
}



export function getFacultyNameKey  (facultyName, props)  {
  let FacultyKey 
  Object.entries(props.facultiesFromRespoense).forEach(faculty => {   
    if(Object.keys(faculty[1])[0] === facultyName) {
      FacultyKey = faculty[0]        
    }
  })
  return FacultyKey
 }

 export function getSpecialityNameKey  (specialityName, props)  {
  let specialityKey 
  props.faculties[props.facultyName].forEach((speciality, index) => {    
    if(speciality.name === specialityName)
    specialityKey = index
  })
  return specialityKey
 }


export function selectChangeHandler (event, props) { 
  const enrollee = {...props.enrollee}
  enrollee.facultyName = getFacultyNameKey( event.target.value, props)
  enrollee.specialtyName =  0; 
  const porpsFacultyName =   event.target.value
  const poropsSpecialtyName = props.faculties[event.target.value][0]["name"]
  props.updateFacultyData( porpsFacultyName,poropsSpecialtyName, enrollee.facultyName, enrollee.specialtyName) 
  updateEnrolleData(poropsSpecialtyName,  porpsFacultyName,  enrollee.facultyName, enrollee.specialtyName,  props)  
}  

export function selectSpecialtyHandler (event, props)  {      
  const enrollee = {...props.enrollee}
  enrollee.facultyName = props.facultyNameKey
  enrollee.specialtyName =  getSpecialityNameKey(event.target.value, props )  
  props.updateSpecialityName(event.target.value,  enrollee.specialtyName  )  
  updateEnrolleData(event.target.value, props.facultyName,  enrollee.facultyName , enrollee.specialtyName , props)
}


