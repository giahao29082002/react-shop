/* eslint-disable react/prop-types */

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children, role}) => {
 const {user} = useSelector((state) => state.auth)
const location = useLocation();
if(!user){
    alert('You must be loggedin !')
    return <Navigate to="/login" state={{from: location}} replace/>
}
if(role && user.role !== role){
    alert('You are not authoriezed to access this page!')
    return <Navigate to="/login" state={{from: location}} replace/>
} 
  return children
}

export default PrivateRoute