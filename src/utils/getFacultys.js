import React from 'react'

export const getFacultys = (data) => {
  let facultys = {}
  Object.entries(data).filter((faculty,i) => {     
    Object.assign(facultys,faculty[1])      
  })      
  return facultys 
}