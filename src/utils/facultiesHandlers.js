export function selectChangeHandler  (event, props) {  
  let facultyName = props.facultyName
  let specialtyName = props.specialtyName
  facultyName = event.target.value;
 
  specialtyName = props.faculties[facultyName][0]["speaciality"].name;
  console.log(specialtyName)
  props.updateFacultyName(facultyName, specialtyName)
}  

export function selectSpecialtyHandler(event, props){      
  let specialtyName = props.specialtyName 
  specialtyName = event.target.value
  console.log(event.target.value)
  props.updateSpecialityName(specialtyName) 
}  