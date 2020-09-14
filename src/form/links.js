import React from 'react'
import {NavLink} from 'react-router-dom'

export function renderLinks(links) {
  return links.map((link,index) => {
    return (
      <li key={index}>
       <NavLink 
        to={link.to} 
        exact={link.exact}   
      >
        {link.label}
      </NavLink>
      </li>
    )
  })
}