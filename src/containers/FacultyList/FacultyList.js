import styles from './FacultyList.scss'
import React from 'react'
import { connect } from 'react-redux'
import { deleteFaculty, fetchFacultys, hidePopUpFaculty, showPopUpFaculty, updateShoudUpdateFacultiesStatus } from '../../store/actions/faculties'
import Loader from '../../components/UI/Loader/Loader'
import Auxillary from '../../hoc/Auxiliary/Auxiliary'
import FetchedDataTable from '../../components/FetchedDataTable/FetchedDataTable'
import { NavLink } from 'react-router-dom'
import PopUp from '../../components/PopUp/PopUp'
import Button from '../../components/UI/Button/Button'

class FacultyList extends React.Component {

renderFacultyList () {
  return Object.entries(this.props.facultiesFromRespoense).map((faculty, index) => {     
    return(    
      <tr key={faculty[0] + index}>
        <td>
          <NavLink to={'/faculty/' + faculty[0]}>
            {Object.keys(faculty[1])[0]}
          </NavLink>     
        </td>
        <td>
          <div>
            <NavLink to={'/faculty/' + faculty[0]}>
              <i className={"fa fa-pencil fa-fw"}></i>     
            </NavLink> 
          </div> 
        </td>
        <td>
          <Button  onClick={()=> {this.props.showPopUpFaculty(faculty[0])}}  type="delete">X</Button>
        </td>
      </tr>
    )
 })
}

componentDidMount() {
  document.title = 'Список факультетов'
  if(this.props.facultiesFromRespoense === null || this.props.shouldUpdateFaculties === true) {       
    this.props.fetchFacultys()
    this.props.updateShoudUpdateFacultiesStatus(false)
  }
}

  render() {
    return (      
      <div className={styles['faculty-list']}> 
        {        
          this.props.loading === false &&  this.props.facultiesFromRespoense !== null ?       
            <Auxillary>
              {this.props.popUpFaculty === false ? null : 
                <PopUp         
                  onAccept = {() => {this.props.deleteFaculty(this.props.facultiesFromRespoense, this.props.facultyToDeleteId)}}  
                  onRefuse = {this.props.hidePopUpFaculty}
                  text = 'Вы уверены, что хотите удалить данный факультет?'  
                />
              } 
              <FetchedDataTable tableHeads = {[{name:'Название факультета', colspan:'2'},]}>
                {this.renderFacultyList()}
              </FetchedDataTable>             
            </Auxillary>               
          :<Loader/>
        }
      </div>       
    )
  }
}

function mapStateToProps(state) {
  return {
    faculties: state.faculties.faculties,
    loading: state.faculties.loading,   
    facultiesFromRespoense: state.faculties.facultiesFromRespoense,
    popUpFaculty: state.faculties.popUpFaculty,
    facultyToDeleteId: state.faculties.facultyToDeleteId,
    shouldUpdateFaculties: state.faculties.shouldUpdateFaculties,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchFacultys: () => dispatch(fetchFacultys()),
    hidePopUpFaculty: () => dispatch(hidePopUpFaculty()),
    showPopUpFaculty: (faculty) => dispatch(showPopUpFaculty(faculty)),
    deleteFaculty: (faculties,facultyToDelteId ) => dispatch(deleteFaculty(faculties,facultyToDelteId)),
    updateShoudUpdateFacultiesStatus: (shouldUpdate) => dispatch(updateShoudUpdateFacultiesStatus(shouldUpdate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacultyList)