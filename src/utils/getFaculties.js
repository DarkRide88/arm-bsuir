export const getFaculties = (data) => {
  let faculties = {}
  Object.entries(data).forEach((faculty,i) => {     
    Object.assign(faculties,faculty[1])      
  })      
  return faculties 
}